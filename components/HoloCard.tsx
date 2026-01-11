import React, { useRef, useState, MouseEvent } from 'react';

interface HoloCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

const HoloCard: React.FC<HoloCardProps> = ({ children, className = '', intensity = 15 }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top;  // y position within the element.
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation based on distance from center
    const rotX = ((y - centerY) / centerY) * -intensity;
    const rotY = ((x - centerX) / centerX) * intensity;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlare({ ...glare, opacity: 0 });
  };

  return (
    <div className="perspective-1000 w-full">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative transition-all duration-200 ease-out transform-gpu preserve-3d ${className}`}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
      >
        {/* Holographic Border */}
        <div className="absolute -inset-[1px] bg-gradient-to-br from-cyber-primary via-transparent to-cyber-secondary rounded-3xl opacity-50 z-0 blur-[2px]"></div>
        
        {/* Main Content Glass */}
        <div className="relative z-10 bg-cyber-dark/80 backdrop-blur-xl border border-cyber-glassBorder rounded-3xl overflow-hidden shadow-2xl">
          
          {/* Dynamic Glare Effect */}
          <div 
            className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay transition-opacity duration-200"
            style={{
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.3) 0%, transparent 80%)`,
              opacity: glare.opacity
            }}
          />
          
          {/* Scanline Texture */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none z-0"></div>

          <div className="relative z-30">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoloCard;