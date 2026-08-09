const PdfThumbnail = ({ fileUrl, title, tag }) => {
  const src = `${fileUrl}#toolbar=0&navpanes=0&scrollbar=0&page=1&view=FitH`;

  return (
    <div className="pdf-thumbnail-wrapper">
      {/* Desktop: actual PDF rendered in iframe */}
      <div className="pdf-thumbnail-scale-container pdf-thumb-desktop">
        <iframe
          src={src}
          title={title}
          className="pdf-thumbnail-iframe"
          scrolling="no"
          loading="lazy"
        />
      </div>

      {/* Mobile: styled card (iframes don't render PDFs on mobile browsers) */}
      <div className="pdf-thumbnail-card pdf-thumb-mobile">
        <div className="pdf-thumbnail-card__icon">
          <i className="fa fa-file-pdf-o" />
        </div>
        {tag && <span className="pdf-thumbnail-card__tag">{tag}</span>}
        <p className="pdf-thumbnail-card__title">{title}</p>
      </div>
    </div>
  );
};

export default PdfThumbnail;
