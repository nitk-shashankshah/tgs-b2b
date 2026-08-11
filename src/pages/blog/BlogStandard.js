import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { CATEGORIES } from "../../data/brochures/brochures";
import { EffectFade } from "swiper";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import BlogSidebar from "../../wrappers/blog/BlogSidebar";
import BlogPagination from "../../wrappers/blog/BlogPagination";
import BlogPosts from "../../wrappers/blog/BlogPosts";
import Swiper, { SwiperSlide } from "../../components/swiper/index.jsx";

const bannerSliderParams = {
  effect: "fade",
  fadeEffect: { crossFade: true },
  modules: [EffectFade],
  loop: true,
  speed: 1000,
  navigation: true,
};

const bannerImages = [
  "/assets/img/banner/b2b-banner.png",
  "/assets/img/banner/b2b-brown.png"
];

const BlogStandard = () => {
  let { pathname } = useLocation();

  return (
    <Fragment>
      <SEO
        titleTemplate="Blog"
        description="Blog of flone react minimalist eCommerce template."
      />
      <LayoutOne hidePromo showPlane>
        {/* breadcrumb */}
        {/*<Breadcrumb
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Blog", path: process.env.PUBLIC_URL + pathname }
          ]}
        />*/}
        <div className="blog-hero-area">
          <div className="container">
            <div className="blog-hero-center">
              <div className="blog-hero-content">
                <h1>Premium gift kits</h1>
                <h1>crafted for your business </h1>
                <p className="blog-hero-subhead">Customized kits for every occasion. Delivered.</p>
                <div className="blog-hero-btn-group">
                  <Link className="default-btn" to={process.env.PUBLIC_URL + "/"}>
                    Get Started
                  </Link>
                  <Link
                    className="btn-hover btn-hover--blue"
                    to={process.env.PUBLIC_URL + "/"}
                  >
                    Visit B2C Store &rarr;
                  </Link>
                </div>
                <p className="blog-hero-trust">Trusted by top teams</p>
                <img
                  src={process.env.PUBLIC_URL + "/assets/img/banner/clients.png"}
                  alt="Our clients"
                  className="blog-hero-clients"
                />
              </div>

              <div className="blog-hero-visual">
                <div className="blog-hero-gift">                 
                  <img
                    src={process.env.PUBLIC_URL + "/assets/img/banner/gift.png"}
                    alt="Premium gift kit"
                    className="blog-hero-gift-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="blog-banner-area">
          <div className="container">
            <div className="slider-area">
              <div className="slider-active nav-style-1">
                <Swiper options={bannerSliderParams}>
                  {bannerImages.map((src, key) => (
                    <SwiperSlide key={key}>
                      <img
                        src={process.env.PUBLIC_URL + src}
                        alt="Customized Gifting Kits"
                        className="blog-banner-img"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>

        <div className="section-title" style={{ textAlign: 'center' }}>
          <h2>CATEGORIES</h2>
          <p className=""></p>
        </div>

        <div className="blog-categories-area">
          <div className="container">
            <div className="blog-categories-grid">
              {CATEGORIES.slice(0, 5).map((cat, idx) => (
                <Link
                  key={cat.tag}
                  to={process.env.PUBLIC_URL + `/brochures?tag=${encodeURIComponent(cat.tag)}`}
                  className="blog-category-card"
                  style={{ background: ["#fff","#fff","#fff","#fff","#fff"][idx] }}
                >
                  <div className="blog-category-text">
                    <h4>{cat.tag}</h4>
                    <span>{cat.subtitle.split(' ').length > 2 ? (
                      cat.subtitle.split(' ').slice(0, 2).join(' ')
                    ) : cat.subtitle}</span>
                  </div>
                  <div className="blog-category-floral">
                    <img
                      src={process.env.PUBLIC_URL + `/assets/img/banner/floral${[1,2,3,5,6][idx]}.png`}
                      alt=""
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>



        
        <div className="section-title" style={{ textAlign: 'center' }}>
          <h2>BROCHURES</h2>
          <p className=""></p>
        </div>

        <div className="blog-area pt-100 pb-100">
          <div className="container">
            <div className="row flex-row-reverse">
              <div className="col-lg-12">
                <div className="ml-20">
                  <div className="row">
                    {/* blog posts */}
                    <BlogPosts />
                  </div>

                  {/* blog pagination */}
                  <BlogPagination />
                </div>
              </div>
              {/*<div className="col-lg-3">
                <BlogSidebar />
              </div>*/}
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default BlogStandard;
