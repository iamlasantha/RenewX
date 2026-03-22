"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AddSubscriptionPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Add Subscription</h1>
        <p className="text-muted-foreground text-sm">
          Track a new recurring expense
        </p>
      </div>

      <Card className="border-border/50 shadow-sm">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Subscription Details</CardTitle>
            <CardDescription>Enter the provider and payment information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="e.g. Netflix, Spotify" required />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <Input id="amount" type="number" step="0.01" placeholder="15.00" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cycle">Billing Cycle</Label>
                <Select defaultValue="monthly">
                  <SelectTrigger id="cycle">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select defaultValue="entertainment">
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="saas">SaaS</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="productivity">Productivity</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Next Renewal Date</Label>
              <Input id="date" type="date" required />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit">Save Subscription</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
