"use client";

import { BellIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Subscription } from "@/app/actions/subscriptions";
import { formatCurrency, cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function NotificationsDropdown({ subscriptions = [], currency = "USD" }: { subscriptions: Subscription[], currency?: string }) {
  const router = useRouter();
  const upcoming = [...subscriptions]
    .filter(s => s.status === 'Active')
    .sort((a, b) => new Date(a.renewal_date).getTime() - new Date(b.renewal_date).getTime())
    .slice(0, 5);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger 
        className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "relative border")}
      >
        <BellIcon className="h-4 w-4" />
        {upcoming.length > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
          </span>
        )}
        <span className="sr-only">Notifications</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Upcoming Renewals</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {upcoming.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            No active subscriptions.
          </div>
        ) : (
          upcoming.map(sub => (
            <DropdownMenuItem key={sub.id} onClick={() => router.push(`/add?edit=${sub.id}`)} className="cursor-pointer flex flex-col items-start gap-1 p-3">
              <div className="flex justify-between w-full items-center">
                <span className="font-medium text-sm">{sub.name}</span>
                <span className="font-semibold text-sm">{formatCurrency(sub.amount, currency)}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Renews on {format(parseISO(sub.renewal_date), 'MMM dd, yyyy')}
              </div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
