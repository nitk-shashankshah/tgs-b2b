import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { CATEGORIES } from "../../data/brochures/brochures";
import EnquiryModal from "../enquiry/EnquiryModal";

const NavMenu = ({ menuWhiteClass, sidebarMenu }) => {
  const { t } = useTranslation();
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <Fragment>
    <div
      className={clsx(sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`)}
    >
      <nav>
        <ul>
          <li>
            <Link to={process.env.PUBLIC_URL + "/b2b"}>
              {t("home")}             
            </Link>            
          </li>             
          <li>
            <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
              {" "}
              {t("shop")}
              {/*sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                <i className="fa fa-angle-down" />
              )*/}
            </Link>            
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/brochures"}>
              {t("Categories")}
              {sidebarMenu ? (
                <span><i className="fa fa-angle-right" /></span>
              ) : (
                <i className="fa fa-angle-down" />
              )}
            </Link>
            <ul className="submenu">
              <li>
                <Link to={process.env.PUBLIC_URL + "/brochures"}>
                  All Categories
                </Link>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat.tag}>
                  <Link
                    to={process.env.PUBLIC_URL + `/brochures?tag=${encodeURIComponent(cat.tag)}`}
                  >
                    {cat.tag}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/about"}>
              {t("about_us")}              
            </Link>           
          </li>
          {/*<li>
            <Link to={process.env.PUBLIC_URL + "/"}>
              {t("pages")}
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                <i className="fa fa-angle-down" />
              )}
            </Link>
            <ul className="submenu">
              <li>
                <Link to={process.env.PUBLIC_URL + "/cart"}>
                  {t("cart")}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/checkout"}>
                  {t("checkout")}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/wishlist"}>
                  {t("wishlist")}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/compare"}>
                  {t("compare")}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/my-account"}>
                  {t("my_account")}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/login-register"}>
                  {t("login_register")}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/about"}>
                  {t("about_us")}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/contact"}>
                  {t("contact_us")}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/not-found"}>
                  {t("404_page")}
                </Link>
              </li>
            </ul>
          </li>*/}
          <li>
            <Link to={process.env.PUBLIC_URL + "/b2c"}>
              {t("Retail")}              
            </Link>
            {/*<ul className="submenu">
              <li>
                <Link to={process.env.PUBLIC_URL + "/b2b"}>
                  {t("b2b")}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/brochures"}>
                  {t("brochures")}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/brochures"}>
                  {t("brochures_no_sidebar")}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/brochures-right-sidebar"}>
                  {t("brochures_right_sidebar")}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/brochures-details-standard"}>
                  {t("brochures_details_standard")}
                </Link>
              </li>
            </ul>*/}
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/contact"}>
              {t("contact_us")}
            </Link>
          </li>
          {/*!sidebarMenu && (
            <li className="nav-call-item">
              <a href="tel:+918884441952" className="nav-call-link">
                <i className="fa fa-phone" /> +91-8884441952
              </a>
            </li>
          )*/}
          {!sidebarMenu && (
            <li className="nav-enquire-item">
              <div className="header-enquire">
                <button
                  type="button"
                  className="header-enquire-btn"
                  onClick={() => setEnquiryOpen(true)}
                >
                  Enquire Now
                </button>
              </div>
            </li>
          )}
        </ul>
      </nav>
    </div>
    <EnquiryModal
      isOpen={enquiryOpen}
      onClose={() => setEnquiryOpen(false)}
      isGeneral={true}
      brochureTitle="Total Gift Solutions"
    />
    </Fragment>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
};

export default NavMenu;
