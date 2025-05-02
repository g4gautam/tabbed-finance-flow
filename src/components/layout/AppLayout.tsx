
import React from "react";
import { Sidebar } from "./Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultCollapsed={isMobile}>
      <div className="flex min-h-screen w-full">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden p-4 md:p-6">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};
