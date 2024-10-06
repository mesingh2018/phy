"use client"

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const badges = [
  { title: "Newton's Laws", image: "/newtons-laws-badge.png", description: "You have earned this badge" },
  { title: "Thermodynamics", image: "/thermodynamics-badge.png", description: "You have earned this badge" },
  { title: "Optics", image: "/optics-badge.png", description: "You have earned this badge" },
  { title: "Electromagnetism", image: "/electromagnetism-badge.png", description: "You have earned this badge" },
  { title: "Quantum Mechanics", image: "/quantum-mechanics-badge.png", description: "You have earned this badge" },
];

export default function AchievementBadges() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold mb-6">Achievement Badges</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {badges.map((badge, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1, rotate: 5 }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            <Card className="w-40 h-40 flex flex-col items-center justify-center">
              <img
                src={badge.image}
                alt={badge.title}
                className="w-24 h-24 object-contain mb-2"
              />
              <CardContent className="p-2 text-center">
                <Badge variant="secondary" className="text-xs">
                  {badge.title}
                </Badge>
                {hoveredIndex === index && (
                  <p className="text-xs mt-2">{badge.description}</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}