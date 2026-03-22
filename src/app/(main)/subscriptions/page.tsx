import { SubscriptionList } from "@/components/dashboard/subscription-list";
import { getSubscriptions } from "@/app/actions/subscriptions";
import { Input } from "@/components/ui/input";
import { SearchIcon, PlusIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function SubscriptionsPage() {
  const subscriptions = await getSubscriptions() as any[];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">Subscriptions</h1>
          <p className="text-muted-foreground text-sm">
            Manage your active subscriptions
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search subscriptions..."
              className="w-full pl-8 bg-background"
            />
          </div>
          <Link href="/add" className={buttonVariants()}>
            <PlusIcon className="h-4 w-4 sm:mr-2" /> 
            <span className="hidden sm:inline">Add</span>
          </Link>
        </div>
      </div>

      <div className="pt-2">
        <SubscriptionList subscriptions={subscriptions} />
      </div>
    </div>
  );
}
