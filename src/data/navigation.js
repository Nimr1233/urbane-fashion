export const navigation = {
    announcement: [
        'FW-25 LIVE NOW.',
        'Easy Exchanges and Returns',
    ],
    mainNav: [
        {
            label: 'Shop By Category',
            href: '/collections',
            hasDropdown: true,
            children: [
                { label: 'Hoodies & Sweatshirts', href: '/collections/hoodies-sweatshirts' },
                { label: 'Sweaters & Cardigans', href: '/collections/sweaters-cardigans' },
                { label: 'Outerwear', href: '/collections/outerwear' },
                { label: 'Jeans', href: '/collections/jeans' },
                { label: 'Cargo & Trousers', href: '/collections/cargos-trousers' },
                { label: 'T-Shirts', href: '/collections/tshirts' },
                { label: 'Shirts', href: '/collections/shirts' },
                { label: 'Pink', href: '/collections/pink' },
                { label: 'Accessories', href: '/collections/accessories' },
                { label: 'Underwear', href: '/collections/underwear' },
                { label: 'Fragrances', href: '/collections/fragrances' },
            ],
        },
        { label: 'New Arrivals', href: '/collections/new-arrivals' },
        { label: 'End Of Season Sale-Upto 50% OFF', href: '/collections/special-prices-upto-50-off', isHighlighted: true },
    ],
    footerLinks: [
        { label: 'About Us', href: '/pages/about-us' },
        { label: "FAQ's", href: '/pages/faq' },
        { label: 'Exchange & Returns', href: '/pages/exchange-returns' },
        { label: 'Shipping Policy', href: '/pages/shipping-policy' },
        { label: 'Privacy Policy', href: '/pages/privacy-policy' },
        { label: 'Contact', href: '/pages/contact' },
        { label: 'Track Your Order', href: '#' },
    ],
};
