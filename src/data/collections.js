export const collections = [
    {
        slug: 'new-arrivals',
        title: 'New Arrivals',
        description: 'Fresh drops just landed. Be the first to shop the latest.',
    },
    {
        slug: 'special-prices-upto-50-off',
        title: 'End Of Season Sale - Upto 50% OFF',
        description: 'Grab your favorites at unbeatable prices before they\'re gone.',
    },
    {
        slug: 'hoodies-sweatshirts',
        title: 'Hoodies & Sweatshirts',
        description: 'Premium heavyweight hoodies and sweatshirts for the cold season.',
        image: '/images/categories/hoodies.jpg',
    },
    {
        slug: 'sweaters-cardigans',
        title: 'Sweaters & Cardigans',
        description: 'Crafted knits and cozy cardigans for layered elegance.',
        image: '/images/categories/sweaters.jpg',
    },
    {
        slug: 'outerwear',
        title: 'Outerwear',
        description: 'Statement outerwear from overcoats to puffers.',
        image: '/images/categories/outerwear.jpg',
    },
    {
        slug: 'jeans',
        title: 'Jeans',
        description: 'Premium denim, studied, refined, and done right.',
        image: '/images/categories/jeans.jpg',
    },
    {
        slug: 'cargos-trousers',
        title: 'Cargo & Trousers',
        description: 'From utility cargos to tailored trousers.',
        image: '/images/categories/cargos.jpg',
    },
    {
        slug: 'tshirts',
        title: 'T-Shirts',
        description: 'Essential tees and premium graphic prints.',
        image: '/images/categories/tshirts.jpg',
    },
    {
        slug: 'shirts',
        title: 'Shirts',
        description: 'From classic oxfords to modern overshirts.',
        image: '/images/categories/shirts.jpg',
    },
    {
        slug: 'accessories',
        title: 'Accessories',
        description: 'Belts, bags, and essentials to complete your look.',
        image: '/images/categories/accessories.jpg',
    },
    {
        slug: 'fragrances',
        title: 'Fragrances',
        description: 'Signature scents crafted for the bold.',
        image: '/images/categories/fragrances.jpg',
    },
];

export function getCollectionBySlug(slug) {
    return collections.find((c) => c.slug === slug) || null;
}

export function getCategoriesWithImages() {
    return collections.filter((c) => c.image);
}
