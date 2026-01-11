import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Music, Pause, Play, Volume2 } from 'lucide-react';

interface Note {
  freq: number;
  duration: number;
}

const NOTES: Record<string, number> = {
  G4: 392.00,
  A4: 440.00,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
};

// Happy Birthday melody sequence
const MELODY: Note[] = [
  { freq: NOTES.G4, duration: 0.3 }, { freq: NOTES.G4, duration: 0.1 }, { freq: NOTES.A4, duration: 0.4 }, { freq: NOTES.G4, duration: 0.4 }, { freq: NOTES.C5, duration: 0.4 }, { freq: NOTES.B4, duration: 0.8 },
  { freq: NOTES.G4, duration: 0.3 }, { freq: NOTES.G4, duration: 0.1 }, { freq: NOTES.A4, duration: 0.4 }, { freq: NOTES.G4, duration: 0.4 }, { freq: NOTES.D5, duration: 0.4 }, { freq: NOTES.C5, duration: 0.8 },
  { freq: NOTES.G4, duration: 0.3 }, { freq: NOTES.G4, duration: 0.1 }, { freq: NOTES.G5, duration: 0.4 }, { freq: NOTES.E5, duration: 0.4 }, { freq: NOTES.C5, duration: 0.4 }, { freq: NOTES.B4, duration: 0.4 }, { freq: NOTES.A4, duration: 0.8 },
  { freq: NOTES.F5, duration: 0.3 }, { freq: NOTES.F5, duration: 0.1 }, { freq: NOTES.E5, duration: 0.4 }, { freq: NOTES.C5, duration: 0.4 }, { freq: NOTES.D5, duration: 0.4 }, { freq: NOTES.C5, duration: 1.0 },
];

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const nextNoteTimeRef = useRef<number>(0);
  const noteIndexRef = useRef<number>(0);
  const timerIdRef = useRef<number | null>(null);

  const scheduleNote = (freq: number, duration: number, time: number) => {
    if (!audioCtxRef.current) return;
    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();

    osc.type = 'triangle'; // Smoother sound than square/sawtooth
    osc.frequency.value = freq;

    osc.connect(gain);
    gain.connect(audioCtxRef.current.destination);

    osc.start(time);
    
    // Envelope to make it sound nice
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.3, time + 0.05); // Attack
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration); // Decay
    
    osc.stop(time + duration);
  };

  const scheduler = useCallback(() => {
    if (!audioCtxRef.current) return;

    // Look ahead 0.1 seconds
    while (nextNoteTimeRef.current < audioCtxRef.current.currentTime + 0.1) {
      const note = MELODY[noteIndexRef.current];
      scheduleNote(note.freq, note.duration, nextNoteTimeRef.current);
      
      // Advance time
      nextNoteTimeRef.current += note.duration;
      
      // Advance note index, loop if at end
      noteIndexRef.current++;
      if (noteIndexRef.current >= MELODY.length) {
         // Add a small pause between loops
         nextNoteTimeRef.current += 1.5;
         noteIndexRef.current = 0;
      }
    }
    timerIdRef.current = window.setTimeout(scheduler, 25);
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      if (timerIdRef.current) clearTimeout(timerIdRef.current);
      if (audioCtxRef.current) audioCtxRef.current.suspend();
      setIsPlaying(false);
    } else {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        nextNoteTimeRef.current = audioCtxRef.current.currentTime + 0.1;
      }
      
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      
      // If we stopped, we restart the scheduler
      if (!timerIdRef.current) {
         scheduler();
      }
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (timerIdRef.current) clearTimeout(timerIdRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <button
      onClick={togglePlay}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-pink-600 px-6 py-3 rounded-full shadow-xl hover:scale-105 transition-transform duration-300 border-2 border-pink-100"
    >
      {isPlaying ? (
        <>
          <Pause size={20} className="fill-current" />
          <span className="font-semibold">Pause Song</span>
        </>
      ) : (
        <>
          <Play size={20} className="fill-current" />
          <span className="font-semibold">Play Birthday Song</span>
        </>
      )}
      <div className={`ml-2 flex gap-0.5 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}>
         <div className="w-1 h-3 bg-pink-400 animate-[bounce_1s_infinite]"></div>
         <div className="w-1 h-4 bg-purple-400 animate-[bounce_1.2s_infinite]"></div>
         <div className="w-1 h-2 bg-yellow-400 animate-[bounce_0.8s_infinite]"></div>
      </div>
    </button>
  );
};

export default MusicPlayer;