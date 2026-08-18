import { getBrochurePageUrl } from "../../data/brochures/brochures";

const PdfViewer = ({ slug, numPages, title, onEnquire }) => {
  if (!numPages) return null;

  return (
    <div className="pdf-page-gallery">
      {Array.from({ length: numPages }, (_, i) => {
        const pageNum = i + 1;

        return (
          <div key={pageNum} className="pdf-gallery-item">
            <div className="pdf-gallery-header">
              <span className="pdf-gallery-serial">{pageNum}</span>
              <button
                type="button"
                className="pdf-gallery-enquire-btn"
                onClick={() => onEnquire(pageNum)}
              >
                <i className="fa fa-envelope-o" /> Enquire Now
              </button>
            </div>
            <div className="pdf-gallery-frame">
              <img
                src={getBrochurePageUrl(slug, pageNum)}
                alt={`${title} — page ${pageNum}`}
                className="pdf-gallery-image"
                loading="lazy"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PdfViewer;
