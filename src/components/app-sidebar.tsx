"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Workflow, CalendarClock, BookOpen, Database, Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import DashboardIcon from "@/assets/icons/DashboardIcon";

// Menu items with your original icons
const sidebarItems = [
  {
    label: "Insights",
    href: "/admin/insights",
    icon: DashboardIcon,
  },
  {
    label: "Admission Flow",
    href: "/admin/admission-flow",
    icon: Workflow,
  },
  {
    label: "Interview Schedule",
    href: "/admin/interview-schedule",
    icon: CalendarClock,
  },
  {
    label: "Academic Year Roster",
    href: "/admin/academic-year-roster",
    icon: BookOpen,
  },
  {
    label: "WISE Database",
    href: "/admin/wise-database",
    icon: Database,
  },
  {
    label: "WISE Families",
    href: "/admin/wise-families",
    icon: Users,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        {/* Logo Section */}
        <div className="py-6 px-4 flex justify-center border-b">
          <div className="text-xl font-bold">🎓 Admin Panel</div>
        </div>

        {/* Sidebar Menu Group */}
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Map over the sidebarItems to create each menu item */}
              {sidebarItems.map(({ label, href, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
