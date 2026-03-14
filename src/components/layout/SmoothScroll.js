'use client';
import { ReactLenis } from 'lenis/react';

export default function SmoothScroll({ children }) {
  // CONFIGURATION: Set to true for buttery smooth 120Hz-like scrolling.
  // To "undo" this, just set enabled to false or remove the wrapper in layout.js
  const enabled = true;

  if (!enabled) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
