import { useEffect, useRef, useState } from "react";

const Model3D = () => {
  const containerRef = useRef(null);
  const iframeRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const element = containerRef.current;
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;

        // Calculate scroll progress (0 to 1)
        const scrolled = windowHeight - elementTop;
        const totalScroll = elementHeight + windowHeight;
        const progress = Math.max(0, Math.min(1, scrolled / totalScroll));

        setScrollProgress(progress);

        // Apply dynamic animations based on scroll
        if (iframeRef.current) {
          // Subtle rotation based on scroll
          const rotateX = (progress - 0.5) * 10; // -5 to 5 degrees
          const rotateY = (progress - 0.5) * 15; // -7.5 to 7.5 degrees
          const scale = 1 + progress * 0.1; // 1 to 1.1

          iframeRef.current.style.transform = `
            perspective(1200px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(${scale})
          `;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full rounded-b-[0.9rem] overflow-hidden bg-n-8"
    >
      <iframe
        ref={iframeRef}
        title="Neurons"
        frameBorder="0"
        allowFullScreen
        mozAllowFullScreen="true"
        webkitAllowFullScreen="true"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        xrSpatialTracking
        executionWhileOutOfViewport
        executionWhileNotRendered
        webShare
        src="https://sketchfab.com/models/20e930a5fae5457fa6d1738afa00c7bb/embed?autospin=1&autostart=1&preload=1&ui_hint=0"
        className="w-full h-full transition-transform duration-300"
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "center",
        }}
      />

      {/* Gradient Overlay for depth effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-n-8/20" />
    </div>
  );
};

export default Model3D;
