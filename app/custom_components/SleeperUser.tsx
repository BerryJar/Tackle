import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserDetails {
  username: string;
  user_id: string;
  display_name: string;
  avatar: string;
  email?: string;
  phone?: string;
  real_name?: string;
  joined_epoch?: number;
}

const SleeperUserDetails: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserDetails = async () => {
    if (!username) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<UserDetails>(`https://api.sleeper.app/v1/user/${username}`);
      setUserDetails(response.data);
    } catch (err) {
      setError('Failed to fetch user details. Please check the username and try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (epoch: number | undefined) => {
    if (!epoch) return 'N/A';
    return new Date(epoch * 1000).toLocaleDateString();
  };

  return (
    <Card className="w-full max-w-3xl mx-auto h-screen">
      <CardHeader>
        <CardTitle>Sleeper User Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            placeholder="Enter Sleeper Username"
            className="flex-grow"
          />
          <Button className="bg-sky-800 dark:bg-neutral-950 dark:text-white" onClick={fetchUserDetails} disabled={loading}>
            {loading ? 'Loading...' : 'Fetch User'}
          </Button>
        </div>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        {userDetails && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={`https://sleepercdn.com/avatars/${userDetails.avatar}`} />
                <AvatarFallback>{userDetails.display_name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{userDetails.display_name}</h2>
                <p className="text-gray-500">@{userDetails.username}</p>
              </div>
            </div>
            <div>
              <Label className="font-bold">User ID:</Label>
              <p>{userDetails.user_id}</p>
            </div>
            {userDetails.real_name && (
              <div>
                <Label className="font-bold">Real Name:</Label>
                <p>{userDetails.real_name}</p>
              </div>
            )}
            {userDetails.email && (
              <div>
                <Label className="font-bold">Email:</Label>
                <p>{userDetails.email}</p>
              </div>
            )}
            {userDetails.phone && (
              <div>
                <Label className="font-bold">Phone:</Label>
                <p>{userDetails.phone}</p>
              </div>
            )}
            <div>
              <Label className="font-bold">Joined Date:</Label>
              <p>{formatDate(userDetails.joined_epoch)}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SleeperUserDetails;