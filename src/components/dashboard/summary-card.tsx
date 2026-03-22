import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function SummaryCard({ totalAmount, currency = "USD" }: { totalAmount: number, currency?: string }) {
  return (
    <Card className="border-none shadow-sm bg-primary text-primary-foreground">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Total Monthly Spend</CardTitle>
        <Wallet className="h-4 w-4 opacity-80" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{formatCurrency(totalAmount, currency)}</div>
        <p className="text-xs opacity-80 mt-1">Across all active subscriptions</p>
      </CardContent>
    </Card>
  );
}
