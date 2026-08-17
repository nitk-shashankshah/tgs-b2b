import { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const INITIAL = { name: "", email: "", subject: "", message: "" };

const Contact = () => {
  let { pathname } = useLocation();
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_CONTACT_TEMPLATE,
        form,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setForm(INITIAL);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="Contact"
        description="Contact page of Total Gift Solutions."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Contact", path: process.env.PUBLIC_URL + pathname }
          ]}
        />
        <div className="contact-area pt-100 pb-100">
          <div className="container">
            <div className="custom-row-2">
              <div className="col-12 col-lg-4 col-md-5">
                <div className="contact-info-wrap">
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-phone" />
                    </div>
                    <div className="contact-info-dec">
                      <p>+91-8884441952</p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-globe" />
                    </div>
                    <div className="contact-info-dec">
                      <p>
                        <a href="mailto:admin@totalgiftsolutions.com">
                          admin@totalgiftsolutions.com
                        </a>
                      </p>
                      <p>
                        <a href="https://totalgiftsolutions.com">
                          https://totalgiftsolutions.com
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-map-marker" />
                    </div>
                    <div className="contact-info-dec">
                      <p>#284/8, 2nd Floor, Behind Sai Baba Temple, Garvebhavi Palya, Hosur Main Road</p>
                      <p>Bangalore City - 560068, Karnataka, India.</p>
                    </div>
                  </div>
                  <div className="contact-social text-center">
                    <h3>Follow Us</h3>
                    <ul>
                      <li>
                        <a href="//facebook.com">
                          <i className="fa fa-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="//pinterest.com">
                          <i className="fa fa-pinterest-p" />
                        </a>
                      </li>
                      <li>
                        <a href="//thumblr.com">
                          <i className="fa fa-tumblr" />
                        </a>
                      </li>
                      <li>
                        <a href="//vimeo.com">
                          <i className="fa fa-vimeo" />
                        </a>
                      </li>
                      <li>
                        <a href="//twitter.com">
                          <i className="fa fa-twitter" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-8 col-md-7">
                <div className="contact-form">
                  <div className="contact-title mb-30">
                    <h2>Get In Touch</h2>
                  </div>
                  {status === "success" ? (
                    <div className="form-message form-message--success">
                      <i className="fa fa-check-circle" /> Message sent! We'll get back to you shortly.
                    </div>
                  ) : (
                    <form className="contact-form-style" onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-lg-6">
                          <input
                            name="name"
                            placeholder="Name*"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            required
                            disabled={status === "submitting"}
                          />
                        </div>
                        <div className="col-lg-6">
                          <input
                            name="email"
                            placeholder="Email*"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            disabled={status === "submitting"}
                          />
                        </div>
                        <div className="col-lg-12">
                          <input
                            name="subject"
                            placeholder="Subject*"
                            type="text"
                            value={form.subject}
                            onChange={handleChange}
                            required
                            disabled={status === "submitting"}
                          />
                        </div>
                        <div className="col-lg-12">
                          <textarea
                            name="message"
                            placeholder="Your Message*"
                            value={form.message}
                            onChange={handleChange}
                            required
                            disabled={status === "submitting"}
                          />
                          {status === "error" && (
                            <p className="form-message form-message--error">
                              Something went wrong. Please try again or{" "}
                              <a href="mailto:admin@totalgiftsolutions.com">email us directly</a>.
                            </p>
                          )}
                          <button className="submit" type="submit" disabled={status === "submitting"}>
                            {status === "submitting" ? (
                              <><i className="fa fa-spinner fa-spin" /> SENDING…</>
                            ) : "SEND"}
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
            <br />
            <div className="contact-map mb-10">
              <iframe
                title="Total Gift Solutions Location"
                src="https://maps.google.com/maps?q=12.9559158,77.59037&z=16&output=embed"
                width="100%"
                height="460"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Contact;
