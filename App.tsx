import React, { useState, useEffect } from 'react';
import Confetti from './components/Confetti';
import MusicPlayer from './components/MusicPlayer';
import Balloons from './components/Balloons';
import { generateBirthdayWish, generateBirthdayPoem } from './services/geminiService';
import { Sparkles, Gift, Heart, PartyPopper, Cake, Feather, ArrowRight, Star } from 'lucide-react';

const App: React.FC = () => {
  const [started, setStarted] = useState<boolean>(false);
  const [musicPlaying, setMusicPlaying] = useState<boolean>(false);
  const [wish, setWish] = useState<string>('');
  const [poem, setPoem] = useState<string>('');
  const [loadingWish, setLoadingWish] = useState<boolean>(false);
  const [loadingPoem, setLoadingPoem] = useState<boolean>(false);
  const [showCard, setShowCard] = useState<boolean>(false);
  
  const generateWish = async () => {
    setLoadingWish(true);
    const newWish = await generateBirthdayWish("Ankita");
    setWish(newWish);
    setLoadingWish(false);
  };

  const generatePoem = async () => {
    setLoadingPoem(true);
    const newPoem = await generateBirthdayPoem("Ankita");
    setPoem(newPoem);
    setLoadingPoem(false);
  };

  const handleOpenGift = () => {
    setStarted(true);
    setMusicPlaying(true); // Auto-start music on interaction
    // Slight delay for the card animation to start after the gift "opens"
    setTimeout(() => setShowCard(true), 300);
  };

  useEffect(() => {
    // Generate initial poem silently so it's ready
    generatePoem();
  }, []);

  // Intro Screen (Wrapped Gift)
  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-200 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 text-white/30 animate-float"><Heart size={150} /></div>
          <div className="absolute bottom-20 right-10 text-white/30 animate-float" style={{animationDelay: '1s'}}><Sparkles size={180} /></div>
          <div className="absolute top-1/2 left-20 text-white/20 animate-pulse-slow"><Star size={80} /></div>
        </div>

        <div className="z-10 text-center px-4 animate-[fadeIn_1s_ease-out] relative">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-white/20 blur-3xl rounded-full pointer-events-none"></div>
          
          <h1 className="font-script text-6xl md:text-8xl text-white mb-6 drop-shadow-lg text-3d transform -rotate-2">
            Hey Ankita!
          </h1>
          <p className="text-2xl text-white/90 mb-12 font-sans font-medium max-w-lg mx-auto drop-shadow-md">
            Someone special (me!) prepared a magical surprise for you. 
          </p>
          
          <button 
            onClick={handleOpenGift}
            className="group relative flex flex-col items-center justify-center transition-transform hover:scale-105 active:scale-95 focus:outline-none"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400 blur-[60px] opacity-40 group-hover:opacity-70 transition-opacity rounded-full animate-pulse-slow"></div>
              <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-10 rounded-3xl shadow-2xl relative z-10 border-4 border-white/40 ring-4 ring-pink-300/50">
                <Gift size={80} className="text-white animate-bounce-gentle" />
                {/* Ribbon */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-full bg-yellow-300/80 shadow-sm"></div>
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-4 bg-yellow-300/80 shadow-sm"></div>
              </div>
            </div>
            <span className="mt-8 font-bold text-white bg-white/20 backdrop-blur-md border border-white/50 px-8 py-3 rounded-full shadow-xl flex items-center gap-3 group-hover:bg-white/30 transition-all text-lg">
              Open Your Present <ArrowRight size={20} />
            </span>
          </button>
        </div>
      </div>
    );
  }

  // Main Birthday App
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-50 relative overflow-hidden font-sans text-gray-800">
      <Confetti />
      <Balloons />
      <MusicPlayer playing={musicPlaying} onToggle={() => setMusicPlaying(!musicPlaying)} />

      <main className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
        
        {/* Floating Background Elements */}
        <div className="absolute top-10 left-10 text-pink-400 animate-float opacity-40 blur-[2px]">
          <PartyPopper size={84} />
        </div>
        <div className="absolute bottom-20 right-10 text-purple-400 animate-float opacity-40 blur-[2px]" style={{ animationDelay: '2s' }}>
          <Cake size={100} />
        </div>

        {/* Main Card */}
        <div 
          className={`
            w-full max-w-3xl bg-white/70 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] p-6 md:p-12 border border-white/80
            transform transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] mb-12 relative
            ${showCard ? 'scale-100 opacity-100 translate-y-0 rotate-0' : 'scale-75 opacity-0 translate-y-32 rotate-6'}
          `}
        >
           {/* Card decorative border */}
           <div className="absolute inset-2 border-2 border-dashed border-white/50 rounded-[2rem] pointer-events-none"></div>

          <div className="text-center mb-10 relative z-10">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-extrabold px-6 py-2 rounded-full mb-6 shadow-lg tracking-widest uppercase animate-bounce-gentle">
              <Star size={12} className="fill-white" />
              VIP: Very Important Princess
              <Star size={12} className="fill-white" />
            </div>
            
            <h1 className="font-script text-6xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-sm mb-2 animate-[float_4s_ease-in-out_infinite] bg-[length:200%_auto] animate-shine p-2">
              Happy Birthday
            </h1>
            <h2 className="font-sans font-black text-5xl md:text-8xl text-gray-800 tracking-tighter mb-8 text-3d transform -rotate-2 inline-block">
              Ankita!
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10 font-light">
              Today the world sparkles a little brighter because it's your day! ✨
            </p>

            {/* I Love You Message - Special Highlight */}
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-100 rounded-3xl p-8 mb-10 transform hover:scale-[1.02] transition-transform duration-300 shadow-md relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 text-red-100 opacity-50 group-hover:rotate-12 transition-transform duration-500"><Heart size={150} className="fill-current" /></div>
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="bg-white p-3 rounded-full shadow-md mb-4">
                  <Heart className="text-red-500 fill-red-500 animate-pulse" size={40} />
                </div>
                <p className="font-script text-2xl md:text-4xl text-red-600 leading-normal">
                  "I love you very much! You are the best girl I've ever known and my amazing best friend."
                </p>
              </div>
            </div>

            {/* Poem Section */}
            <div className="relative bg-white/50 rounded-2xl p-8 mb-10 border border-purple-100 shadow-inner">
               <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-purple-100 text-purple-600 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-sm flex items-center gap-2">
                 <Feather size={16} /> A Poem for You
               </div>
               
               <div className="font-script text-2xl md:text-3xl text-purple-900 leading-loose text-center min-h-[140px] flex items-center justify-center mt-4">
                  {loadingPoem ? (
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  ) : (
                    <p className="whitespace-pre-line drop-shadow-sm">{poem}</p>
                  )}
               </div>
               
               <div className="mt-6 flex justify-center">
                  <button 
                    onClick={generatePoem}
                    disabled={loadingPoem}
                    className="text-xs font-bold text-purple-500 hover:text-purple-700 hover:bg-purple-100 px-4 py-2 rounded-full uppercase tracking-widest transition-all"
                  >
                    ✨ Write Another Poem ✨
                  </button>
               </div>
            </div>

          </div>

          {/* Interactive Wish Section */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-1 shadow-xl relative overflow-hidden">
            <div className="bg-white/95 backdrop-blur-sm rounded-[1.3rem] p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="bg-pink-100 p-4 rounded-full text-pink-500 shrink-0 shadow-inner">
                  <Gift className="text-pink-600" size={32} />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-bold text-2xl text-gray-800 mb-2 flex items-center justify-center md:justify-start gap-2">
                    AI Birthday Wishes
                    {loadingWish && <Sparkles size={20} className="animate-spin text-purple-500" />}
                  </h3>
                  
                  <div className="min-h-[60px] text-gray-600 text-lg leading-relaxed mb-4 md:mb-0">
                    {wish ? (
                      <p className="animate-[fadeIn_0.5s_ease-out] font-medium">{wish}</p>
                    ) : (
                      <p className="text-gray-400 italic">Tap the button to generate a magical wish...</p>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={generateWish}
                  disabled={loadingWish}
                  className="shrink-0 group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-gray-900 rounded-2xl hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-purple-300 disabled:opacity-70 shadow-lg hover:-translate-y-1"
                >
                  {loadingWish ? (
                    <span className="flex items-center gap-2">Thinking...</span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Sparkles size={20} className="text-yellow-300" />
                      Generate Wish
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
          
        </div>

        {/* Gallery/Photos Placeholder */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl px-4 pb-32">
           {['joy', 'party', 'friends'].map((tag, idx) => (
             <div key={idx} className="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-8 border-white transform transition duration-500 hover:scale-105 hover:rotate-2 hover:z-10">
                <img 
                  src={`https://picsum.photos/seed/ankita${idx}/500/400`} 
                  alt="Birthday memory" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-bold text-lg capitalize flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <Heart size={20} className="fill-pink-500 text-pink-500" /> Sweet Memories
                  </span>
                </div>
             </div>
           ))}
        </div>
      </main>
    </div>
  );
};

export default App;