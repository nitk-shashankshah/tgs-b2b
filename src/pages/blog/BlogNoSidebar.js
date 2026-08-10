import { Fragment } from "react";
import { useLocation, Link } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import BlogPagination from "../../wrappers/blog/BlogPagination";
import BlogPosts from "../../wrappers/blog/BlogPosts";

const BlogNoSidebar = () => {
  const { pathname, search } = useLocation();
  const tag = new URLSearchParams(search).get("tag");

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
                    <BlogPosts filterTag={tag} />
                  </div>
                  <BlogPagination />
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
