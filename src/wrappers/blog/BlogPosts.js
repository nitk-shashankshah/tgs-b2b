import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import GIFT_KITS from "../../data/gift-kits/gift-kits";

const BlogPosts = () => {
  return (
    <Fragment>
      {GIFT_KITS.map((kit) => (
        <div key={kit.id} className="col-lg-6 col-md-6 col-sm-12">
          <div className="blog-wrap-2 mb-30">
            <div className="blog-img-2">
              <Link to={process.env.PUBLIC_URL + `/blog-details-standard?kit=${kit.id}`}>
                <img
                  src={process.env.PUBLIC_URL + kit.image}
                  alt={kit.title}
                />
              </Link>
            </div>
            <div className="blog-content-2">
              <div className="blog-meta-2">
                <ul>
                  <li>Diwali 2025</li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                      {kit.tag}
                    </Link>
                  </li>
                </ul>
              </div>
              <h4>
                <Link to={process.env.PUBLIC_URL + `/blog-details-standard?kit=${kit.id}`}>
                  {kit.title}
                </Link>
              </h4>
              <p>{kit.description}</p>
              <div className="blog-share-comment">
                <div className="blog-btn-2">
                  <Link to={process.env.PUBLIC_URL + `/blog-details-standard?kit=${kit.id}`}>
                    enquire now
                  </Link>
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
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default BlogPosts;
