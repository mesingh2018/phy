import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const leaderboardData = [
  { rank: 1, name: "Alice", points: 1500, badges: ["Newton's Apprentice", "Energy Master"] },
  { rank: 2, name: "Bob", points: 1350, badges: ["Wave Rider", "Quantum Explorer"] },
  { rank: 3, name: "Charlie", points: 1200, badges: ["Force Wielder"] },
  { rank: 4, name: "Diana", points: 1100, badges: ["Momentum Maven"] },
  { rank: 5, name: "Ethan", points: 1000, badges: ["Gravity Guru"] },
];

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Leaderboard</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Points</TableHead>
            <TableHead>Badges</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboardData.map((entry) => (
            <TableRow key={entry.rank}>
              <TableCell className="font-medium">{entry.rank}</TableCell>
              <TableCell>{entry.name}</TableCell>
              <TableCell>{entry.points}</TableCell>
              <TableCell>
                {entry.badges.map((badge, index) => (
                  <Badge key={index} variant="secondary" className="mr-2">
                    {badge}
                  </Badge>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}