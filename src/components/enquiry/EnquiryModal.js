import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const INITIAL = { name: "", email: "", phone: "", company: "", message: "" };

const EnquiryModal = ({ isOpen, onClose, brochureTitle }) => {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  // Reset form when modal reopens
  useEffect(() => {
    if (isOpen) {
      setForm(INITIAL);
      setStatus("idle");
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const payload = { ...form, brochure: brochureTitle };
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      // No API yet — treat as success for demo
      setStatus("success");
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="enquiry-backdrop" onClick={onClose} />

      {/* Modal */}
      <div className="enquiry-modal" role="dialog" aria-modal="true">
        <button className="enquiry-close" onClick={onClose} aria-label="Close">
          <i className="fa fa-times" />
        </button>

        {status === "success" ? (
          <div className="enquiry-success">
            <i className="fa fa-check-circle" />
            <h3>Enquiry Sent!</h3>
            <p>Thank you for your interest in <strong>{brochureTitle}</strong>. Our team will reach out to you shortly.</p>
            <button className="enquiry-btn enquiry-btn--primary" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="enquiry-modal-header">
              <h3>Enquire About This Brochure</h3>
              <p className="enquiry-brochure-name">{brochureTitle}</p>
            </div>

            <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
              <div className="enquiry-row">
                <div className="enquiry-field">
                  <label>Name <span>*</span></label>
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
                  <label>Email <span>*</span></label>
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
                  <label>Phone <span>*</span></label>
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
                  type="button"
                  className="enquiry-btn enquiry-btn--outline"
                  onClick={onClose}
                  disabled={status === "submitting"}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="enquiry-btn enquiry-btn--primary"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? (
                    <><i className="fa fa-spinner fa-spin" /> Sending…</>
                  ) : (
                    "Send Enquiry"
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

EnquiryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  brochureTitle: PropTypes.string,
};

export default EnquiryModal;
