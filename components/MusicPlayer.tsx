import React from 'react';
import { X } from 'lucide-react';

interface MusicPlayerProps {
  playing: boolean;
  onToggle: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ playing, onToggle }) => {
  // Common "Happy Birthday" track ID. 
  // You can replace "0DiWol3AO6WpXZgp0goxAV" with any specific track ID you want.
  const trackId = "0DiWol3AO6WpXZgp0goxAV"; 

  if (!playing) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-[slideUp_0.8s_ease-out_forwards]">
      <div className="relative group">
        {/* Decorative Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        
        {/* Glass Container */}
        <div className="relative bg-white/80 backdrop-blur-xl border border-white/50 p-2 rounded-2xl shadow-2xl">
          
          {/* Close Button (Optional if she wants to hide it) */}
          <button 
            onClick={onToggle}
            className="absolute -top-3 -right-3 bg-white text-gray-800 rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors z-50 border border-gray-200"
            title="Close Player"
          >
            <X size={14} />
          </button>

          <iframe 
            style={{ borderRadius: '12px' }} 
            src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0&autoplay=1`} 
            width="300" 
            height="80" 
            frameBorder="0" 
            allowFullScreen 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
            title="Birthday Song"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;