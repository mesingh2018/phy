"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TopicCard from '@/components/TopicCard';
import GameCard from '@/components/GameCard';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const topics = [
  { title: "Scalars and Vectors", image: "/topics/scalars-vectors.png" },
  { title: "Acceleration", image: "/topics/acceleration.png" },
  { title: "Free Fall", image: "/topics/free-fall.png" },
  { title: "Projectile Motion", image: "/topics/projectile-motion.png" },
  { title: "Force and Motion", image: "/topics/force-motion.png" },
  { title: "Inertia and Mass", image: "/topics/inertia-mass.png" },
  { title: "Friction", image: "/topics/friction.png" },
  { title: "Momentum", image: "/topics/momentum.png" },
  { title: "Energy", image: "/topics/energy.png" },
  { title: "Work and Power", image: "/topics/work-power.png" },
  // Add more topics as needed
];

const games = [
  { title: "Forces and Motion", description: "Lunar Lander, Runner Cars, Roller Coaster", image: "/games/forces-motion.png" },
  { title: "Electricity and Circuits", description: "Circuit Builder, Electric Field Hockey, Charge and Fields", image: "/games/electricity-circuits.png" },
  { title: "Energy and Power", description: "Energy Skate Park, Hooke's Law, Pendulum Lab", image: "/games/energy-power.png" },
  { title: "Wave and Sound", description: "Wave on a String, Ripple Tank, Sound Intensity", image: "/games/wave-sound.png" },
  { title: "Light and Optics", description: "Bending Light, Color Vision, Reflection and Refraction", image: "/games/light-optics.png" },
  // Add more games as needed
];

const categories = ["All", "Mechanics", "Electromagnetism", "Thermodynamics", "Optics", "Modern Physics"];

export default function TopicsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">Topics & Games</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <Input
        type="text"
        placeholder="Search topics and games..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-6"
      />

      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="my-progress">My Progress</TabsTrigger>
        </TabsList>
      </Tabs>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Games</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game, index) => (
            <GameCard key={index} game={game} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Topics</h2>
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredTopics.map((topic, index) => (
            <TopicCard key={index} topic={topic} />
          ))}
        </motion.div>
      </section>
    </div>
  );
}