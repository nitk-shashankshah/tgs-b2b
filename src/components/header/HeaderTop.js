import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import clsx from "clsx";
import LanguageCurrencyChanger from "./sub-components/LanguageCurrencyChanger";
import EnquiryModal from "../enquiry/EnquiryModal";

const HeaderTop = ({ borderStyle }) => {
  const currency = useSelector((state) => state.currency);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <>
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
          <button
            type="button"
            className="header-enquire-btn"
            onClick={() => setEnquiryOpen(true)}
          >
            Enquire Now
          </button>
        </div>
      </div>

      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        isGeneral={true}
        brochureTitle="Total Gift Solutions"
      />
    </>
  );
};

HeaderTop.propTypes = {
  borderStyle: PropTypes.string,
};

export default HeaderTop;
