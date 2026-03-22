import { SubscriptionForm } from "@/components/subscription-form";
import { getSubscriptionById } from "@/app/actions/subscriptions";

export default async function AddSubscriptionPage({ 
  searchParams 
}: { 
  searchParams: { edit?: string } 
}) {
  let initialData = null;
  const editId = await Promise.resolve(searchParams?.edit);
  
  if (editId) {
    initialData = await getSubscriptionById(editId);
  }

  return <SubscriptionForm initialData={initialData} />;
}
