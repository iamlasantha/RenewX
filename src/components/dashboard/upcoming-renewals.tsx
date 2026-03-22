import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Subscription } from "@/app/actions/subscriptions";
import { format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";

export function UpcomingRenewals({ subscriptions }: { subscriptions: Subscription[] }) {
  // Sort by closest renewal date
  const upcoming = [...subscriptions].sort((a, b) => 
    new Date(a.renewal_date).getTime() - new Date(b.renewal_date).getTime()
  ).slice(0, 3);

  return (
    <Card className="border-border/50 shadow-sm flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 text-primary" />
          Upcoming Renewals
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-4">
          {upcoming.map((sub) => (
            <div key={sub.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
              <div className="flex flex-col">
                <span className="font-medium text-sm">{sub.name}</span>
                <span className="text-xs text-muted-foreground">
                  {format(parseISO(sub.renewal_date), 'MMM dd')}
                </span>
              </div>
              <div className="font-semibold text-sm">
                ${sub.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
