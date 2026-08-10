import { useState, useRef, useEffect } from "react";

// Lazy-loading wrapper — only inserts the iframe once the row enters the viewport
const LazyPageFrame = ({ src, pageNum }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pdf-gallery-frame" ref={ref}>
      {visible ? (
        <iframe
          src={src}
          title={`Page ${pageNum}`}
          className="pdf-gallery-iframe"
        />
      ) : (
        <div className="pdf-gallery-placeholder">
          <i className="fa fa-file-pdf-o" />
        </div>
      )}
    </div>
  );
};

const PdfViewer = ({ fileUrl, numPages, onEnquire }) => {
  if (!numPages) return null;

  return (
    <div className="pdf-page-gallery">
      {Array.from({ length: numPages }, (_, i) => {
        const pageNum = i + 1;
        const src = `${fileUrl}#page=${pageNum}&toolbar=0&navpanes=0&scrollbar=0&view=Fit`;

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
            <LazyPageFrame src={src} pageNum={pageNum} />
          </div>
        );
      })}
    </div>
  );
};

export default PdfViewer;
