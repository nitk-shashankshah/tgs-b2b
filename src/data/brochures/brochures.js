const BASE = "https://tgsb2bwebsiteassets.blob.core.windows.net/assets/gift-kits/All Brochures/";

// pages: total page count for each PDF (update these to match actual PDF page counts)
const BROCHURES = [
  { id: 1,  pages: 73, filename: "Modern Gifting Solutions.pdf",              title: "Modern Gifting Solutions",         tag: "Gifting Guide"  },
  { id: 2,  pages: 10, filename: "TGS - B2B Gifting Process.pdf",            title: "B2B Gifting Process",              tag: "B2B"            },
  { id: 3,  pages: 10, filename: "TGS - Bags & Backpacks.pdf",               title: "Bags & Backpacks",                 tag: "Bags"           },
  { id: 4,  pages: 10, filename: "TGS - Birthday Hampers.pdf",               title: "Birthday Hampers",                 tag: "Hampers"        },
  { id: 5,  pages: 10, filename: "TGS - Boxes Collection.pdf",               title: "Boxes Collection",                 tag: "Packaging"      },
  { id: 6,  pages: 10, filename: "TGS - Diwali Collection 2026.pdf.pdf",     title: "Diwali Collection 2026",           tag: "Diwali"         },
  { id: 7,  pages: 10, filename: "TGS - Garment Collection.pdf",             title: "Garment Collection",               tag: "Garments"       },
  { id: 8,  pages: 10, filename: "TGS - Kit Concepts.pdf",                   title: "Kit Concepts",                     tag: "Kit Concepts"   },
  { id: 9,  pages: 10, filename: "TGS - Premium Cap Collection.pdf",         title: "Premium Cap Collection",           tag: "Caps"           },
  { id: 10, pages: 10, filename: "TGS - Thoughtful Kits - Conferences.pdf",  title: "Thoughtful Kits – Conferences",    tag: "Conferences"    },
  { id: 11, pages: 10, filename: "TGS - Trophy Collection.pdf",              title: "Trophy Collection",                tag: "Trophies"       },
  { id: 12, pages: 10, filename: "TGS Signature Catalog 2.pdf",              title: "Signature Catalog Vol. 2",         tag: "Catalog"        },
  { id: 13, pages: 10, filename: "TGS Signature Catalog.pdf",                title: "Signature Catalog",                tag: "Catalog"        },
  { id: 14, pages: 10, filename: "TGS UG Corporate Gift Range.pdf",          title: "Corporate Gift Range",             tag: "Corporate"      },
  { id: 15, pages: 10, filename: "TGS UG Eco Notebook Collection.pdf",       title: "Eco Notebook Collection",          tag: "Eco"            },
  { id: 16, pages: 10, filename: "TGS UG Gift Set.pdf",                      title: "Gift Set Collection",              tag: "Gift Sets"      },
];

export const getBrochureUrl = (filename) =>
  BASE + encodeURIComponent(filename);

export default BROCHURES;
