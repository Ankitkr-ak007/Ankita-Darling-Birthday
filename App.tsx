import React, { useState, useEffect } from 'react';
import Starfield from './components/Starfield';
import MusicPlayer from './components/MusicPlayer';
import Balloons from './components/Balloons';
import HoloCard from './components/HoloCard';
import { generateBirthdayWish, generateBirthdayPoem } from './services/geminiService';
import { Sparkles, Heart, Cpu, Zap, Star, Aperture, Terminal, Play } from 'lucide-react';

const App: React.FC = () => {
  const [systemState, setSystemState] = useState<'LOCKED' | 'INITIALIZING' | 'ACTIVE'>('LOCKED');
  const [musicPlaying, setMusicPlaying] = useState<boolean>(false);
  const [wish, setWish] = useState<string>('');
  const [poem, setPoem] = useState<string>('');
  const [loadingWish, setLoadingWish] = useState<boolean>(false);
  const [loadingPoem, setLoadingPoem] = useState<boolean>(false);
  const [warpSpeed, setWarpSpeed] = useState<number>(1);
  
  const BIRTHDAY_TRACK_ID = "7mf1VOXSQCH53OoTfpFUTO";

  const MEMORIES = [
    "https://res.cloudinary.com/dkjmqjfsj/image/upload/v1768167994/WhatsApp_Image_2026-01-12_at_12.32.43_AM_jxbyac.jpg",
    "https://res.cloudinary.com/dkjmqjfsj/image/upload/v1768168002/WhatsApp_Image_2026-01-12_at_12.33.30_AM_r2zhqq.jpg",
    "https://res.cloudinary.com/dkjmqjfsj/image/upload/v1768168010/WhatsApp_Image_2026-01-12_at_12.33.07_AM_k5ixty.jpg"
  ];

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

  const initiateLaunchSequence = () => {
    setSystemState('INITIALIZING');
    setWarpSpeed(50); // Hyperdrive
    
    // Sequence timing
    setTimeout(() => {
      setWarpSpeed(2); // Cruise speed
      setSystemState('ACTIVE');
      setMusicPlaying(true);
    }, 2500);
  };

  useEffect(() => {
    generatePoem();
  }, []);

  // -- RENDER: LOCKED STATE (The Portal) --
  if (systemState === 'LOCKED') {
    return (
      <div className="min-h-screen bg-cyber-black flex flex-col items-center justify-center relative overflow-hidden font-display selection:bg-cyber-primary selection:text-black">
        <Starfield speed={0.5} />
        
        <div className="z-10 text-center relative p-8 w-full max-w-lg">
           {/* Rotating Ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] border border-cyber-primary/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] md:w-[400px] h-[240px] md:h-[400px] border border-dashed border-cyber-secondary/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

          <h1 className="text-4xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary via-white to-cyber-secondary drop-shadow-[0_0_15px_rgba(0,243,255,0.5)] mb-4 tracking-tight animate-pulse-neon">
            SYSTEM DETECTED
          </h1>
          <p className="text-cyber-primary/70 text-sm md:text-xl tracking-[0.3em] md:tracking-[0.5em] mb-12 uppercase">Target: Ankita</p>
          
          <button 
            onClick={initiateLaunchSequence}
            className="group relative inline-flex items-center justify-center w-full md:w-auto"
          >
            <div className="absolute inset-0 bg-cyber-primary blur-lg opacity-40 group-hover:opacity-100 transition-opacity duration-300 rounded-full animate-pulse-neon"></div>
            <div className="relative bg-black border border-cyber-primary/50 text-cyber-primary hover:bg-cyber-primary hover:text-black px-8 py-4 md:px-12 rounded-full font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-4 hover:scale-105 shadow-[0_0_30px_rgba(0,243,255,0.2)] text-sm md:text-base w-full md:w-auto">
              <Zap size={20} className="fill-current" />
              Initialize Party Protocol
            </div>
          </button>
        </div>
      </div>
    );
  }

  // -- RENDER: INITIALIZING (The Warp) --
  if (systemState === 'INITIALIZING') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden px-4">
        <Starfield speed={warpSpeed} />
        <div className="z-10 text-center w-full">
            <div className="text-3xl md:text-6xl font-display text-white animate-glitch tracking-widest break-words">
                ACCESSING MAINFRAME...
            </div>
            <div className="mt-8 w-full max-w-md h-2 bg-gray-900 rounded-full overflow-hidden mx-auto border border-white/20">
                <div className="h-full bg-cyber-primary animate-[scanner_1s_ease-in-out_infinite]"></div>
            </div>
        </div>
      </div>
    );
  }

  // -- RENDER: ACTIVE (The Main Interface) --
  return (
    <div className="min-h-screen bg-cyber-black relative overflow-x-hidden font-sans text-white selection:bg-cyber-accent selection:text-white">
      <Starfield speed={warpSpeed} />
      <Balloons />
      <MusicPlayer 
        playing={musicPlaying} 
        trackId={BIRTHDAY_TRACK_ID}
        onToggle={() => setMusicPlaying(!musicPlaying)} 
      />

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
        
        {/* Floating Cyber Elements */}
        <div className="fixed top-20 left-10 text-cyber-primary/20 animate-float pointer-events-none hidden md:block"><Aperture size={120} /></div>
        <div className="fixed bottom-32 right-10 text-cyber-secondary/20 animate-[float_8s_ease-in-out_infinite] pointer-events-none hidden md:block"><Cpu size={100} /></div>

        {/* 1. HERO SECTION */}
        <div className="w-full max-w-4xl mb-12 md:mb-16 perspective-1000">
            <div className="text-center animate-pop-in">
              <div className="inline-flex items-center gap-2 md:gap-3 border border-cyber-accent/30 bg-cyber-accent/10 px-4 py-1.5 md:px-6 md:py-2 rounded-full mb-6 backdrop-blur-md">
                <Star size={12} className="text-cyber-accent animate-spin-slow" />
                <span className="text-cyber-accent font-display tracking-widest text-[10px] md:text-xs uppercase">VIP - Very Important Princess</span>
                <Star size={12} className="text-cyber-accent animate-spin-slow" />
              </div>

              <h1 className="font-display text-5xl md:text-9xl mb-2 md:mb-4 leading-none">
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 opacity-90 text-2xl md:text-4xl mb-2">HAPPY</span>
                <span className="block text-neon-blue glitch-text tracking-tight" data-text="BIRTHDAY">BIRTHDAY</span>
              </h1>
              <h2 className="font-script text-5xl md:text-8xl text-neon-pink transform -rotate-3 md:-rotate-6 -mt-2 md:-mt-4 block relative z-10">Ankita</h2>
              
              <p className="mt-8 text-base md:text-xl text-cyan-100/60 max-w-2xl mx-auto font-light tracking-wide border-l-2 border-cyber-primary pl-4 md:pl-6 text-left">
                Initialization complete. The universe has been reconfigured to celebrate your existence. Systems operating at 100% joy capacity.
              </p>
            </div>
        </div>

        {/* 2. THE CORE (HoloCard with Logic) */}
        <div className="w-full max-w-2xl mb-16 md:mb-24 z-20">
          <HoloCard>
             <div className="p-6 md:p-12 text-center relative">
                {/* Decoration */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-primary to-transparent opacity-50"></div>
                
                <Heart size={32} className="mx-auto text-cyber-accent mb-4 md:mb-6 animate-pulse-neon fill-current md:w-12 md:h-12" />
                
                <h3 className="text-lg md:text-2xl font-display text-white mb-4 md:mb-6 uppercase tracking-widest">Primary Objective: Love</h3>
                
                <p className="text-base md:text-xl text-gray-300 leading-relaxed font-light mb-6 md:mb-8">
                  "I love you infinitely. In a world of algorithms and variables, you are my only constant. You are the best girl I have ever known and my ultimate teammate."
                </p>

                <div className="grid grid-cols-2 gap-4 text-[10px] md:text-xs font-mono text-cyber-primary/60 border-t border-white/10 pt-4 md:pt-6">
                   <div>STATUS: <span className="text-cyber-primary">CONNECTED</span></div>
                   <div>PING: <span className="text-cyber-primary">1ms</span></div>
                </div>
             </div>
          </HoloCard>
        </div>

        {/* 3. AI POETRY TERMINAL */}
        <div className="w-full max-w-3xl mb-16 md:mb-20">
           <div className="bg-[#0a0a10] border border-gray-800 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(188,19,254,0.1)]">
              {/* Terminal Header */}
              <div className="bg-[#1a1a24] px-4 py-2 flex items-center gap-2 border-b border-gray-800">
                <div className="flex gap-2">
                   <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500/50"></div>
                   <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500/50"></div>
                   <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="ml-4 text-[10px] md:text-xs font-mono text-gray-500 flex items-center gap-2">
                  <Terminal size={10} className="md:w-3 md:h-3" />
                  gemini_core_v3.sh
                </div>
              </div>
              
              {/* Terminal Body */}
              <div className="p-4 md:p-8 font-mono text-xs md:text-base relative min-h-[160px] md:min-h-[200px] flex flex-col justify-center">
                 {loadingPoem ? (
                    <div className="text-cyber-secondary animate-pulse">
                      &gt; ESTABLISHING NEURAL LINK...<br/>
                      &gt; DOWNLOADING CREATIVITY MODULES...<br/>
                      <span className="inline-block w-2 h-4 bg-cyber-secondary animate-pulse ml-1 align-middle"></span>
                    </div>
                 ) : (
                    <div className="relative">
                      <div className="absolute -left-2 md:-left-4 top-0 bottom-0 w-1 bg-cyber-secondary/30"></div>
                      <p className="text-cyber-primary whitespace-pre-line leading-loose drop-shadow-md">
                        {poem}
                      </p>
                      <div className="mt-4 text-gray-600 animate-pulse">_</div>
                    </div>
                 )}
              </div>

              {/* Terminal Footer Action */}
              <div className="p-3 md:p-4 bg-[#11111a] border-t border-gray-800 flex justify-end">
                 <button 
                   onClick={generatePoem}
                   disabled={loadingPoem}
                   className="text-[10px] md:text-xs font-bold text-cyber-secondary hover:text-white hover:bg-cyber-secondary/20 px-3 py-1.5 md:px-4 md:py-2 rounded transition-colors uppercase tracking-wider flex items-center gap-2"
                 >
                   <Terminal size={12} className="md:w-[14px] md:h-[14px]" />
                   Rerun Script
                 </button>
              </div>
           </div>
        </div>

        {/* 4. WISH GENERATOR (Glass Panel) */}
        <div className="w-full max-w-4xl relative group mb-32">
           <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
           <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
              
              <div className="flex-1 w-full text-center md:text-left">
                 <h3 className="text-xl md:text-2xl font-display text-white mb-2 flex items-center justify-center md:justify-start gap-3">
                   <Sparkles className="text-yellow-400 w-5 h-5 md:w-6 md:h-6" />
                   Quantum Wish Engine
                 </h3>
                 <p className="text-gray-400 font-light mb-6 text-sm md:text-base">
                    Powered by advanced Generative AI to craft the perfect sentiment.
                 </p>
                 <div className="bg-black/30 rounded-lg p-4 md:p-6 min-h-[80px] flex items-center justify-center md:justify-start text-base md:text-lg text-cyan-50">
                    {loadingWish ? (
                      <span className="animate-pulse">Processing natural language inputs...</span>
                    ) : (
                      wish || "System idle. Awaiting user input."
                    )}
                 </div>
              </div>

              <button
                onClick={generateWish}
                disabled={loadingWish}
                className="shrink-0 h-16 w-16 md:h-20 md:w-20 rounded-full bg-gradient-to-br from-cyber-primary to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:scale-110 hover:rotate-12 transition-all duration-300 group-disabled:opacity-50 disabled:grayscale"
              >
                {loadingWish ? (
                   <div className="w-6 h-6 md:w-8 md:h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                   <Play size={24} className="text-white fill-white ml-1 md:w-[32px] md:h-[32px]" />
                )}
              </button>
           </div>
        </div>

        {/* 5. MEMORY MATRIX (Grid) */}
        <div className="w-full max-w-6xl pb-24">
           <h3 className="text-center font-display text-2xl md:text-3xl mb-8 md:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyber-secondary to-cyber-accent">MEMORY_MATRIX_LOADED</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {MEMORIES.map((src, i) => (
                <div key={i} className="group relative h-64 md:h-80 rounded-2xl overflow-hidden cursor-pointer">
                   {/* Image */}
                   <img 
                      src={src} 
                      alt={`Memory ${i + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                   />
                   
                   {/* Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                   
                   {/* Border Glow */}
                   <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyber-primary transition-colors duration-300 rounded-2xl"></div>

                   <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="text-cyber-primary font-mono text-xs mb-1">DATA_LOG_00{i+1}</div>
                      <div className="text-white font-bold text-lg md:text-xl">Core Memory</div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="text-center text-white/20 text-[10px] md:text-xs font-mono pb-8">
           SYSTEM ARCHITECT: YOUR BEST FRIEND <br/>
           RENDERED IN REACT.JS :: TAILWIND :: GEMINI API
        </div>

      </main>
    </div>
  );
};

export default App;