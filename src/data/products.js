// CLIENT-PROVIDED PRODUCT ASSET. This is a DEMO catalog until inventory/prices are confirmed.
// Replace samplePrice and stock after client approval. Do not treat these as confirmed sales details.
export const products = [
  {
    id: 'blck-310-green-monster',
    slug: 'blck-310-green-monster-socks',
    name: '310 / Green Monster Socks',
    category: 'Socks',
    color: 'Green',
    tagline: 'Streetwear, from the ground up.',
    description: 'Graphic green crew socks featuring the BLCK 310 artwork and statement stripes. Designed as a bold finishing touch for your everyday fit.',
    samplePrice: 799,
    compareAt: null,
    sizes: ['One Size'],
    image: '/assets/blck-310-green-socks.webp',
    lifestyleImage: '/assets/model-closeup.webp',
    details: [
      'Design: Green graphic with BLCK 310 branding',
      'Category: Crew socks',
      'Care, material, sizing and stock: awaiting client confirmation',
    ],
  },
];

export const getProductBySlug = (slug) => products.find((product) => product.slug === slug);
