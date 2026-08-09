const PdfViewer = ({ fileUrl, title }) => (
  <div className="pdf-viewer-wrapper">
    <iframe
      src={fileUrl}
      title={title}
      className="pdf-full-iframe"
      loading="lazy"
    />
  </div>
);

export default PdfViewer;
