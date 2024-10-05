import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';

const topics = [
  { title: "Newton's Laws", description: "Fundamental principles of motion" },
  { title: "Energy", description: "Conservation and transformation of energy" },
  { title: "Electricity", description: "Principles of electric charges and currents" },
  { title: "Waves", description: "Properties and behavior of waves" },
  { title: "Quantum Mechanics", description: "Principles of quantum physics" },
  { title: "Relativity", description: "Einstein's theories of relativity" },
];

export default function TopicsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Physics Topics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic, index) => (
          <Link href={`/topics/${topic.title.toLowerCase().replace(/\s+/g, '-')}`} key={index}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>{topic.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{topic.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}