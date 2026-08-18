import { useState } from "react";
import PropTypes from "prop-types";
import emailjs from "@emailjs/browser";

const INITIAL = { name: "", email: "", phone: "", company: "", message: "" };

const BlogEnquiryForm = ({ brochureTitle }) => {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const payload = {
        ...form,
        brochure: brochureTitle || "General",
        page: "N/A",
      };
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_ENQUIRY_TEMPLATE,
        payload,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setForm(INITIAL);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="blog-reply-wrapper mt-50">
      <h4 className="blog-dec-title">send enquiry</h4>
      {status === "success" ? (
        <div className="enquiry-success">
          <i className="fa fa-check-circle" />
          <h3>Enquiry Sent!</h3>
          <p>
            Thank you for your interest in <strong>{brochureTitle}</strong>.
            Our team will reach out to you shortly.
          </p>
        </div>
      ) : (
        <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
          <div className="enquiry-row">
            <div className="enquiry-field">
              <label>
                Name <span>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
                disabled={status === "submitting"}
              />
            </div>
            <div className="enquiry-field">
              <label>
                Email <span>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                required
                disabled={status === "submitting"}
              />
            </div>
          </div>

          <div className="enquiry-row">
            <div className="enquiry-field">
              <label>
                Phone <span>*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                required
                disabled={status === "submitting"}
              />
            </div>
            <div className="enquiry-field">
              <label>Company</label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Company name (optional)"
                disabled={status === "submitting"}
              />
            </div>
          </div>

          <div className="enquiry-field enquiry-field--full">
            <label>Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your requirements — quantity, occasion, budget, etc."
              rows={4}
              disabled={status === "submitting"}
            />
          </div>

          {status === "error" && (
            <p className="enquiry-error-msg">
              Something went wrong. Please try again or{" "}
              <a href="mailto:info@totalgiftsolutions.com">email us directly</a>.
            </p>
          )}

          <div className="enquiry-actions">
            <button
              type="submit"
              className="enquiry-btn enquiry-btn--primary"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? (
                <>
                  <i className="fa fa-spinner fa-spin" /> Sending…
                </>
              ) : (
                "Send Enquiry"
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

BlogEnquiryForm.propTypes = {
  brochureTitle: PropTypes.string,
};

export default BlogEnquiryForm;
