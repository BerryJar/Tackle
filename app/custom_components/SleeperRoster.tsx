import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface League {
  league_id: string;
  name: string;
  total_rosters: number;
  status: string;
  season: string;
}

const SleeperUserLeagues: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const [sport, setSport] = useState<string>('nfl');
  const [season, setSeason] = useState<string>('2023');
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeagues = async () => {
    if (!userId || !sport || !season) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<League[]>(`https://api.sleeper.app/v1/user/${userId}/leagues/${sport}/${season}`);
      setLeagues(response.data);
    } catch (err) {
      setError('Failed to fetch league data. Please check the user ID, sport, and season and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="flex flex-col w-full max-w-3xl mx-auto h-full items-center justify-center">
      <CardHeader>
        <CardTitle>Sleeper User Leagues</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4 mb-4">
          <Input
            type="text"
            value={userId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserId(e.target.value)}
            placeholder="Enter User ID"
          />
          <Select value={sport} onValueChange={setSport}>
            <SelectTrigger>
              <SelectValue placeholder="Select sport" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nfl">NFL</SelectItem>
              <SelectItem value="nba">NBA</SelectItem>
              <SelectItem value="mlb">MLB</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="text" 
            value={season}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSeason(e.target.value)}
            placeholder="Enter Season (e.g., 2023)"
          />
          <Button className="bg-sky-800 dark:bg-neutral-950 dark:text-white dark:hover:bg-sky-800" onClick={fetchLeagues} disabled={loading}>
            {loading ? 'Loading...' : 'Fetch Leagues'}
          </Button>
        </div>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        {leagues.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>League ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Total Rosters</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leagues.map((league) => (
                <TableRow key={league.league_id}>
                  <TableCell>{league.league_id}</TableCell>
                  <TableCell>{league.name}</TableCell>
                  <TableCell>{league.total_rosters}</TableCell>
                  <TableCell>{league.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default SleeperUserLeagues;