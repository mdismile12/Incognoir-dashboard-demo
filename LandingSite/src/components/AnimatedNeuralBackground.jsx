import { useEffect, useRef, useState } from "react";

const AnimatedNeuralBackground = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const nodesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Set canvas to full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
    };

    const initNodes = () => {
      const nodes = [];
      const layers = 25;
      const nodesPerLayer = 25;
      const depth = 1000;

      // Create 3D neural network structure - larger and more detailed
      for (let layer = 0; layer < layers; layer++) {
        for (let i = 0; i < nodesPerLayer; i++) {
          const angle = (i / nodesPerLayer) * Math.PI * 2;
          const layerDepth = (layer / (layers - 1)) * depth - depth / 2;
          // Larger radius with more variation for bigger network
          const radius = 300 + Math.sin(layer * 0.3) * 200 + Math.cos(i * 0.2) * 50;

          nodes.push({
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            z: layerDepth,
            layer,
            index: i,
            radius: 2.5 + Math.random() * 3, // Larger nodes
            pulse: Math.random() * Math.PI * 2,
            baseIntensity: 0.35 + Math.random() * 0.45,
          });
        }
      }

      nodesRef.current = nodes;
    };

    const project3D = (x, y, z) => {
      const perspective = 800;
      const scale = perspective / (perspective + z);

      return {
        x: canvas.width / 2 + x * scale,
        y: canvas.height / 2 + y * scale,
        scale,
        z,
      };
    };

    const drawNetwork = (time, progress) => {
      // Clear with semi-transparent background for trail effect
      ctx.fillStyle = "rgba(10, 10, 20, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;
      const projectedNodes = [];

      // Rotate nodes for 3D effect
      const rotationX = (progress * 0.5 + time * 0.0005) % (Math.PI * 2);
      const rotationY = (time * 0.0008) % (Math.PI * 2);

      // Project and store nodes
      nodes.forEach((node) => {
        // Rotate in 3D space
        let x = node.x;
        let y = node.y * Math.cos(rotationX) - node.z * Math.sin(rotationX);
        let z = node.y * Math.sin(rotationX) + node.z * Math.cos(rotationX);

        const tempX = x * Math.cos(rotationY) - z * Math.sin(rotationY);
        z = x * Math.sin(rotationY) + z * Math.cos(rotationY);
        x = tempX;

        const projected = project3D(x, y, z);
        projectedNodes.push({ ...node, ...projected });
      });

      // Sort by depth (painter's algorithm)
      projectedNodes.sort((a, b) => a.z - b.z);

      // Draw connections
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const node1 = projectedNodes[i];
          const node2 = projectedNodes[j];

          // Connect nodes in nearby layers
          if (
            Math.abs(node1.layer - node2.layer) === 1 &&
            Math.abs(node1.index - node2.index) <= 2
          ) {
            const distance = Math.hypot(
              node2.x - node1.x,
              node2.y - node1.y
            );
            const maxDistance = 350; // Increased for larger network

            if (distance < maxDistance) {
              // Activation based on scroll - adjusted for 12 layers
              const scrollInfluence = node1.layer / 12 < progress + 0.25;
              const opacity =
                (1 - distance / maxDistance) *
                progress *
                (scrollInfluence ? 0.75 : 0.25);

              const gradient = ctx.createLinearGradient(
                node1.x,
                node1.y,
                node2.x,
                node2.y
              );
              gradient.addColorStop(0, `rgba(0, 230, 204, ${opacity * 0.4})`);
              gradient.addColorStop(0.5, `rgba(0, 230, 204, ${opacity})`);
              gradient.addColorStop(1, `rgba(0, 230, 204, ${opacity * 0.4})`);

              ctx.strokeStyle = gradient;
              ctx.lineWidth = 0.6 + opacity * 2.5; // Slightly thicker lines
              ctx.beginPath();
              ctx.moveTo(node1.x, node1.y);
              ctx.lineTo(node2.x, node2.y);
              ctx.stroke();
            }
          }
        }
      }

      // Draw nodes with enhanced glow
      projectedNodes.forEach((node) => {
        const scrollInfluence = node.layer / 12; // Adjusted for 12 layers
        const activationLevel = Math.max(0, progress + 0.35 - scrollInfluence);

        // Pulsing animation - slightly faster for more dynamic effect
        const pulse =
          Math.sin(time * 0.006 + node.pulse) * 0.5 + 0.5;
        const nodeOpacity =
          (node.baseIntensity + pulse * 0.35) * activationLevel;
        const nodeSize = node.radius * node.scale * (1 + pulse * 0.4);

        if (nodeOpacity > 0.05) {
          // Enhanced glow effect for larger nodes
          ctx.shadowBlur = 25 + activationLevel * 40;
          ctx.shadowColor = `rgba(0, 230, 204, ${nodeOpacity * 0.9})`;

          // Draw node
          ctx.fillStyle = `rgba(0, 230, 204, ${Math.min(1, nodeOpacity)})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
          ctx.fill();

          // Draw outer ring for active nodes
          if (activationLevel > 0.5) {
            ctx.strokeStyle = `rgba(0, 230, 204, ${nodeOpacity * 0.6})`;
            ctx.lineWidth = 1 + activationLevel * 0.5;
            ctx.beginPath();
            ctx.arc(node.x, node.y, nodeSize + 6, 0, Math.PI * 2);
            ctx.stroke();
          }

          // Additional bright inner core
          ctx.fillStyle = `rgba(255, 255, 255, ${nodeOpacity * 0.5})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, nodeSize * 0.3, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.shadowBlur = 0;
    };

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? Math.min(1, scrolled / docHeight) : 0;
      setScrollProgress(scrollProgress);
    };

    const animate = () => {
      timeRef.current += 16;
      drawNetwork(timeRef.current, scrollProgress);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", handleScroll);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{
        background: "radial-gradient(ellipse at center, rgba(15,15,25,0.15) 0%, rgba(8,8,18,0.9) 100%)",
      }}
    />
  );
};

export default AnimatedNeuralBackground;