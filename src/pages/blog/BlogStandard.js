import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { CATEGORIES } from "../../data/brochures/brochures";
import { EffectFade } from "swiper";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
// import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
// import BlogSidebar from "../../wrappers/blog/BlogSidebar";
import BlogPosts from "../../wrappers/blog/BlogPosts";
import Swiper, { SwiperSlide } from "../../components/swiper/index.jsx";

const bannerSliderParams = {
  effect: "fade",
  fadeEffect: { crossFade: true },
  modules: [EffectFade],
  loop: true,
  speed: 1000,
  navigation: true,
  autoplay: { delay: 4000, disableOnInteraction: false },
};

// const CARD_COLORS = ["#fff", "#f1f7ee", "#f6f7ee", "#f9f0f5", "#fef5ef"];
const FLORAL_IMGS = [1, 2, 3, 5, 6];

const categorySliderParams = {
  slidesPerView: 4,
  spaceBetween: 14,
  navigation: true,
  loop: false,
  autoHeight: false,
  breakpoints: {
    0:   { slidesPerView: 1, spaceBetween: 10 },
    480: { slidesPerView: 2, spaceBetween: 10 },
    768: { slidesPerView: 3, spaceBetween: 12 },
    1200: { slidesPerView: 4, spaceBetween: 14 },
  },
};

const bannerImages = [
  "/assets/img/banner/b2b-banner.png",
  "/assets/img/banner/b2b-brown.png"
];

const BlogStandard = () => {
  useLocation();

  return (
    <Fragment>
      <SEO
        titleTemplate="Blog"
        description="Blog of Total Gift Solutions."
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
                  <Link className="default-btn" to={process.env.PUBLIC_URL + "/brochures"}>
                    Get Started
                  </Link>
                  <Link
                    className="btn-hover btn-hover--blue"
                    to={process.env.PUBLIC_URL + "/b2c"}
                  >
                    Visit B2C Store &rarr;
                  </Link>
                </div>
                <p className="blog-hero-trust">Trusted by top companies</p>
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
              <div className="slider-active nav-style-1" id="b2c-banner-slider">
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
            <Swiper
              options={categorySliderParams}
              navClass="category"
              className="blog-categories-slider"              
            >
              {CATEGORIES.map((cat, idx) => (
                <SwiperSlide key={cat.tag}>
                  <Link
                    to={process.env.PUBLIC_URL + `/brochures?tag=${encodeURIComponent(cat.tag)}`}
                    className="blog-category-card"
                    style={{ background: '#fff' }}
                  >
                    <div className="blog-category-text">
                      <h4>{cat.tag}</h4>
                      <span>{cat.subtitle}</span>
                    </div>
                    <div className="blog-category-floral">
                      <img
                        src={process.env.PUBLIC_URL + `/assets/img/banner/floral${FLORAL_IMGS[idx % FLORAL_IMGS.length]}.png`}
                        alt=""
                      />
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/*<div className="section-title" style={{ textAlign: 'center' }}>
          <h2>OUR WORK PROCESS</h2>
          <p className=""></p>
        </div>

        <div className="work-process-area">
          <div className="container">            
            <div className="work-process-steps">
              <div className="work-process-step">
                <img src={process.env.PUBLIC_URL + "/assets/img/banner/step1.png"} alt="Step 1" />
                <h4>Step 1</h4>
                <p>Enquire and Order</p>
              </div>
              <div className="work-process-connector">
                <img src={process.env.PUBLIC_URL + "/assets/img/banner/connector.png"} alt="" />
              </div>
              <div className="work-process-step">
                <img src={process.env.PUBLIC_URL + "/assets/img/banner/step2.png"} alt="Step 2" />
                <h4>Step 2</h4>
                <p>Branding and Packaging</p>
              </div>
              <div className="work-process-connector">
                <img src={process.env.PUBLIC_URL + "/assets/img/banner/connector.png"} alt="" />
              </div>
              <div className="work-process-step">
                <img src={process.env.PUBLIC_URL + "/assets/img/banner/step3.png"} alt="Step 3" />
                <h4>Step 3</h4>
                <p>Delivered at your doorstep</p>
              </div>
            </div>
          </div>
        </div>*/}

        
        <div className="section-title" style={{ textAlign: 'center' }}>
          <h2>BROCHURES</h2>
          <p className=""></p>
        </div>

        <div className="blog-area pt-40 pb-100">
          <div className="container">
            <div className="row flex-row-reverse">
              <div className="col-lg-12">
                <div className="ml-20">
                  <div className="row">
                    <BlogPosts limit={4} />
                  </div>

                  <div className="text-center mt-30">
                    <Link
                      to={process.env.PUBLIC_URL + "/brochures"}
                      className="default-btn"
                    >
                      View All Brochures →
                    </Link>
                  </div>
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
