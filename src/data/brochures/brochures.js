const BASE = "https://tgsb2bwebsiteassets.blob.core.windows.net/assets/gift-kits/All Brochures/";

// Pages are served as pre-rendered images under /assets/img/brochures/<slug>/,
// because mobile browsers refuse to render a PDF inside an iframe.
// pages: how many of those images exist — regenerate the images if you change it.
const BROCHURES = [
  { id: 1,  pages: 73, slug: "modern-gifting-solutions",        filename: "Modern Gifting Solutions.pdf",             title: "Modern Gifting Solutions",      tag: "Gifting Guide" },
  { id: 2,  pages: 10, slug: "tgs-b2b-gifting-process",         filename: "TGS - B2B Gifting Process.pdf",            title: "B2B Gifting Process",           tag: "B2B"           },
  { id: 3,  pages: 10, slug: "tgs-bags-backpacks",              filename: "TGS - Bags & Backpacks.pdf",               title: "Bags & Backpacks",              tag: "Bags"          },
  { id: 4,  pages: 10, slug: "tgs-birthday-hampers",            filename: "TGS - Birthday Hampers.pdf",               title: "Birthday Hampers",              tag: "Hampers"       },
  { id: 5,  pages: 10, slug: "tgs-boxes-collection",            filename: "TGS - Boxes Collection.pdf",               title: "Boxes Collection",              tag: "Packaging"     },
  { id: 6,  pages: 10, slug: "tgs-diwali-collection-2026",      filename: "TGS - Diwali Collection 2026.pdf.pdf",     title: "Diwali Collection 2026",        tag: "Diwali"        },
  { id: 7,  pages: 10, slug: "tgs-garment-collection",          filename: "TGS - Garment Collection.pdf",             title: "Garment Collection",            tag: "Garments"      },
  { id: 8,  pages: 10, slug: "tgs-kit-concepts",                filename: "TGS - Kit Concepts.pdf",                   title: "Kit Concepts",                  tag: "Kit Concepts"  },
  { id: 9,  pages: 10, slug: "tgs-premium-cap-collection",      filename: "TGS - Premium Cap Collection.pdf",         title: "Premium Cap Collection",        tag: "Caps"          },
  { id: 10, pages: 10, slug: "tgs-thoughtful-kits-conferences", filename: "TGS - Thoughtful Kits - Conferences.pdf",  title: "Thoughtful Kits – Conferences", tag: "Conferences"   },
  { id: 11, pages: 10, slug: "tgs-trophy-collection",           filename: "TGS - Trophy Collection.pdf",              title: "Trophy Collection",             tag: "Trophies"      },
  { id: 12, pages: 10, slug: "tgs-signature-catalog-2",         filename: "TGS Signature Catalog 2.pdf",              title: "Signature Catalog Vol. 2",      tag: "Catalog"       },
  { id: 13, pages: 10, slug: "tgs-signature-catalog",           filename: "TGS Signature Catalog.pdf",                title: "Signature Catalog",             tag: "Catalog"       },
  { id: 14, pages: 10, slug: "tgs-ug-corporate-gift-range",     filename: "TGS UG Corporate Gift Range.pdf",          title: "Corporate Gift Range",          tag: "Corporate"     },
  { id: 15, pages: 10, slug: "tgs-ug-eco-notebook-collection",  filename: "TGS UG Eco Notebook Collection.pdf",       title: "Eco Notebook Collection",       tag: "Eco"           },
  { id: 16, pages: 10, slug: "tgs-ug-gift-set",                 filename: "TGS UG Gift Set.pdf",                      title: "Gift Set Collection",           tag: "Gift Sets"     },
];

export const getBrochureUrl = (filename) =>
  BASE + encodeURIComponent(filename);

export const getBrochureCoverUrl = (slug) =>
  `${process.env.PUBLIC_URL}/assets/img/brochures/${slug}.jpg`;

export const getBrochurePageUrl = (slug, pageNum) =>
  `${process.env.PUBLIC_URL}/assets/img/brochures/${slug}/${pageNum}.jpg`;

export const CATEGORY_META = {
  "Gifting Guide": { icon: "fa-book",         subtitle: "Complete gifting catalogue" },
  "B2B":           { icon: "fa-briefcase",    subtitle: "Business gifting solutions" },
  "Bags":          { icon: "fa-shopping-bag", subtitle: "Bags & backpack range" },
  "Hampers":       { icon: "fa-gift",         subtitle: "Curated gift hampers" },
  "Packaging":     { icon: "fa-cube",         subtitle: "Box & packaging solutions" },
  "Diwali":        { icon: "fa-sun-o",        subtitle: "Festive Diwali gifts" },
  "Garments":      { icon: "fa-user",         subtitle: "Apparel & garment range" },
  "Kit Concepts":  { icon: "fa-lightbulb-o",  subtitle: "Creative kit ideas" },
  "Caps":          { icon: "fa-certificate",  subtitle: "Cap & headwear range" },
  "Conferences":   { icon: "fa-users",        subtitle: "Conference & event kits" },
  "Trophies":      { icon: "fa-trophy",       subtitle: "Awards & trophies" },
  "Catalog":       { icon: "fa-th-large",     subtitle: "Full product catalog" },
  "Corporate":     { icon: "fa-building-o",   subtitle: "Corporate gift range" },
  "Eco":           { icon: "fa-leaf",         subtitle: "Sustainable eco gifts" },
  "Gift Sets":     { icon: "fa-heart",        subtitle: "Curated gift sets" },
};

export const CATEGORIES = [...new Set(BROCHURES.map((b) => b.tag))].map((tag) => ({
  tag,
  ...(CATEGORY_META[tag] || { icon: "fa-gift", subtitle: "Browse collection" }),
}));

export default BROCHURES;
