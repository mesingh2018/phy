"use client"

import { useState } from 'react';

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
    <section className="my-12 animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 animate-bounce-in">Interactive Quizzes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={quiz.image}
              alt={quiz.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h3 className="text-lg font-semibold mb-2">{quiz.title}</h3>
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">Score: {quiz.score}</span>
            </div>
            {hoveredIndex === index && (
              <div className="absolute inset-0 bg-blue-600 bg-opacity-90 flex items-center justify-center transition-all duration-300 ease-in-out">
                <button className="bg-white text-blue-600 font-bold py-2 px-4 rounded hover:bg-blue-100 transition-colors duration-300">
                  Start Quiz
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}