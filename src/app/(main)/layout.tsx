import { Header } from "@/components/layout/header";
import { BottomNav } from "@/components/layout/bottom-nav";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background pb-16 md:pb-0">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-8 py-6">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
