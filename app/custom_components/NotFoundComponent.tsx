"use client"


import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";

const NotFoundPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-neutral-950">
      <Card className="w-[350px] text-center">
        <CardHeader>
          <CardTitle className="text-4xl font-bold">404</CardTitle>
          <CardDescription className="dark:text-red-600 text-red-600">Oops! Page not found.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-black dark:text-white mb-4">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          {/* <div className="flex justify-center">
            <Home className="w-24 h-24 text-black dark:text-white" />
          </div> */}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
          <Button onClick={() => router.push('/')}>
            <Home className="mr-2 h-4 w-4" /> Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotFoundPage;