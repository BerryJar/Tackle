import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, MapPin, Briefcase, Mail, Link as LinkIcon } from 'lucide-react';
import { validateRequest } from '../lib/auth';

interface ProfileProps {
  id: string;
}



const ProfilePageComponent: React.FC<ProfileProps> = ({
  id,

}) => {


  return (
    <div className="flex mx-auto p-6 h-screen w-screen items-center justify-center">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
          {/* <Avatar className="w-24 h-24">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar> */}
          <div className="text-center sm:text-left">
            {/* <CardTitle className="text-2xl font-bold">{name}</CardTitle>
            <CardDescription className="text-muted-foreground">@{username}</CardDescription> */}
          </div>
          <div className="flex-grow" />
        </CardHeader>
        <CardContent>
          {/* <p className="text-sm text-muted-foreground mb-4">{bio}</p>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-2 h-4 w-4" />
              {location}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <LinkIcon className="mr-2 h-4 w-4" />
              <a href={website} className="hover:underline">{website}</a>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarDays className="mr-2 h-4 w-4" />
              Joined {joinDate}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Mail className="mr-2 h-4 w-4" />
              {email}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Briefcase className="mr-2 h-4 w-4" />
              {occupation}
            </div>
          </div> */}
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="posts">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Posts</CardTitle>
                  <CardDescription>Your latest blog posts and articles.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li>
                      <h3 className="text-lg font-semibold">Introduction to Shadcn UI</h3>
                      <p className="text-sm text-muted-foreground">Published on May 15, 2023</p>
                    </li>
                    <li>
                      <h3 className="text-lg font-semibold">Building Responsive Layouts with Tailwind CSS</h3>
                      <p className="text-sm text-muted-foreground">Published on April 22, 2023</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="projects">
              <Card>
                <CardHeader>
                  <CardTitle>Projects</CardTitle>
                  <CardDescription>Your ongoing and completed projects.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">E-commerce Platform</h3>
                        <p className="text-sm text-muted-foreground">A full-stack e-commerce solution</p>
                      </div>
                      <Badge>In Progress</Badge>
                    </li>
                    <li className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">Weather App</h3>
                        <p className="text-sm text-muted-foreground">Real-time weather forecasting app</p>
                      </div>
                      <Badge variant="secondary">Completed</Badge>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest actions and contributions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="w-24">Commit</Badge>
                      <span className="text-sm">Updated README.md in project-x</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="w-24">Issue</Badge>
                      <span className="text-sm">Opened bug report in project-y</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="outline" className="w-24">Pull Request</Badge>
                      <span className="text-sm">Merged feature-z into main</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePageComponent;