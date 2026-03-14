export function formatPrice(price) {
    return `Rs. ${price.toLocaleString()}`;
}

export function calculateDiscount(price, compareAtPrice) {
    if (!compareAtPrice) return 0;
    return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}

export function generatePlaceholderImage(width, height, text, bgColor = '#e5e5e5', textColor = '#666') {
    return `data:image/svg+xml,${encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <rect width="100%" height="100%" fill="${bgColor}"/>
      <text x="50%" y="50%" font-family="Inter,sans-serif" font-size="14" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${text}</text>
    </svg>`
    )}`;
}

export function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}
