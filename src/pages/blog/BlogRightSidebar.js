import { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Paginator from "react-hooks-paginator";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import BlogSidebar from "../../wrappers/blog/BlogSidebar";
import BlogPosts from "../../wrappers/blog/BlogPosts";
import BROCHURES from "../../data/brochures/brochures";

const pageLimit = 8;

const BlogRightSidebar = () => {
  let { pathname } = useLocation();
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    setCurrentData(BROCHURES.slice(offset, offset + pageLimit));
  }, [offset]);

  return (
    <Fragment>
      <SEO
        titleTemplate="Blog"
        description="Blog of Total Gift Solutions."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Brochures", path: process.env.PUBLIC_URL + pathname }
          ]} 
        />
        <div className="blog-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <div className="mr-20">
                  <div className="row">
                    {/* blog posts */}
                    <BlogPosts items={currentData} />
                  </div>

                  {/* blog pagination */}
                  <div className="pro-pagination-style text-center mt-20">
                    <Paginator
                      totalRecords={BROCHURES.length}
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
              <div className="col-lg-3">
                {/* blog sidebar */}
                <BlogSidebar />
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default BlogRightSidebar;
