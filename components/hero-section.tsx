"use client"

import { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-white mb-12">
      <div className="md:w-1/2 p-6">
        <h1 className="text-4xl font-bold mb-4">Welcome to PhysiLearn</h1>
        <p className="text-xl mb-6">Learn physics topics through games, animations and community contributions.</p>
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            type="text"
            placeholder="Search for a topic or game"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white text-black"
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
      <div className="md:w-1/2 p-6">
        <Image
          src="/physics-illustration.png"
          alt="Physics Illustration"
          width={500}
          height={300}
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}