const PdfThumbnail = ({ title, tag }) => {
  return (
    <div className="pdf-thumbnail-card">
      <div className="pdf-thumbnail-card__icon">
        <i className="fa fa-file-pdf-o" />
      </div>
      {tag && <span className="pdf-thumbnail-card__tag">{tag}</span>}
      <p className="pdf-thumbnail-card__title">{title}</p>
    </div>
  );
};

export default PdfThumbnail;
