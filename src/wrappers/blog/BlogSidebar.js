import { useState } from "react";
import { Link } from "react-router-dom";
import BROCHURES, { getBrochureCoverUrl } from "../../data/brochures/brochures";
import PdfThumbnail from "../../components/pdf/PdfThumbnail";

const BlogSidebar = () => {
  const [query, setQuery] = useState("");
  const filteredBrochures = BROCHURES.filter((brochure) =>
    brochure.title.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div className="sidebar-style">
      <div className="sidebar-widget">
        <h4 className="pro-sidebar-title">Search </h4>
        <div className="pro-sidebar-search mb-55 mt-25">
          <form
            className="pro-sidebar-search-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Search here..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div>
      <div className="sidebar-widget">
        <h4 className="pro-sidebar-title">All Brochures</h4>
        <div className="sidebar-project-wrap mt-30">
          {filteredBrochures.length === 0 && <p>No brochures found</p>}
          {filteredBrochures.map((brochure) => (
            <div key={brochure.id} className="single-sidebar-blog">
              <div className="sidebar-blog-img sidebar-blog-img--pdf">
                <Link to={process.env.PUBLIC_URL + `/brochures-details-standard?kit=${brochure.id}`}>
                  <PdfThumbnail
                    coverUrl={getBrochureCoverUrl(brochure.slug)}
                    title={brochure.title}
                  />
                </Link>
              </div>
              <div className="sidebar-blog-content">
                <span>{brochure.tag}</span>
                <h4>
                  <Link to={process.env.PUBLIC_URL + `/brochures-details-standard?kit=${brochure.id}`}>
                    {brochure.title}
                  </Link>
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
