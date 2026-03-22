import Link from "next/link";
import { CopyIcon } from "lucide-react";
import { NotificationsDropdown } from "@/components/layout/notifications-dropdown";
import { getSubscriptions, Subscription } from "@/app/actions/subscriptions";
import { createClient } from "@/utils/supabase/server";

export async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const currency = user?.user_metadata?.currency || "USD";
  
  let subscriptions: Subscription[] = [];
  if (user) {
    subscriptions = await getSubscriptions() as unknown as Subscription[];
  }
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4 md:px-8">
        <div className="flex items-center gap-2 mr-4 md:mr-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <CopyIcon className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="hidden font-semibold sm:inline-block">
              RenewX
            </span>
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center gap-6 text-sm font-medium mr-6 hidden md:flex">
            <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground">
              Dashboard
            </Link>
            <Link href="/subscriptions" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Subscriptions
            </Link>
            <Link href="/settings" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Settings
            </Link>
          </nav>
          
          <div className="flex items-center gap-2 ml-auto md:ml-0">
            <NotificationsDropdown subscriptions={subscriptions} currency={currency} />
          </div>
        </div>
      </div>
    </header>
  );
}
