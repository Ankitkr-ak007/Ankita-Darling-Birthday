import React, { useEffect, useState } from 'react';

const COLORS = ['rgba(0, 243, 255, 0.4)', 'rgba(188, 19, 254, 0.4)', 'rgba(255, 0, 153, 0.4)'];

interface BalloonProps {
  delay: number;
  speed: number;
  left: number;
  color: string;
  size: number;
}

const Balloons: React.FC = () => {
  const [balloons, setBalloons] = useState<BalloonProps[]>([]);

  useEffect(() => {
    const count = 12;
    const newBalloons: BalloonProps[] = [];
    
    for (let i = 0; i < count; i++) {
      newBalloons.push({
        delay: Math.random() * 5,
        speed: 10 + Math.random() * 10,
        left: Math.random() * 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 40 + Math.random() * 60,
      });
    }
    setBalloons(newBalloons);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen">
      {balloons.map((b, i) => (
        <div
          key={i}
          className="absolute bottom-[-150px] rounded-full blur-md"
          style={{
            left: `${b.left}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            background: b.color,
            boxShadow: `0 0 ${b.size/2}px ${b.color}`,
            animation: `rise ${b.speed}s linear infinite`,
            animationDelay: `${b.delay}s`,
          }}
        >
        </div>
      ))}
    </div>
  );
};

export default Balloons;