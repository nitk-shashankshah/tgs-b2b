import PropTypes from "prop-types";
import { useState } from "react";
import clsx from "clsx";

const PromoBanner = ({ className }) => {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;
  }

  return (
    <div className={clsx("promo-banner-area", className)}>
      <div className="container">
        <div className="promo-banner-content">
          <div className="promo-banner-left">
            <span className="promo-badge">Best deals</span>
            <h5>90% OFF coupon</h5>
            <p>Special for lifetime plan</p>
          </div>
          <div className="promo-banner-right">
            <span className="promo-pill">Anniversary specials</span>
            <button className="promo-button">GRAB NOW</button>
          </div>
          <button
            type="button"
            className="promo-close-button"
            onClick={() => setVisible(false)}
            aria-label="Close promo banner"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

PromoBanner.propTypes = {
  className: PropTypes.string,
};

export default PromoBanner;
