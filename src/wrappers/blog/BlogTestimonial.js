import Swiper, { SwiperSlide } from "../../components/swiper/index.jsx";
import TestimonialOneSingle from "../../components/testimonial/TestimonialOneSingle.js";

const settings = {
  slidesPerView: 1,
  loop: true,
  autoplay: true,
};

const TESTIMONIALS = [
  {
    image: "/assets/img/testimonial/testi-1.png",
    content:
      "The quality of the gift hampers exceeded our expectations, and the team was flexible with our last-minute customization requests. Our employees loved them.",
    customerName: "Priya Menon",
    title: "HR Manager, Techsphere Solutions",
  },
  {
    image: "/assets/img/testimonial/testi-2.png",
    content:
      "From sampling to delivery, everything was handled smoothly. Total Gift Solutions made our Diwali gifting for 500+ clients completely stress-free.",
    customerName: "Rohit Sharma",
    title: "Admin Head, Vertex Industries",
  },
  {
    image: "/assets/img/testimonial/1.jpg",
    content:
      "Great range of corporate gift options and the packaging felt premium. Pricing was transparent and the team responded quickly to every query.",
    customerName: "Ananya Iyer",
    title: "Procurement Lead, Bright Retail Group",
  },
  {
    image: "/assets/img/testimonial/2.jpg",
    content:
      "We've ordered onboarding kits for new hires twice now and both times the delivery was on time across multiple cities. Highly reliable vendor.",
    customerName: "Karan Patel",
    title: "People Ops, Northline Logistics",
  },
];

const BlogTestimonial = () => {
  return (
    <div className="blog-comment-wrapper mt-55">
      <h4 className="blog-dec-title">what our clients say</h4>
      <div className="testimonial-active nav-style-1 nav-testi-style mt-35">
        <Swiper options={settings}>
          {TESTIMONIALS.map((data, key) => (
            <SwiperSlide key={key}>
              <TestimonialOneSingle data={data} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BlogTestimonial;
