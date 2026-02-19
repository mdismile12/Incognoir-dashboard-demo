import { useEffect, useRef, useState } from "react";

const AnimateOnScroll = ({
  children,
  className = "",
  animationType = "fade-in-up",
  delay = 0,
}) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={`${
        isVisible ? `animate-${animationType}` : "opacity-0"
      } ${className}`}
      style={{
        animationDelay: isVisible ? `${delay}s` : "0s",
      }}
    >
      {children}
    </div>
  );
};

export default AnimateOnScroll;
