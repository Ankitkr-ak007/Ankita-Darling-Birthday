import React, { useState, useEffect } from 'react';
import { Play, Pause, Music } from 'lucide-react';

interface MusicPlayerProps {
  autoStart?: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ autoStart = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (autoStart) {
      setIsPlaying(true);
    }
  }, [autoStart]);

  return (
    <>
      {/* Spotify Player Container */}
      {isPlaying && (
        <div className="fixed bottom-24 right-6 z-40 w-80 h-[152px] bg-transparent rounded-xl overflow-hidden shadow-2xl transform transition-all duration-300 origin-bottom-right animate-[float_6s_ease-in-out_infinite]">
           <iframe 
             style={{borderRadius: '12px'}} 
             src="https://open.spotify.com/embed/track/7mf1VOXSQCH53OoTfpFUTO?utm_source=generator&theme=0" 
             width="100%" 
             height="152" 
             frameBorder="0" 
             allowFullScreen 
             allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
             loading="lazy"
             title="Birthday Song"
           ></iframe>
        </div>
      )}

      {/* Control Button */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-pink-600 px-6 py-3 rounded-full shadow-xl hover:scale-105 transition-transform duration-300 border-2 border-pink-100 group"
      >
        {isPlaying ? (
          <>
            <Pause size={20} className="fill-current" />
            <span className="font-semibold hidden md:inline">Close Player</span>
          </>
        ) : (
          <>
            <Play size={20} className="fill-current ml-0.5" />
            <span className="font-semibold hidden md:inline">Music Player</span>
          </>
        )}
        
        {/* Animated Icon if playing (visual flair) */}
        {isPlaying && (
            <div className="ml-2 animate-bounce-gentle">
                <Music size={16} />
            </div>
        )}
      </button>
    </>
  );
};

export default MusicPlayer;