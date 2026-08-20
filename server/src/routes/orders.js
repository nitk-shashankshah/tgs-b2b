const express = require("express");
const crypto = require("crypto");
const pool = require("../db");
const razorpay = require("../razorpay");
const requireAdmin = require("../middleware/adminAuth");

const router = express.Router();

const ORDER_STATUSES = ["pending", "paid", "delivered", "cancelled", "failed"];

const REQUIRED_BILLING_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "country",
  "address1",
  "city",
  "state",
  "postcode",
];

router.post("/", async (req, res) => {
  const { billing, items, currency = "INR" } = req.body;

  if (!billing || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "billing and items are required" });
  }

  const missing = REQUIRED_BILLING_FIELDS.filter((field) => !String(billing[field] || "").trim());
  if (missing.length > 0) {
    return res.status(400).json({ error: `Missing billing fields: ${missing.join(", ")}` });
  }

  const amount = items.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);
  if (!(amount > 0)) {
    return res.status(400).json({ error: "Order amount must be greater than zero" });
  }

  try {
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency,
      receipt: `receipt_${Date.now()}`,
    });

    const { rows } = await pool.query(
      `INSERT INTO tgsOrders
        (status, currency, amount, items, first_name, last_name, company_name,
         email, phone, country, address1, address2, city, state, postcode, notes,
         razorpay_order_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
       RETURNING id`,
      [
        "pending",
        currency,
        amount,
        JSON.stringify(items),
        billing.firstName,
        billing.lastName,
        billing.companyName || null,
        billing.email,
        billing.phone,
        billing.country,
        billing.address1,
        billing.address2 || null,
        billing.city,
        billing.state,
        billing.postcode,
        billing.notes || null,
        razorpayOrder.id,
      ]
    );

    res.status(201).json({
      orderId: rows[0].id,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("Failed to create order", err);
    res.status(500).json({ error: "Failed to create order" });
  }
});

router.get("/", requireAdmin, async (req, res) => {
  const { status } = req.query;

  if (status && !ORDER_STATUSES.includes(status)) {
    return res.status(400).json({ error: `status must be one of: ${ORDER_STATUSES.join(", ")}` });
  }

  try {
    const { rows } = status
      ? await pool.query(`SELECT * FROM tgsOrders WHERE status = $1 ORDER BY created_at DESC`, [status])
      : await pool.query(`SELECT * FROM tgsOrders ORDER BY created_at DESC`);
    res.json({ orders: rows });
  } catch (err) {
    console.error("Failed to list orders", err);
    res.status(500).json({ error: "Failed to list orders" });
  }
});

router.patch("/:id/status", requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!ORDER_STATUSES.includes(status)) {
    return res.status(400).json({ error: `status must be one of: ${ORDER_STATUSES.join(", ")}` });
  }

  try {
    const { rows } = await pool.query(
      `UPDATE tgsOrders SET status = $1, updated_at = now() WHERE id = $2 RETURNING id, status`,
      [status, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Failed to update order status", err);
    res.status(500).json({ error: "Failed to update order status" });
  }
});

router.post("/:id/verify", async (req, res) => {
  const { id } = req.params;
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ error: "Missing Razorpay verification fields" });
  }

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  // TEST-ONLY escape hatch for local dev when RAZORPAY_KEY_SECRET isn't set yet.
  // Must never be enabled outside local testing - it accepts payments without proof they were paid.
  const skipVerification = process.env.SKIP_SIGNATURE_VERIFICATION === "true";
  if (skipVerification) {
    console.warn(`[orders] SKIP_SIGNATURE_VERIFICATION is on - accepting order ${id} without verifying signature`);
  }

  try {
    if (!skipVerification && expectedSignature !== razorpay_signature) {
      await pool.query(
        `UPDATE tgsOrders SET status = 'failed', updated_at = now()
         WHERE id = $1 AND razorpay_order_id = $2`,
        [id, razorpay_order_id]
      );
      return res.status(400).json({ error: "Payment signature verification failed" });
    }

    const { rows } = await pool.query(
      `UPDATE tgsOrders
       SET status = 'paid', razorpay_payment_id = $1, razorpay_signature = $2, updated_at = now()
       WHERE id = $3 AND razorpay_order_id = $4
       RETURNING id, status`,
      [razorpay_payment_id, razorpay_signature, id, razorpay_order_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ orderId: rows[0].id, status: rows[0].status });
  } catch (err) {
    console.error("Failed to verify order", err);
    res.status(500).json({ error: "Failed to verify order" });
  }
});

router.post("/:id/fail", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(
      `UPDATE tgsOrders SET status = 'failed', updated_at = now() WHERE id = $1 AND status = 'pending'`,
      [id]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error("Failed to mark order failed", err);
    res.status(500).json({ error: "Failed to update order" });
  }
});

module.exports = router;
