import { SummaryCard } from "@/components/dashboard/summary-card";
import { UpcomingRenewals } from "@/components/dashboard/upcoming-renewals";
import { CategoryChart } from "@/components/dashboard/category-chart";
import { SubscriptionList } from "@/components/dashboard/subscription-list";
import { MOCK_SUBSCRIPTIONS, TOTAL_MONTHLY_SPEND } from "@/lib/mock-data";

export default function DashboardPage() {
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
          <SummaryCard totalAmount={TOTAL_MONTHLY_SPEND} />
          <UpcomingRenewals subscriptions={MOCK_SUBSCRIPTIONS} />
        </div>
        
        {/* Category Chart */}
        <div className="md:col-span-1 lg:col-span-2">
          <CategoryChart />
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <h2 className="text-xl font-semibold tracking-tight">Your Subscriptions</h2>
        <SubscriptionList subscriptions={MOCK_SUBSCRIPTIONS} />
      </div>
    </div>
  );
}
