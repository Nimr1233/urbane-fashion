export const siteConfig = {
  name: "URBANE",
  titleSuffix: "Premium Fashion",
  description: "Boutique fashion for the modern individual.",
  logo: "/assets/logo.png",
  
  // Theme Overrides (Defaults)
  theme: {
    primary: "#008060", // The boutique teal
    secondary: "#111111", // Pitch black
    accent: "#ff4d4d", // Discount/Error red
    background: "#ffffff",
  },

  // Social & Contact
  contact: {
    email: "support@urbane.com",
    phone: "+92 300 1234567",
    instagram: "https://instagram.com/urbane",
    facebook: "https://facebook.com/urbane",
  },

  // Navigation Links
  navigation: [
    { label: "New Arrivals", href: "/collections/new-arrivals" },
    { label: "Sweaters", href: "/collections/sweaters-cardigans" },
    { label: "Accessories", href: "/collections/accessories" },
  ],

  // Footer/Policy
  policies: [
    { label: "Shipping Policy", href: "/policies/shipping" },
    { label: "Return Policy", href: "/policies/returns" },
    { label: "Size Guide", href: "/policies/size-guide" },
  ]
};
