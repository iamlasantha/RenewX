import { SummaryCard } from "@/components/dashboard/summary-card";
import { UpcomingRenewals } from "@/components/dashboard/upcoming-renewals";
import { CategoryChart, CategoryData } from "@/components/dashboard/category-chart";
import { SubscriptionList } from "@/components/dashboard/subscription-list";
import { getSubscriptions, Subscription } from "@/app/actions/subscriptions";
import { AddSubscriptionButton } from "@/components/dashboard/add-subscription-button";

export default async function DashboardPage() {
  const subscriptions = await getSubscriptions() as unknown as Subscription[];

  const activeSubscriptions = subscriptions.filter(s => s.status === 'Active');

  const totalMonthlySpend = activeSubscriptions.reduce(
    (acc, sub) => acc + (sub.billing_cycle === "Monthly" ? sub.amount : sub.amount / 12),
    0
  );

  const categoriesMap = new Map<string, number>();
  activeSubscriptions.forEach(sub => {
    const cost = sub.billing_cycle === "Monthly" ? sub.amount : sub.amount / 12;
    categoriesMap.set(sub.category, (categoriesMap.get(sub.category) || 0) + cost);
  });

  const categoryData: CategoryData[] = Array.from(categoriesMap.entries()).map(([name, amount], index) => ({
    name,
    amount,
    fill: `var(--chart-${(index % 5) + 1})`
  }));

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground text-sm">
          A summary of your active subscriptions and expenses.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Summary Card - takes 1 col on all sizes above mobile */}
        <div className="md:col-span-2 lg:col-span-1 flex flex-col gap-6">
          <SummaryCard totalAmount={totalMonthlySpend} />
          <UpcomingRenewals subscriptions={activeSubscriptions as any} />
        </div>
        
        {/* Category Chart */}
        <div className="md:col-span-1 lg:col-span-2">
          <CategoryChart data={categoryData} />
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Your Subscriptions</h2>
          <AddSubscriptionButton text="Add Subscription" />
        </div>
        <SubscriptionList subscriptions={subscriptions as any} />
      </div>
    </div>
  );
}
