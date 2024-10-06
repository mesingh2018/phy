"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface TopicCardProps {
  topic: {
    title: string;
    image: string;
  };
}

const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-lg"
    >
      <Link href={`/topics/${topic.title.toLowerCase().replace(/\s+/g, '-')}`}>
        <div className="relative h-40">
          <Image
            src={topic.image}
            alt={topic.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg">{topic.title}</h3>
        </div>
      </Link>
    </motion.div>
  );
};

export default TopicCard;