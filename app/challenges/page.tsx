import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const challenges = [
  { id: 1, title: "Newton's Cradle", difficulty: "Easy", points: 100 },
  { id: 2, title: "Roller Coaster Designer", difficulty: "Medium", points: 250 },
  { id: 3, title: "Quantum Entanglement Puzzle", difficulty: "Hard", points: 500 },
  { id: 4, title: "Wave Interference Simulator", difficulty: "Medium", points: 300 },
];

export default function ChallengePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Physics Challenges</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <Card key={challenge.id}>
            <CardHeader>
              <CardTitle>{challenge.title}</CardTitle>
              <CardDescription>
                Difficulty: {challenge.difficulty}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Badge>{challenge.points} points</Badge>
              <Button asChild className="w-full mt-4">
                <Link href={`/challenges/${challenge.id}`}>Start Challenge</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}