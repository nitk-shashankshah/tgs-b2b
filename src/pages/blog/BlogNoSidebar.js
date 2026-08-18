import { Fragment, useState, useEffect, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import Paginator from "react-hooks-paginator";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import BlogPosts from "../../wrappers/blog/BlogPosts";
import BROCHURES from "../../data/brochures/brochures";

const pageLimit = 8;

const BlogNoSidebar = () => {
  const { pathname, search } = useLocation();
  const tag = new URLSearchParams(search).get("tag");
  const filteredBrochures = useMemo(
    () => (tag ? BROCHURES.filter((b) => b.tag === tag) : BROCHURES),
    [tag]
  );
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    setOffset(0);
    setCurrentPage(1);
  }, [tag]);

  useEffect(() => {
    setCurrentData(filteredBrochures.slice(offset, offset + pageLimit));
  }, [offset, filteredBrochures]);

  return (
    <Fragment>
      <SEO
        titleTemplate="Brochures"
        description="Browse TGS gift brochures and catalogues."
      />
      <LayoutOne headerTop="visible">
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Brochures", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="blog-area pt-100 pb-100 blog-no-sidebar">
          <div className="container">
            {tag && (
              <div className="brochures-filter-bar">
                <span>
                  Showing: <strong>{tag}</strong>
                </span>
                <Link to={process.env.PUBLIC_URL + "/brochures"} className="brochures-filter-clear">
                  <i className="fa fa-times" /> View all
                </Link>
              </div>
            )}
            <div className="row">
              <div className="col-lg-12">
                <div className="mr-20">
                  <div className="row">
                    <BlogPosts items={currentData} />
                  </div>
                  <div className="pro-pagination-style text-center mt-20">
                    <Paginator
                      totalRecords={filteredBrochures.length}
                      pageLimit={pageLimit}
                      pageNeighbours={2}
                      setOffset={setOffset}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      pageContainerClass="mb-0 mt-0"
                      pagePrevText="«"
                      pageNextText="»"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default BlogNoSidebar;
