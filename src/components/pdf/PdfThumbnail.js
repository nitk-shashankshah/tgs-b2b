const PdfThumbnail = ({ coverUrl, title }) => (
  <div className="pdf-thumbnail-wrapper">
    <div className="pdf-thumbnail-scale-container">
      <img
        src={coverUrl}
        alt={title}
        className="pdf-thumbnail-image"
        loading="lazy"
      />
    </div>
  </div>
);

export default PdfThumbnail;
