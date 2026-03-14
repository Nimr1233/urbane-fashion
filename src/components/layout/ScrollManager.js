'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollManager() {
    const pathname = usePathname();

    useEffect(() => {
        // Force scroll to top on every route change
        window.scrollTo(0, 0);
        
        // Also ensure Lenis (if present) scrolls to top
        if (window.lenis) {
            window.lenis.scrollTo(0, { immediate: true });
        }
    }, [pathname]);

    return null;
}
