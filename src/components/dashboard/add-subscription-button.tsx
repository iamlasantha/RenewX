"use client";

import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AddSubscriptionButton({ className, size = "sm", text = "Add" }: { className?: string, size?: "default" | "sm" | "lg" | "icon", text?: string }) {
  return (
    <Link href="/add" className={cn(buttonVariants({ size }), className)}>
      <PlusIcon className={cn("h-4 w-4", text ? "sm:mr-2" : "")} /> 
      <span className={text === "Add" ? "hidden sm:inline" : ""}>{text}</span>
    </Link>
  );
}
