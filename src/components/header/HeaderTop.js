import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import clsx from "clsx";
import LanguageCurrencyChanger from "./sub-components/LanguageCurrencyChanger";

const HeaderTop = ({ borderStyle }) => {
  const currency = useSelector((state) => state.currency);
  return (
    <div className={clsx("header-top-wap", borderStyle === "fluid-border" && "border-bottom")}>
      <LanguageCurrencyChanger currency={currency} />
      <div className="header-offer">
        <p>
          Free delivery on order over{" "}
          <span>
            {currency.currencySymbol + (10000 * currency.currencyRate).toFixed(2)}
          </span>
        </p>
      </div>
      <div className="header-enquire">
        <Link to={process.env.PUBLIC_URL + "/contact"} className="header-enquire-btn">
          Enquire Now
        </Link>
      </div>
    </div>
  );
};

HeaderTop.propTypes = {
  borderStyle: PropTypes.string,
};

export default HeaderTop;
