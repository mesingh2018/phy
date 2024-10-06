"use client"

import { useState } from 'react';
import Image from 'next/image';

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-white mb-12 overflow-hidden">
      <div className="md:w-1/2 p-6 animate-fade-in-left">
        <h1 className="text-4xl font-bold mb-4 animate-bounce-in">Welcome to PhysiLearn</h1>
        <p className="text-xl mb-6 animate-fade-in">Learn physics topics through games, animations and community contributions.</p>
        <form onSubmit={handleSearch} className="flex gap-2 animate-slide-up">
          <input
            type="text"
            placeholder="Search for a topic or game"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white text-black px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 ease-in-out flex-grow"
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-r-lg transition-all duration-300 ease-in-out">
            Search
          </button>
        </form>
      </div>
      <div className="md:w-1/2 p-6 animate-fade-in-right">
        <div className="relative w-full h-64 md:h-80 animate-float">
          <Image
            src="/physics-illustration.png"
            alt="Physics Illustration"
            layout="fill"
            objectFit="contain"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}