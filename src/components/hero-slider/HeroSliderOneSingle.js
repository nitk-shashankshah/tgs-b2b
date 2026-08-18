import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const  HeroSliderOneSingle = ({ data }) => {
  return (
    <div className="single-slider slider-height-1 hero-slide-wrap">
      <img
        className="hero-slide-bg"
        src={encodeURI(process.env.PUBLIC_URL + data.image)}
        alt=""
        style={data.fullWidth ? { width: "100%" } : undefined}
      />
      {(data.badge || data.headingLines?.length > 0 || data.headingHighlight || data.subtext || data.btn1?.text) && (
        <div className="hero-slide-overlay" style={data.overlayLeft ? { left: data.overlayLeft } : undefined}>
          {data.badge && (
            <div className="hero-slide-badge">
              <i className="fa fa-users" />
              {data.badge}
            </div>
          )}
          {(data.headingLines?.length > 0 || data.headingHighlight) && (
            <h2 className="hero-slide-heading">
              {data.headingLines?.map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
              {data.headingHighlight && (
                <span className="hero-slide-highlight">{data.headingHighlight}</span>
              )}
            </h2>
          )}
          {data.subtext && (
            <p className="hero-slide-subtext">
              {data.subtext.split("\n").map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </p>
          )}
          {(data.btn1?.text || data.btn2?.text) && (
            <div className="hero-slide-btns">
              {data.btn1?.text && (
                <Link className="hero-slide-btn hero-slide-btn--primary" to={process.env.PUBLIC_URL + data.btn1.url}>
                  {data.btn1.text}
                </Link>
              )}
              {data.btn2?.text && (
                <Link className="hero-slide-btn hero-slide-btn--outline" to={process.env.PUBLIC_URL + data.btn2.url}>
                  {data.btn2.icon && <i className={`fa ${data.btn2.icon}`} />}
                  {data.btn2.text}
                </Link>
              )}
            </div>
          )}
          {data.footerNote && (
            <p className="hero-slide-footer">{data.footerNote}</p>
          )}
        </div>
      )}
    </div>
  );
};

HeroSliderOneSingle.propTypes = {
  data: PropTypes.shape({})
};

export default HeroSliderOneSingle;
