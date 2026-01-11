import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
}

const Starfield: React.FC<{ speed?: number }> = ({ speed = 1 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars: Star[] = [];
    const STAR_COUNT = 800;
    const COLORS = ['#ffffff', '#00f3ff', '#bc13fe', '#ff0099'];

    // Initialize stars
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width,
        size: Math.random() * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)]
      });
    }

    let animationId: number;
    
    const animate = () => {
      if (!canvas || !ctx) return;
      
      // Handle resize dynamically in loop to be safe or just rely on event listener
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
      }

      // Create trailing effect
      ctx.fillStyle = `rgba(10, 10, 18, ${speed > 5 ? 0.2 : 0.8})`; 
      ctx.fillRect(0, 0, width, height);
      
      const cx = width / 2;
      const cy = height / 2;

      stars.forEach(star => {
        // Move star closer
        star.z -= speed * 2; 

        if (star.z <= 0) {
          star.z = width;
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
        }

        // Project 3D coordinates to 2D
        const k = 128.0 / Math.max(0.1, star.z); // Prevent division by zero
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          // Calculate size with safety check
          let size = (1 - star.z / width) * star.size * 2;
          let alpha = 1 - star.z / width;
          
          // Clamp values
          if (size < 0) size = 0;
          if (alpha < 0) alpha = 0;
          if (alpha > 1) alpha = 1;

          // Skip drawing if invisible or invalid size
          if (size <= 0.1 || alpha <= 0) return;

          ctx.beginPath();
          ctx.fillStyle = star.color;
          ctx.globalAlpha = alpha;
          try {
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();
          } catch (e) {
            // Silently fail if arc parameters are invalid to prevent crash
          }
          
          // Add glow for closer stars
          if (alpha > 0.8) {
             ctx.shadowBlur = 10;
             ctx.shadowColor = star.color;
          } else {
             ctx.shadowBlur = 0;
          }
        }
      });
      ctx.globalAlpha = 1.0;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [speed]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

export default Starfield;