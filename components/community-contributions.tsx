"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const contributions = [
  { title: "Bouncing Ball", type: "Physics Game", image: "/bouncing-ball.png", date: "2 weeks ago" },
  { title: "Pendulum Wave", type: "Physics Game", image: "/pendulum-wave.png", date: "2 weeks ago" },
  { title: "Projectile Motion", type: "Physics Game", image: "/projectile-motion.png", date: "2 weeks ago" },
  { title: "Double Slit Experiment", type: "Physics Game", image: "/double-slit.png", date: "2 weeks ago" },
  { title: "Particle in a Box", type: "Physics Game", image: "/particle-in-box.png", date: "2 weeks ago" },
];

export default function CommunityContributions() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold mb-6">Community Contributions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contributions.map((contribution, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            <Card className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative h-48">
                  <img
                    src={contribution.image}
                    alt={contribution.title}
                    className="w-full h-full object-cover"
                  />
                  {hoveredIndex === index && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <Badge variant="secondary" className="text-lg">
                        Play Now
                      </Badge>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2">{contribution.title}</CardTitle>
                <div className="flex justify-between items-center">
                  <Badge variant="outline">{contribution.type}</Badge>
                  <span className="text-sm text-gray-500">{contribution.date}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}