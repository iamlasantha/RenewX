export type Subscription = {
  id: string;
  name: string;
  category: string;
  amount: number;
  billingCycle: "Monthly" | "Yearly";
  renewalDate: string;
  status: "Active" | "Cancelled";
  iconUrl?: string;
};

export const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: "1",
    name: "Netflix",
    category: "Entertainment",
    amount: 15.49,
    billingCycle: "Monthly",
    renewalDate: "2026-04-12",
    status: "Active",
  },
  {
    id: "2",
    name: "Spotify",
    category: "Entertainment",
    amount: 10.99,
    billingCycle: "Monthly",
    renewalDate: "2026-04-15",
    status: "Active",
  },
  {
    id: "3",
    name: "AWS",
    category: "SaaS",
    amount: 45.00,
    billingCycle: "Monthly",
    renewalDate: "2026-04-01",
    status: "Active",
  },
  {
    id: "4",
    name: "Adobe Creative Cloud",
    category: "Design",
    amount: 54.99,
    billingCycle: "Monthly",
    renewalDate: "2026-04-22",
    status: "Active",
  },
  {
    id: "5",
    name: "Notion",
    category: "Productivity",
    amount: 8.00,
    billingCycle: "Monthly",
    renewalDate: "2026-04-05",
    status: "Active",
  },
];

export const MOCK_CATEGORIES = [
  { name: "Entertainment", amount: 26.48, fill: "var(--color-entertainment)" },
  { name: "SaaS", amount: 45.00, fill: "var(--color-saas)" },
  { name: "Design", amount: 54.99, fill: "var(--color-design)" },
  { name: "Productivity", amount: 8.00, fill: "var(--color-productivity)" },
];

export const TOTAL_MONTHLY_SPEND = MOCK_SUBSCRIPTIONS.reduce(
  (acc, sub) => acc + (sub.billingCycle === "Monthly" ? sub.amount : sub.amount / 12),
  0
);
