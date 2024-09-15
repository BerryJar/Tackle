

"use client"
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, MapPin, Briefcase, Mail, Link as LinkIcon } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from '@/hooks/use-toast';

interface UserDisplayInfo {
  userInfo: {

    id: string;
    displayInfo: string;
    email: string;
    profilePicture: string;
    location: string;
    website: string;
    bio: string;
    occupation: string;
    createdAt: string;
  }

}

function isUserDisplayInfo(userInfo: UserDisplayInfo | null): userInfo is UserDisplayInfo {
  return userInfo !== null;
}

interface UsersOwnProfileProps {
  userInfo: UserDisplayInfo;
}

const UsersOwnProfile: React.FC<UserDisplayInfo> = (
  {
    userInfo
  }
) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    location: userInfo.location,
    website: userInfo.website,
    bio: userInfo.bio,
    occupation: userInfo.occupation,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({ ...prev, [name]: value }));
  };


  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userInfo.id,
          ...editedProfile,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();
      // Update the local state with the new user info
      setEditedProfile({
        location: updatedUser.location,
        website: updatedUser.website,
        bio: updatedUser.bio,
        occupation: updatedUser.occupation,
      });
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };


  console.log("UserInfoUOP " + userInfo.bio.toString())

  // console.log(id, displayName, email, profilePicture, location, website, bio, occupation, createdAt)

  return (
    <div className="flex mx-auto p-6 h-screen w-screen items-center justify-center">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
          {/* <Avatar className="w-24 h-24">
            <AvatarImage src={profilePicture} alt={displayName} />
            <AvatarFallback>{displayName.charAt(0)}</AvatarFallback>
          </Avatar> */}
          <div className="text-center sm:text-left">
            <CardTitle className="text-2xl font-bold">{userInfo.displayInfo}</CardTitle>
            <CardDescription className="text-muted-foreground">@{userInfo.id}</CardDescription>
          </div>
          <div className="flex-grow" />
          <Button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
          {isEditing && <Button onClick={handleSave}>Save</Button>}
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="space-y-4">
              <Textarea
                name="bio"
                value={editedProfile.bio}
                onChange={handleInputChange}
                placeholder="Bio"
              />
              <Input
                name="location"
                value={editedProfile.location}
                onChange={handleInputChange}
                placeholder="Location"
              />
              <Input
                name="website"
                value={editedProfile.website}
                onChange={handleInputChange}
                placeholder="Website"
              />
              <Input
                name="occupation"
                value={editedProfile.occupation}
                onChange={handleInputChange}
                placeholder="Occupation"
              />
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-4">{userInfo.bio}</p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  {userInfo.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <LinkIcon className="mr-2 h-4 w-4" />
                  <a href={userInfo.website} className="hover:underline">{userInfo.website}</a>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Joined {new Date(userInfo.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="mr-2 h-4 w-4" />
                  {userInfo.email}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Briefcase className="mr-2 h-4 w-4" />
                  {userInfo.occupation}
                </div>
              </div>
            </>
          )}
          <Tabs defaultValue="posts" className="w-full">
            {/* ... (rest of the tabs content remains the same) ... */}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersOwnProfile;
