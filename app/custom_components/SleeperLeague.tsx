import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface LeagueDetails {
  league_id: string;
  name: string;
  season: string;
  total_rosters: number;
  status: string;
  sport: string;
  settings: {
    league_type: string;
    scoring_type: string;
    playoff_week_start: number;
    num_teams: number;
  };
}

const SleeperLeagueDetails: React.FC = () => {
  const [leagueId, setLeagueId] = useState<string>('');
  const [leagueDetails, setLeagueDetails] = useState<LeagueDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeagueDetails = async () => {
    if (!leagueId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<LeagueDetails>(`https://api.sleeper.app/v1/league/${leagueId}`);
      setLeagueDetails(response.data);
    } catch (err) {
      setError('Failed to fetch league details. Please check the league ID and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto h-screen">
      <CardHeader>
        <CardTitle>Sleeper League Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            value={leagueId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLeagueId(e.target.value)}
            placeholder="Enter League ID"
            className="flex-grow"
          />
          <Button className="dark:bg-neutral-950 bg-sky-800 dark:text-white " onClick={fetchLeagueDetails} disabled={loading}>
            {loading ? 'Loading...' : 'Fetch Details'}
          </Button>
        </div>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        {leagueDetails && (
          <div className="space-y-4">
            <div>
              <Label className="font-bold">League Name:</Label>
              <p>{leagueDetails.name}</p>
            </div>
            <div>
              <Label className="font-bold">Season:</Label>
              <p>{leagueDetails.season}</p>
            </div>
            <div>
              <Label className="font-bold">Sport:</Label>
              <p>{leagueDetails.sport}</p>
            </div>
            <div>
              <Label className="font-bold">Total Rosters:</Label>
              <p>{leagueDetails.total_rosters}</p>
            </div>
            <div>
              <Label className="font-bold">Status:</Label>
              <p>{leagueDetails.status}</p>
            </div>
            <div>
              <Label className="font-bold">League Type:</Label>
              <p>{leagueDetails.settings.league_type}</p>
            </div>
            <div>
              <Label className="font-bold">Scoring Type:</Label>
              <p>{leagueDetails.settings.scoring_type}</p>
            </div>
            <div>
              <Label className="font-bold">Playoff Start Week:</Label>
              <p>{leagueDetails.settings.playoff_week_start}</p>
            </div>
            <div>
              <Label className="font-bold">Number of Teams:</Label>
              <p>{leagueDetails.settings.num_teams}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SleeperLeagueDetails;