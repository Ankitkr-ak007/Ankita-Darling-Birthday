import React from 'react';
import { Disc, Minimize2 } from 'lucide-react';

interface MusicPlayerProps {
  playing: boolean;
  trackId: string;
  onToggle: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ playing, trackId, onToggle }) => {
  if (!playing) {
    return (
      <button 
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-50 group transition-transform hover:scale-110 focus:outline-none"
        aria-label="Play Music"
      >
        <div className="absolute inset-0 bg-cyber-primary blur-xl opacity-20 group-hover:opacity-50 rounded-full animate-pulse-neon"></div>
        <img 
          src="https://purepng.com/public/uploads/large/purepng.com-music-iconsymbolsiconsapple-iosiosios-8-iconsios-8-721522596085b6osz.png" 
          alt="Music Icon" 
          className="w-16 h-16 relative z-10 drop-shadow-[0_0_15px_rgba(0,243,255,0.6)] animate-float"
        />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-50 animate-[slideUp_0.8s_cubic-bezier(0.2,0.8,0.2,1)_forwards] md:w-auto flex justify-center md:block">
      <div className="relative group w-full max-w-[320px]">
        {/* Cyber Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyber-primary to-cyber-secondary rounded-xl blur opacity-40 group-hover:opacity-100 transition duration-500 animate-pulse-neon"></div>
        
        {/* Tech Container */}
        <div className="relative bg-black/90 backdrop-blur-md border border-cyber-primary/30 p-1 rounded-xl shadow-2xl overflow-hidden w-full">
          
          {/* Header Strip */}
          <div className="flex items-center justify-between px-3 py-1 bg-cyber-dark/50 border-b border-white/5">
            <div className="flex items-center gap-2">
              <Disc size={14} className="text-cyber-primary animate-spin-slow" />
              <span className="text-[10px] font-display tracking-widest text-cyber-primary/80 uppercase">Sonic Module v1.0</span>
            </div>
            <button 
              onClick={onToggle}
              className="text-white/50 hover:text-white transition-colors"
              aria-label="Minimize Player"
            >
              <Minimize2 size={12} />
            </button>
          </div>

          <div className="p-2">
            <iframe 
              style={{ borderRadius: '8px' }} 
              src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0&autoplay=1`} 
              width="100%" 
              height="80" 
              frameBorder="0" 
              allowFullScreen 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              title="Birthday Song"
              className="grayscale-[0.5] hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </div>

          {/* Visualizer Simulation */}
          <div className="h-1 flex items-end justify-center gap-[2px] opacity-50 px-2 pb-1">
             {[...Array(20)].map((_, i) => (
               <div 
                  key={i} 
                  className="w-full bg-cyber-secondary"
                  style={{ 
                    height: `${Math.random() * 100}%`,
                    animation: `pulse ${0.5 + Math.random()}s infinite alternate`
                  }} 
               />
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;