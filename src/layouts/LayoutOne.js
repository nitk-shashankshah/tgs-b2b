import PropTypes from "prop-types";
import { Fragment } from "react";
import HeaderOne from "../wrappers/header/HeaderOne";
import FooterOne from "../wrappers/footer/FooterOne";
import ScrollToTop from "../components/scroll-to-top"

const LayoutOne = ({
  children,
  headerContainerClass,
  headerTop,
  headerPaddingClass,
  headerPositionClass,
  hidePromo,
  showPlane
}) => {
  return (
    <Fragment>
      <HeaderOne
        layout={headerContainerClass}
        top={headerTop}
        headerPaddingClass={headerPaddingClass}
        headerPositionClass={headerPositionClass}
        hidePromo={hidePromo}
      />
      <div className={`layout-content-wrapper${showPlane ? " layout-content-wrapper--with-plane" : ""}`}>
        {showPlane && (
          <div className="layout-plane">
            <img
              src={process.env.PUBLIC_URL + "/assets/img/banner/paper_plane.png"}
              alt="Paper plane"
              className="layout-plane-img"
            />
          </div>
        )}
        {children}
      </div>
      <FooterOne
        backgroundColorClass="bg-gray"
        spaceTopClass="pt-100"
        spaceBottomClass="pb-70"
      />
      <ScrollToTop/>
    </Fragment>
  );
};

LayoutOne.propTypes = {
  children: PropTypes.node,
  headerContainerClass: PropTypes.string,
  headerPaddingClass: PropTypes.string,
  headerPositionClass: PropTypes.string,
  headerTop: PropTypes.string,
  hidePromo: PropTypes.bool,
  showPlane: PropTypes.bool
};

export default LayoutOne;
