import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/layout/SmoothScroll';
import ScrollManager from '@/components/layout/ScrollManager';

import { siteConfig } from '@/config/site';

export const metadata = {
  title: `${siteConfig.name} - ${siteConfig.titleSuffix}`,
  description: siteConfig.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <ScrollManager />
          <SmoothScroll>
            <div className="mainWrapper">
              <Header />
              <main>{children}</main>
              <Footer />
            </div>
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}
