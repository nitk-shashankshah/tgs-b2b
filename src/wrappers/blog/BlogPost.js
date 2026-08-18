import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import BROCHURES from "../../data/brochures/brochures";
import PdfViewer from "../../components/pdf/PdfViewer";
import EnquiryModal from "../../components/enquiry/EnquiryModal";

const BlogPost = ({ kitId }) => {
  const [enquiryPage, setEnquiryPage] = useState(null); // null = closed

  const brochure = BROCHURES.find((b) => b.id === kitId) || BROCHURES[0];
  const prevBrochure = BROCHURES.find((b) => b.id === brochure.id - 1);
  const nextBrochure = BROCHURES.find((b) => b.id === brochure.id + 1);
  // const fileUrl = getBrochureUrl(brochure.filename);

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
          {/*<a
            className="brochure-download-btn"
            href={getBrochureUrl(brochure.filename)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-download" /> Download full brochure
          </a>*/}
        </div>
      </div>

      <EnquiryModal
        isOpen={enquiryPage !== null}
        onClose={() => setEnquiryPage(null)}
        brochureTitle={brochure.title}
        pageNumber={enquiryPage}
      />

      <div className="dec-img-wrapper">
        <PdfViewer
          slug={brochure.slug}
          title={brochure.title}
          numPages={brochure.pages}
          onEnquire={(pageNum) => setEnquiryPage(pageNum)}
        />
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
