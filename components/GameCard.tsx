"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface GameCardProps {
  game: {
    title: string;
    description: string;
    image: string;
  };
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-lg"
    >
      <Link href={`/games/${game.title.toLowerCase().replace(/\s+/g, '-')}`}>
        <div className="relative h-48">
          <Image
            src={game.image}
            alt={game.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-xl mb-2">{game.title}</h3>
          <p className="text-sm text-muted-foreground">{game.description}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default GameCard;