import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import GIFT_KITS from "../../data/gift-kits/gift-kits";

const BlogPost = ({ kitId }) => {
  const kit = GIFT_KITS.find((k) => k.id === kitId) || GIFT_KITS[0];
  const prevKit = GIFT_KITS.find((k) => k.id === kit.id - 1);
  const nextKit = GIFT_KITS.find((k) => k.id === kit.id + 1);

  return (
    <Fragment>
      <div className="blog-details-top">
        <div className="blog-details-img">
          <img
            alt={kit.title}
            src={process.env.PUBLIC_URL + kit.image}
          />
        </div>
        <div className="blog-details-content">
          <div className="blog-meta-2">
            <ul>
              <li>Diwali 2025</li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                  {kit.tag}
                </Link>
              </li>
            </ul>
          </div>
          <h3>{kit.title}</h3>
          <p>{kit.description}</p>
          <blockquote>
            Thoughtfully curated. Beautifully packaged. Every kit is a celebration
            of relationships, gratitude and the festive spirit.
          </blockquote>
          <p>
            Each gifting kit is handpicked to make an impression that lasts beyond
            the festive season. Whether you're recognising a valued employee,
            thanking a loyal client, or celebrating with your team — our kits
            are made with the finest products and packaged with care. Reach out
            to us to customise quantities, add your brand logo, or mix items
            across kits to create your perfect hamper.
          </p>
        </div>
      </div>
      <div className="dec-img-wrapper">
        <div className="row">
          <div className="col-md-12">
            <div className="dec-img mb-50">
              <img
                alt={kit.title}
                src={process.env.PUBLIC_URL + kit.image}
              />
            </div>
          </div>
        </div>
        <p>
          All kits are available for bulk ordering with custom branding options.
          Minimum order quantities apply. Contact our gifting team for pricing,
          lead times and bespoke packaging.
        </p>
      </div>
      <div className="tag-share">
        <div className="dec-tag">
          <ul>
            <li>
              <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                {kit.tag} ,
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                Corporate Gifting ,
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                Diwali 2025
              </Link>
            </li>
          </ul>
        </div>
        <div className="blog-share">
          <span>share :</span>
          <div className="share-social">
            <ul>
              <li>
                <a className="facebook" href="//facebook.com">
                  <i className="fa fa-facebook" />
                </a>
              </li>
              <li>
                <a className="twitter" href="//twitter.com">
                  <i className="fa fa-twitter" />
                </a>
              </li>
              <li>
                <a className="instagram" href="//instagram.com">
                  <i className="fa fa-instagram" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="next-previous-post">
        {prevKit ? (
          <Link to={process.env.PUBLIC_URL + `/blog-details-standard?kit=${prevKit.id}`}>
            <i className="fa fa-angle-left" /> {prevKit.title}
          </Link>
        ) : (
          <span />
        )}
        {nextKit ? (
          <Link to={process.env.PUBLIC_URL + `/blog-details-standard?kit=${nextKit.id}`}>
            {nextKit.title} <i className="fa fa-angle-right" />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </Fragment>
  );
};

BlogPost.propTypes = {
  kitId: PropTypes.number,
};

export default BlogPost;
