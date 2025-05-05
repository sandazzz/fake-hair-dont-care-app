"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors, Users, Percent, ThumbsUp } from "lucide-react";

export function DonationStats() {
  // In a real app, these would be fetched from your API
  const stats = [
    {
      title: "Total Donations",
      value: "1,234",
      icon: Scissors,
      description: "Total hair donations received",
    },
    {
      title: "Unique Donors",
      value: "892",
      icon: Users,
      description: "Individual donors",
    },
    {
      title: "Resale Approval",
      value: "76%",
      icon: Percent,
      description: "Donors allowing resale",
    },
    {
      title: "Wig Use Approval",
      value: "94%",
      icon: ThumbsUp,
      description: "Donors allowing wig use",
    },
  ];

  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
