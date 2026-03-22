"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { MOCK_CATEGORIES } from "@/lib/mock-data";

export function CategoryChart() {
  const chartConfig = {
    amount: {
      label: "Amount",
    },
    ...MOCK_CATEGORIES.reduce((acc, cat, idx) => {
      acc[cat.name] = { 
        label: cat.name,
        color: `var(--chart-${(idx % 5) + 1})`
      };
      return acc;
    }, {} as Record<string, { label: string; color: string }>)
  };

  return (
    <Card className="border-border/50 shadow-sm flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-base font-semibold">Category Breakdown</CardTitle>
        <CardDescription className="text-xs">Based on monthly spend</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-4 flex items-center justify-center">
        <div className="h-[200px] w-full max-w-[250px] mx-auto">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={MOCK_CATEGORIES}
                  dataKey="amount"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  strokeWidth={2}
                  paddingAngle={2}
                >
                  {MOCK_CATEGORIES.map((cat, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={`var(--chart-${(index % 5) + 1})`} 
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
