require("dotenv").config();

const express = require("express");
const cors = require("cors");
const ordersRouter = require("./routes/orders");
const adminRouter = require("./routes/admin");

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:3000" }));
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/orders", ordersRouter);
app.use("/api/admin", adminRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Orders API listening on port ${PORT}`));
