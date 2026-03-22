"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PlusCircle, List, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "List", href: "/subscriptions", icon: List },
    { name: "Add", href: "/add", icon: PlusCircle },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 z-50 flex h-16 w-full items-center justify-around border-t bg-background px-4 pb-safe md:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center space-y-1 px-3 py-1 text-xs transition-colors",
              isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground/80"
            )}
          >
            <Icon className={cn("h-5 w-5", isActive && "fill-primary/10 stroke-primary stroke-[2.5px]")} />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
