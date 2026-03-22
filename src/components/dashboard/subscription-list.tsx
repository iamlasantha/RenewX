import { Card, CardContent } from "@/components/ui/card";
import { Subscription } from "@/lib/mock-data";

export function SubscriptionList({ subscriptions }: { subscriptions: Subscription[] }) {
  if (subscriptions.length === 0) {
    return (
      <Card className="border-dashed border-2 shadow-none py-12 flex flex-col items-center justify-center text-muted-foreground w-full">
        <p className="text-sm font-medium">No active subscriptions</p>
        <p className="text-xs">Click + to add your first subscription</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {subscriptions.map((sub) => (
        <Card key={sub.id} className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex flex-col h-full gap-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{sub.name}</h3>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full inline-block mt-1">
                  {sub.category}
                </span>
              </div>
              <div className="font-bold text-lg">
                ${sub.amount.toFixed(2)}
              </div>
            </div>
            
            <div className="flex justify-between items-end mt-2 pt-3 border-t">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Renews on</span>
                <span className="text-sm font-medium">{new Date(sub.renewalDate).toLocaleDateString()}</span>
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded bg-primary/10 text-primary">
                {sub.billingCycle}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
