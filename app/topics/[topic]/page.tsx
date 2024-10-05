"use client"

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { topicData } from '@/lib/topic-data';

export default function TopicPage() {
  const { topic } = useParams();
  const [progress, setProgress] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [simulationValue, setSimulationValue] = useState(50);

  const currentTopic = topicData[topic as keyof typeof topicData];

  if (!currentTopic) {
    return <div>Topic not found</div>;
  }

  const handleSimulationChange = (value: number[]) => {
    setSimulationValue(value[0]);
    // Update progress based on interaction
    setProgress((prevProgress) => Math.min(prevProgress + 5, 100));
  };

  const handleQuizSubmit = () => {
    // Simulating quiz submission and score calculation
    const newScore = Math.floor(Math.random() * 100);
    setQuizScore(newScore);
    setProgress(100); // Complete the topic progress
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{currentTopic.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Interactive Simulation</CardTitle>
            <CardDescription>{currentTopic.simulationDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Slider
                value={[simulationValue]}
                onValueChange={handleSimulationChange}
                max={100}
                step={1}
              />
            </div>
            <p>Current Value: {simulationValue}</p>
            {/* Add more interactive elements based on the topic */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quiz</CardTitle>
            <CardDescription>Test your knowledge on {currentTopic.title}</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Add quiz questions here */}
            <Button onClick={handleQuizSubmit}>Submit Quiz</Button>
            {quizScore > 0 && (
              <div className="mt-4">
                <p>Your Score: {quizScore}%</p>
                <Badge variant={quizScore >= 70 ? "success" : "destructive"}>
                  {quizScore >= 70 ? "Passed" : "Try Again"}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Topic Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="w-full" />
          <p className="mt-2">Progress: {progress}%</p>
        </CardContent>
      </Card>
    </div>
  );
}