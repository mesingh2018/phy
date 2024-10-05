"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const simulations = [
  { title: "Newton's Laws", level: "Beginner", image: "/newtons-laws-sim.png" },
  { title: "Thermodynamics", level: "Intermediate", image: "/thermodynamics-sim.png" },
  { title: "Optics", level: "Advanced", image: "/optics-sim.png" },
  { title: "Electromagnetism", level: "Expert", image: "/electromagnetism-sim.png" },
  { title: "Quantum Mechanics", level: "Master", image: "/quantum-mechanics-sim.png" },
];

export default function InteractiveSimulations() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold mb-6">Interactive Simulations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {simulations.map((sim, index) => (
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
                    src={sim.image}
                    alt={sim.title}
                    className="w-full h-full object-cover"
                  />
                  {hoveredIndex === index && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <Badge variant="secondary" className="text-lg">
                        Start Simulation
                      </Badge>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2">{sim.title}</CardTitle>
                <Badge variant="outline">Level: {sim.level}</Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}