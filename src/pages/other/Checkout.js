import { Fragment, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { getDiscountPrice } from "../../helpers/product";
import { deleteAllFromCart } from "../../store/slices/cart-slice";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  companyName: "",
  country: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  postcode: "",
  phone: "",
  email: "",
  notes: "",
};

const REQUIRED_FIELDS = [
  ["firstName", "First Name"],
  ["lastName", "Last Name"],
  ["country", "Country"],
  ["address1", "Street Address"],
  ["city", "Town / City"],
  ["state", "State / County"],
  ["postcode", "Postcode / ZIP"],
  ["phone", "Phone"],
  ["email", "Email Address"],
];

const Checkout = () => {
  let { pathname } = useLocation();
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);

  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle"); // idle | processing | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const cartTotalPrice = useMemo(() => {
    return cartItems.reduce((total, cartItem) => {
      const discountedPrice = getDiscountPrice(cartItem.price, cartItem.discount);
      const unitPrice = discountedPrice != null ? discountedPrice : cartItem.price;
      return total + unitPrice * currency.currencyRate * cartItem.quantity;
    }, 0);
  }, [cartItems, currency.currencyRate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const missing = REQUIRED_FIELDS.filter(([key]) => !form[key].trim());
    if (missing.length > 0) {
      return `Please fill in: ${missing.map(([, label]) => label).join(", ")}.`;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      return "Please enter a valid email address.";
    }
    return null;
  };

  const sendOrderEmail = async (paymentId) => {
    const orderTemplate = process.env.REACT_APP_EMAILJS_ORDER_TEMPLATE;
    if (!orderTemplate) return;

    const items = cartItems
      .map((cartItem) => `${cartItem.name} x ${cartItem.quantity}`)
      .join("\n");

    await emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      orderTemplate,
      {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        phone: form.phone,
        company: form.companyName,
        address: `${form.address1}${form.address2 ? ", " + form.address2 : ""}, ${form.city}, ${form.state} ${form.postcode}, ${form.country}`,
        notes: form.notes,
        items,
        total: currency.currencySymbol + cartTotalPrice.toFixed(2),
        payment_id: paymentId,
      },
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    );
  };

  const handlePlaceOrder = async () => {
    const validationError = validate();
    if (validationError) {
      setErrorMsg(validationError);
      setStatus("error");
      return;
    }

    if (!window.Razorpay) {
      setErrorMsg("Payment gateway failed to load. Please refresh and try again.");
      setStatus("error");
      return;
    }

    setStatus("processing");
    setErrorMsg("");

    const orderItems = cartItems.map((cartItem) => {
      const discountedPrice = getDiscountPrice(cartItem.price, cartItem.discount);
      const unitPrice = discountedPrice != null ? discountedPrice : cartItem.price;
      return {
        name: cartItem.name,
        quantity: cartItem.quantity,
        price: unitPrice * currency.currencyRate,
      };
    });

    let order;
    try {
      const { data } = await axios.post(`${API_URL}/orders`, {
        billing: form,
        items: orderItems,
        currency: currency.currencyName,
      });
      order = data;
    } catch (err) {
      setErrorMsg(err.response?.data?.error || "Failed to create order. Please try again.");
      setStatus("error");
      return;
    }

    const rzp = new window.Razorpay({
      key: order.keyId,
      order_id: order.razorpayOrderId,
      amount: order.amount,
      currency: order.currency,
      name: "Total Gift Solutions",
      description: `Order of ${cartItems.length} item(s)`,
      prefill: {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        contact: form.phone,
      },
      notes: {
        address: `${form.address1}, ${form.city}, ${form.state} ${form.postcode}, ${form.country}`,
      },
      theme: { color: "#611f69" },
      handler: async (response) => {
        try {
          await axios.post(`${API_URL}/orders/${order.orderId}/verify`, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
        } catch {
          setErrorMsg("Payment received but verification failed. Please contact support.");
          setStatus("error");
          return;
        }

        try {
          await sendOrderEmail(response.razorpay_payment_id);
        } catch {
          // Payment already succeeded; a failed notification email shouldn't block the order.
        }
        dispatch(deleteAllFromCart());
        setStatus("success");
      },
      modal: {
        ondismiss: () => setStatus("idle"),
      },
    });

    rzp.on("payment.failed", (response) => {
      axios.post(`${API_URL}/orders/${order.orderId}/fail`).catch(() => {});
      setErrorMsg(`Payment failed: ${response.error.description}`);
      setStatus("error");
    });

    rzp.open();
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="Checkout"
        description="Checkout page of Total Gift Solutions."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Checkout", path: process.env.PUBLIC_URL + pathname }
          ]}
        />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {status === "success" ? (
              <div className="row">
                <div className="col-lg-12">
                  <div className="enquiry-success">
                    <i className="fa fa-check-circle" />
                    <h3>Order Placed!</h3>
                    <p>
                      Thank you, {form.firstName}. Your payment was successful and our
                      team will reach out shortly to confirm delivery details.
                    </p>
                    <Link
                      to={process.env.PUBLIC_URL + "/shop-grid-standard"}
                      className="enquiry-btn enquiry-btn--primary"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            ) : cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>Billing Details</h3>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>First Name</label>
                          <input type="text" name="firstName" value={form.firstName} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Last Name</label>
                          <input type="text" name="lastName" value={form.lastName} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Company Name</label>
                          <input type="text" name="companyName" value={form.companyName} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-select mb-20">
                          <label>Country</label>
                          <select name="country" value={form.country} onChange={handleChange}>
                            <option value="">Select a country</option>
                            <option value="India">India</option>
                            <option value="Azerbaijan">Azerbaijan</option>
                            <option value="Bahamas">Bahamas</option>
                            <option value="Bahrain">Bahrain</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Barbados">Barbados</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Street Address</label>
                          <input
                            className="billing-address"
                            placeholder="House number and street name"
                            type="text"
                            name="address1"
                            value={form.address1}
                            onChange={handleChange}
                          />
                          <input
                            placeholder="Apartment, suite, unit etc."
                            type="text"
                            name="address2"
                            value={form.address2}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Town / City</label>
                          <input type="text" name="city" value={form.city} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>State / County</label>
                          <input type="text" name="state" value={form.state} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Postcode / ZIP</label>
                          <input type="text" name="postcode" value={form.postcode} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Phone</label>
                          <input type="text" name="phone" value={form.phone} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Email Address</label>
                          <input type="text" name="email" value={form.email} onChange={handleChange} />
                        </div>
                      </div>
                    </div>

                    <div className="additional-info-wrap">
                      <h4>Additional information</h4>
                      <div className="additional-info">
                        <label>Order notes</label>
                        <textarea
                          placeholder="Notes about your order, e.g. special notes for delivery. "
                          name="notes"
                          value={form.notes}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="your-order-area">
                    <h3>Your order</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Product</li>
                            <li>Total</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
                            {cartItems.map((cartItem, key) => {
                              const discountedPrice = getDiscountPrice(cartItem.price, cartItem.discount);
                              const unitPrice = discountedPrice != null ? discountedPrice : cartItem.price;
                              const lineTotal = unitPrice * currency.currencyRate * cartItem.quantity;
                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {cartItem.name} X {cartItem.quantity}
                                  </span>{" "}
                                  <span className="order-price">
                                    {currency.currencySymbol + lineTotal.toFixed(2)}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">Shipping</li>
                            <li>Free shipping</li>
                          </ul>
                        </div>
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Total</li>
                            <li>
                              {currency.currencySymbol + cartTotalPrice.toFixed(2)}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>

                    {status === "error" && errorMsg && (
                      <p className="enquiry-error-msg mt-20">{errorMsg}</p>
                    )}

                    <div className="place-order mt-25">
                      <button
                        className="btn-hover"
                        onClick={handlePlaceOrder}
                        disabled={status === "processing"}
                      >
                        {status === "processing" ? "Processing…" : "Place Order"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Checkout;
