import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const  HeroSliderOneSingle = ({ data }) => {
  return (
    <div className="single-slider slider-height-1 hero-slide-wrap">
      <img
        className="hero-slide-bg"
        src={encodeURI(process.env.PUBLIC_URL + data.image)}
        alt=""
      />
      <div className="hero-slide-overlay">
        {data.badge && (
          <div className="hero-slide-badge">
            <i className="fa fa-users" />
            {data.badge}
          </div>
        )}
        <h2 className="hero-slide-heading">
          {data.headingLines.map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
          <span className="hero-slide-highlight">{data.headingHighlight}</span>
        </h2>
        <p className="hero-slide-subtext">
          {data.subtext.split("\n").map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </p>
        <div className="hero-slide-btns">
          <Link className="hero-slide-btn hero-slide-btn--primary" to={process.env.PUBLIC_URL + data.btn1.url}>
            {data.btn1.text}
          </Link>
          <Link className="hero-slide-btn hero-slide-btn--outline" to={process.env.PUBLIC_URL + data.btn2.url}>
            {data.btn2.icon && <i className={`fa ${data.btn2.icon}`} />}
            {data.btn2.text}
          </Link>
        </div>
        {data.footerNote && (
          <p className="hero-slide-footer">{data.footerNote}</p>
        )}
      </div>
    </div>
  );
};

HeroSliderOneSingle.propTypes = {
  data: PropTypes.shape({})
};

export default HeroSliderOneSingle;
