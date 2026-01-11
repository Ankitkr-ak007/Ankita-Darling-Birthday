import React, { useEffect, useState } from 'react';

const COLORS = ['#ff7eb3', '#ff758c', '#a855f7', '#7afcff', '#feff9c', '#ff8fa3'];

interface BalloonProps {
  delay: number;
  speed: number;
  left: number;
  color: string;
  scale: number;
}

const Balloons: React.FC = () => {
  const [balloons, setBalloons] = useState<BalloonProps[]>([]);

  useEffect(() => {
    // Generate random balloons
    const count = 15;
    const newBalloons: BalloonProps[] = [];
    
    for (let i = 0; i < count; i++) {
      newBalloons.push({
        delay: Math.random() * 10,
        speed: 15 + Math.random() * 10, // Duration in seconds
        left: Math.random() * 100, // Percentage
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        scale: 0.5 + Math.random() * 0.5,
      });
    }
    setBalloons(newBalloons);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {balloons.map((b, i) => (
        <div
          key={i}
          className="absolute bottom-[-150px] opacity-80"
          style={{
            left: `${b.left}%`,
            animation: `rise ${b.speed}s linear infinite`,
            animationDelay: `${b.delay}s`,
            transform: `scale(${b.scale})`,
          }}
        >
          {/* Balloon Body */}
          <div 
            className="w-24 h-32 rounded-[50%] relative"
            style={{
              backgroundColor: b.color,
              boxShadow: 'inset -10px -10px 0 rgba(0,0,0,0.07)',
            }}
          >
            {/* Shine */}
            <div className="absolute top-4 left-4 w-6 h-10 rounded-[50%] bg-white/30 rotate-45"></div>
            {/* Knot */}
            <div 
              className="absolute bottom-[-8px] left-[50%] translate-x-[-50%] w-0 h-0 border-l-[8px] border-r-[8px] border-b-[12px] border-l-transparent border-r-transparent"
              style={{ borderBottomColor: b.color }}
            ></div>
          </div>
          {/* String */}
          <div className="balloon-string"></div>
        </div>
      ))}
    </div>
  );
};

export default Balloons;