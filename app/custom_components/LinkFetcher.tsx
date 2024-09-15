"use client"

import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ApiResponse {
  data: any;
  status: number;
}

const LinkFetcher: React.FC = () => {
  const [link, setLink] = useState('');
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    try {
      const response = await axios.get(link);
      setResult({
        data: response.data,
        status: response.status
      });
    } catch (err) {
      setError('An error occurred while fetching the data.');
      console.error(err);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Link Fetcher</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Enter a link"
            required
          />
          <Button type="submit" className="w-full">Fetch Data</Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {result && (
          <div className="mt-4 w-full">
            <h3 className="font-bold">Response:</h3>
            <p>Status: {result.status}</p>
            <pre className="mt-2 whitespace-pre-wrap overflow-x-auto max-h-60">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default LinkFetcher;