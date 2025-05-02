
import { LayoutDashboard, BookOpen, CreditCard, FileText } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

// Menu items for our finance application
const menuItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Ledger",
    path: "/ledger",
    icon: BookOpen,
  },
  {
    title: "Payments",
    path: "/payments",
    icon: CreditCard,
  },
  {
    title: "Bills & Invoices",
    path: "/bills-invoices",
    icon: FileText,
  },
];

export const Sidebar = () => {
  return (
    <SidebarRoot>
      <SidebarHeader className="px-4 py-2">
        <div className="flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-finance-700" />
          <span className="font-semibold text-xl">FinanceFlow</span>
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.path}
                      className={({ isActive }) => cn(
                        "flex items-center gap-3 w-full", 
                        isActive && "text-finance-700 font-medium"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarRoot>
  );
};
