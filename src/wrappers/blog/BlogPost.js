import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import BROCHURES, { getBrochureUrl } from "../../data/brochures/brochures";
import PdfViewer from "../../components/pdf/PdfViewer";
import EnquiryModal from "../../components/enquiry/EnquiryModal";

const BlogPost = ({ kitId }) => {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const brochure = BROCHURES.find((b) => b.id === kitId) || BROCHURES[0];
  const prevBrochure = BROCHURES.find((b) => b.id === brochure.id - 1);
  const nextBrochure = BROCHURES.find((b) => b.id === brochure.id + 1);
  const fileUrl = process.env.PUBLIC_URL + getBrochureUrl(brochure.filename);

  return (
    <Fragment>
      <div className="blog-details-top">
        <div className="blog-details-content">
          <div className="blog-meta-2">
            <ul>
              <li>TGS</li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/brochures"}>
                  {brochure.tag}
                </Link>
              </li>
            </ul>
          </div>
          <h3>{brochure.title}</h3>
          <div className="brochure-download-link">
            <a href={fileUrl} download={brochure.filename} className="brochure-dl-btn">
              <i className="fa fa-download" /> Download PDF
            </a>
            <button
              type="button"
              className="brochure-enquire-btn"
              onClick={() => setEnquiryOpen(true)}
            >
              <i className="fa fa-envelope-o" /> Enquire Now
            </button>
          </div>
        </div>
      </div>

      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        brochureTitle={brochure.title}
      />

      <div className="dec-img-wrapper">
        <PdfViewer fileUrl={fileUrl} title={brochure.title} />
      </div>

      <div className="next-previous-post">
        {prevBrochure ? (
          <Link to={process.env.PUBLIC_URL + `/brochures-details-standard?kit=${prevBrochure.id}`}>
            <i className="fa fa-angle-left" /> {prevBrochure.title}
          </Link>
        ) : (
          <span />
        )}
        {nextBrochure ? (
          <Link to={process.env.PUBLIC_URL + `/brochures-details-standard?kit=${nextBrochure.id}`}>
            {nextBrochure.title} <i className="fa fa-angle-right" />
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
