import { useEffect, useRef, useState } from "react";

const NeuralNetwork = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const nodesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize canvas and nodes
    const initCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      // Create neural network nodes
      const layers = 5;
      const nodesPerLayer = 6;
      const nodes = [];

      for (let layer = 0; layer < layers; layer++) {
        for (let i = 0; i < nodesPerLayer; i++) {
          nodes.push({
            x: (canvas.width / (layers + 1)) * (layer + 1),
            y: (canvas.height / (nodesPerLayer + 1)) * (i + 1),
            layer,
            index: i,
            radius: 3 + Math.random() * 2,
          });
        }
      }

      nodesRef.current = nodes;
    };

    const drawNetwork = (progress) => {
      const nodes = nodesRef.current;
      
      ctx.fillStyle = "rgba(10, 10, 20, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const node1 = nodes[i];
          const node2 = nodes[j];

          // Only connect nearby nodes
          if (
            Math.abs(node1.layer - node2.layer) <= 1 &&
            Math.abs(node1.index - node2.index) <= 2
          ) {
            const distance = Math.hypot(node2.x - node1.x, node2.y - node1.y);
            const maxDistance = 250;

            if (distance < maxDistance) {
              const opacity = (1 - distance / maxDistance) * progress * 0.6;

              // Gradient for connection
              const gradient = ctx.createLinearGradient(
                node1.x,
                node1.y,
                node2.x,
                node2.y
              );
              gradient.addColorStop(0, `rgba(0, 230, 204, ${opacity * 0.3})`);
              gradient.addColorStop(0.5, `rgba(0, 230, 204, ${opacity})`);
              gradient.addColorStop(1, `rgba(0, 230, 204, ${opacity * 0.3})`);

              ctx.strokeStyle = gradient;
              ctx.lineWidth = 0.5 + opacity * 1.5;
              ctx.beginPath();
              ctx.moveTo(node1.x, node1.y);
              ctx.lineTo(node2.x, node2.y);
              ctx.stroke();
            }
          }
        }
      }

      // Draw nodes with glow
      nodes.forEach((node) => {
        const distanceFromTop = node.y / canvas.height;
        const activationThreshold = progress * 1.2;
        const isActive = distanceFromTop < activationThreshold;

        const nodeOpacity = isActive ? 0.3 + progress * 0.7 : 0.3;
        const nodeSize = node.radius * (isActive ? 1.5 : 1);

        // Glow effect
        if (isActive) {
          ctx.shadowBlur = 15 + progress * 20;
          ctx.shadowColor = `rgba(0, 230, 204, ${nodeOpacity})`;
        } else {
          ctx.shadowBlur = 0;
        }

        // Draw node
        ctx.fillStyle = `rgba(0, 230, 204, ${nodeOpacity})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw outer ring for active nodes
        if (isActive) {
          ctx.strokeStyle = `rgba(0, 230, 204, ${nodeOpacity * 0.6})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(node.x, node.y, nodeSize + 4, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      ctx.shadowBlur = 0;
    };

    initCanvas();

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
        drawNetwork(progress);
      }
    };

    const handleResize = () => {
      initCanvas();
      drawNetwork(scrollProgress);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [scrollProgress]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full rounded-b-[0.9rem] overflow-hidden bg-n-8"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          display: "block",
          background: "linear-gradient(135deg, rgba(10,10,20,0.5) 0%, rgba(20,20,40,0.5) 100%)",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-n-8/30" />
    </div>
  );
};

export default NeuralNetwork;
