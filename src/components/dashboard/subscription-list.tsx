"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Subscription, deleteSubscription } from "@/app/actions/subscriptions";
import { MoreVertical, Edit2, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function SubscriptionList({ subscriptions }: { subscriptions: Subscription[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    // Basic confirm dialog could go here. Let's keep it simple for now.
    if (confirm("Are you sure you want to delete this subscription?")) {
      startTransition(async () => {
        await deleteSubscription(id);
      });
    }
  };

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
              <div className="flex items-center gap-1">
                <div className="font-bold text-lg mr-1">
                  ${sub.amount.toFixed(2)}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger 
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0" 
                    disabled={isPending}
                  >
                    <span className="sr-only">Open menu</span>
                    <MoreVertical className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => router.push(`/add?edit=${sub.id}`)}>
                      <Edit2 className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(sub.id)} className="text-destructive focus:text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <div className="flex justify-between items-end mt-auto pt-3 border-t">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Renews on</span>
                <span className="text-sm font-medium">{new Date(sub.renewal_date).toLocaleDateString()}</span>
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded bg-primary/10 text-primary">
                {sub.billing_cycle}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
