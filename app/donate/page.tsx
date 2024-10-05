"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DonatePage() {
  const [formData, setFormData] = useState({
    amount: '',
    name: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Support PhysiLearn</h1>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Make a Donation</CardTitle>
          <CardDescription>Your support helps us create more educational content</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="amount">Donation Amount</Label>
                <Input
                  id="amount"
                  placeholder="Enter amount"
                  type="number"
                  min="1"
                  step="0.01"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Your email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <Button type="submit" className="w-full">Donate Now</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}