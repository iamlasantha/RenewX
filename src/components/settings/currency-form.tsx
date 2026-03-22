"use client";

import { useTransition } from "react";
import { updateCurrency } from "@/app/actions/auth";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function CurrencyForm({ initialCurrency = "USD" }: { initialCurrency?: string }) {
  const [isPending, startTransition] = useTransition();

  const handleCurrencyChange = (val: string | null) => {
    if (!val) return;
    startTransition(async () => {
      await updateCurrency(val);
    });
  };

  return (
    <div className="grid gap-2 pt-2 border-t mt-2">
      <Label htmlFor="currency">Preferred Currency</Label>
      <Select defaultValue={initialCurrency} onValueChange={handleCurrencyChange} disabled={isPending}>
        <SelectTrigger id="currency">
          <SelectValue placeholder="Select a currency" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="USD">USD ($)</SelectItem>
          <SelectItem value="EUR">EUR (€)</SelectItem>
          <SelectItem value="GBP">GBP (£)</SelectItem>
          <SelectItem value="LKR">LKR (Rs)</SelectItem>
          <SelectItem value="INR">INR (₹)</SelectItem>
          <SelectItem value="AUD">AUD ($)</SelectItem>
          <SelectItem value="CAD">CAD ($)</SelectItem>
          <SelectItem value="JPY">JPY (¥)</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-xs text-muted-foreground">
        This currency will be used to display all subscriptions across the app.
      </p>
    </div>
  );
}
