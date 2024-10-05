"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const quizzes = [
  { title: "Newton's Laws", score: 100, image: "/newtons-laws-quiz.png" },
  { title: "Thermodynamics", score: 80, image: "/thermodynamics-quiz.png" },
  { title: "Optics", score: 90, image: "/optics-quiz.png" },
  { title: "Electromagnetism", score: 95, image: "/electromagnetism-quiz.png" },
  { title: "Quantum Mechanics", score: 85, image: "/quantum-mechanics-quiz.png" },
];

export default function InteractiveQuizzes() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold mb-6">Interactive Quizzes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz, index) => (
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
                    src={quiz.image}
                    alt={quiz.title}
                    className="w-full h-full object-cover"
                  />
                  {hoveredIndex === index && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <Badge variant="secondary" className="text-lg">
                        Start Quiz
                      </Badge>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2">{quiz.title}</CardTitle>
                <Badge variant="outline">Score: {quiz.score}</Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}