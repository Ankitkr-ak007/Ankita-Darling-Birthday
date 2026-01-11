import React, { useState, useEffect } from 'react';
import Confetti from './components/Confetti';
import MusicPlayer from './components/MusicPlayer';
import { generateBirthdayWish, generateBirthdayPoem } from './services/geminiService';
import { Sparkles, Gift, Heart, PartyPopper, Cake, Feather, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [started, setStarted] = useState<boolean>(false);
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
    // Slight delay for the card animation to start after the gift "opens"
    setTimeout(() => setShowCard(true), 100);
  };

  useEffect(() => {
    // Generate initial poem silently so it's ready
    generatePoem();
  }, []);

  // Intro Screen (Wrapped Gift)
  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-100 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 text-white/40 animate-float"><Heart size={100} /></div>
          <div className="absolute bottom-20 right-10 text-white/40 animate-float" style={{animationDelay: '1s'}}><Sparkles size={120} /></div>
        </div>

        <div className="z-10 text-center px-4 animate-[fadeIn_1s_ease-out]">
          <h1 className="font-script text-5xl md:text-7xl text-purple-600 mb-8 drop-shadow-sm">
            Hey Ankita!
          </h1>
          <p className="text-xl text-gray-700 mb-12 font-sans max-w-md mx-auto">
            I've created a special surprise just for you. Are you ready to see it?
          </p>
          
          <button 
            onClick={handleOpenGift}
            className="group relative flex flex-col items-center justify-center transition-transform hover:scale-105 active:scale-95 focus:outline-none"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-pink-400 blur-xl opacity-40 group-hover:opacity-60 transition-opacity rounded-full"></div>
              <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-8 rounded-2xl shadow-2xl relative z-10 border-4 border-white/30">
                <Gift size={64} className="text-white animate-bounce-gentle" />
              </div>
            </div>
            <span className="mt-6 font-bold text-white bg-purple-500/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg flex items-center gap-2 group-hover:bg-purple-600 transition-colors">
              Open My Surprise <ArrowRight size={18} />
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
      <MusicPlayer autoStart={true} />

      <main className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
        
        {/* Floating Background Elements */}
        <div className="absolute top-10 left-10 text-pink-300 animate-float opacity-50">
          <PartyPopper size={64} />
        </div>
        <div className="absolute bottom-20 right-10 text-purple-300 animate-float opacity-50" style={{ animationDelay: '2s' }}>
          <Cake size={80} />
        </div>
        <div className="absolute top-1/3 right-1/4 text-yellow-300 animate-pulse-slow opacity-60">
          <Sparkles size={48} />
        </div>

        {/* Main Card */}
        <div 
          className={`
            w-full max-w-2xl bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/50
            transform transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] mb-12
            ${showCard ? 'scale-100 opacity-100 translate-y-0' : 'scale-50 opacity-0 translate-y-20'}
          `}
        >
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow-lg tracking-wider uppercase">
              Best Friend Edition
            </div>
            
            <h1 className="font-script text-6xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-sm mb-4 animate-float">
              Happy Birthday
            </h1>
            <h2 className="font-sans font-bold text-5xl md:text-7xl text-gray-800 tracking-tight mb-6">
              Ankita!
            </h2>
            
            <p className="text-xl text-gray-600 max-w-lg mx-auto leading-relaxed mb-8">
              Today is all about YOU! Wishing you a day filled with laughter, joy, and unforgettable moments.
            </p>

            {/* I Love You Message */}
            <div className="bg-red-50/80 border border-red-100 rounded-2xl p-6 mb-8 transform hover:scale-105 transition-transform duration-300 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <Heart className="text-red-500 fill-red-500 animate-bounce-gentle mb-3" size={32} />
                <p className="font-script text-2xl md:text-3xl text-red-600 leading-relaxed">
                  "I love you very much! You are the best girl I've ever known and my amazing best friend."
                </p>
              </div>
            </div>

            {/* Poem Section */}
            <div className="relative bg-white/40 rounded-xl p-6 md:p-8 mb-8 border border-white/60">
               <div className="absolute -top-4 -right-4 text-purple-300 opacity-50 rotate-12">
                 <Feather size={64} />
               </div>
               <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center justify-center gap-2">
                 <Sparkles size={18} className="text-yellow-500" />
                 A Poem for Her
                 <Sparkles size={18} className="text-yellow-500" />
               </h3>
               
               <div className="font-script text-xl md:text-2xl text-purple-800 leading-loose text-center min-h-[120px] flex items-center justify-center">
                  {loadingPoem ? (
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-75"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                  ) : (
                    <p className="whitespace-pre-line">{poem}</p>
                  )}
               </div>
               
               <div className="mt-4 flex justify-center">
                  <button 
                    onClick={generatePoem}
                    disabled={loadingPoem}
                    className="text-xs font-semibold text-purple-500 hover:text-purple-700 uppercase tracking-widest transition-colors"
                  >
                    Write New Poem
                  </button>
               </div>
            </div>

          </div>

          {/* Interactive Wish Section */}
          <div className="bg-white/70 rounded-2xl p-6 shadow-inner border border-white/60 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-pink-400 to-purple-500"></div>
            
            <div className="flex items-start gap-4">
              <div className="bg-pink-100 p-3 rounded-full text-pink-500 shrink-0">
                <Gift className="text-pink-600" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800 mb-2 flex items-center gap-2">
                  Send a Birthday Wish
                  {loadingWish && <Sparkles size={16} className="animate-spin text-purple-500" />}
                </h3>
                
                <div className="min-h-[60px] text-gray-700 italic text-lg leading-relaxed">
                  {wish ? (
                     <p className="animate-[fadeIn_0.5s_ease-out]">{wish}</p>
                  ) : (
                    <p className="text-gray-400 text-base">Generate a special wish just for Ankita...</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={generateWish}
                disabled={loadingWish}
                className="group relative inline-flex items-center justify-center px-8 py-3 font-semibold text-white transition-all duration-200 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-70 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                {loadingWish ? (
                  <span className="flex items-center gap-2">
                    Thinking...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles size={20} />
                    {wish ? 'New Wish' : 'Generate Wish'}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          {/* Decorative Footer */}
          <div className="mt-12 flex justify-center gap-4 text-gray-400">
             <div className="w-2 h-2 rounded-full bg-pink-300"></div>
             <div className="w-2 h-2 rounded-full bg-purple-300"></div>
             <div className="w-2 h-2 rounded-full bg-yellow-300"></div>
          </div>
        </div>

        {/* Gallery/Photos Placeholder (Visual Balance) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl px-4 pb-20">
           {['fun', 'joy', 'smile'].map((tag, idx) => (
             <div key={idx} className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-4 border-white transform transition duration-300 hover:scale-105 hover:rotate-2">
                <img 
                  src={`https://picsum.photos/seed/${tag}${idx}/400/300`} 
                  alt="Birthday memory" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-medium capitalize flex items-center gap-2">
                    <Heart size={16} className="fill-white" /> Best Memories
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