import React, { useState, useEffect } from 'react';
import { Heart, Music, Gift, Cake } from 'lucide-react';
import './App.css';

const MEMORY_MATRIX_LOADED = [
  {
    src: 'https://res.cloudinary.com/dkjmqjfsj/image/upload/v1768167994/WhatsApp_Image_2026-01-12_at_12.32.43_AM_jxbyac.jpg',
    alt: 'Memory 1'
  },
  {
    src: 'https://res.cloudinary.com/dkjmqjfsj/image/upload/v1768168002/WhatsApp_Image_2026-01-12_at_12.33.30_AM_r2zhqq.jpg',
    alt: 'Memory 2'
  },
  {
    src: 'https://res.cloudinary.com/dkjmqjfsj/image/upload/v1768168010/WhatsApp_Image_2026-01-12_at_12.33.07_AM_k5ixty.jpg',
    alt: 'Memory 3'
  }
];

export default function App() {
  const [playMusic, setPlayMusic] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="text-center pt-12 pb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 mb-4">
            Happy Birthday Ankita! 🎉
          </h1>
          <p className="text-xl text-gray-700">A special celebration of your wonderful year</p>
        </header>

        {/* Memory Gallery */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Memories Together</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MEMORY_MATRIX_LOADED.map((memory, i) => (
              <div
                key={i}
                className="transform hover:scale-105 transition-transform duration-300 rounded-lg overflow-hidden shadow-2xl"
              >
                <img
                  src={memory.src}
                  alt={memory.alt}
                  className="w-full h-96 object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Messages Section */}
        <section className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-2xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <Heart className="text-red-500" /> Special Messages
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-gray-700 leading-relaxed">
                Happy Birthday to the most amazing person! 🎂 May your day be filled with joy, laughter, and all the things that make you smile.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Thank you for being such an incredible friend. Your kindness and warmth brighten everyone's day. Wishing you a year filled with new adventures and cherished moments!
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Celebrating YOU today and every day! 🎁✨
              </p>
            </div>
          </div>
        </section>

        {/* Music Player */}
        <section className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-gradient-to-r from-pink-300 to-purple-300 rounded-2xl p-8 shadow-xl text-center">
            <h2 className="text-3xl font-bold mb-6 text-white flex items-center justify-center gap-2">
              <Music /> Birthday Playlist
            </h2>
            <button
              onClick={() => setPlayMusic(!playMusic)}
              className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors duration-300"
            >
              {playMusic ? '🎵 Music Playing' : '▶️ Play Birthday Vibes'}
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 text-gray-600">
          <p className="flex items-center justify-center gap-2">
            <Cake /> Made with love and sprinkled with wishes <Cake />
          </p>
        </footer>
      </div>
    </div>
  );
}