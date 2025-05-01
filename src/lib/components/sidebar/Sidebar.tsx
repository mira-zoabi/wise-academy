"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { label: "Insights", href: "/admin/insights" },
  { label: "Admission Flow", href: "/admin/admission-flow" },
  { label: "Interview Schedule", href: "/admin/interview-schedule" },
  { label: "Academic Year Roster", href: "/admin/academic-year-roster" },
  { label: "WISE Database", href: "/admin/wise-database" },
  { label: "WISE Families", href: "/admin/wise-families" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 w-64 min-h-screen bg-muted p-6">
      <div className="mb-10 text-center font-bold text-xl">🎓 Admin Panel</div>
      <nav className="flex flex-col gap-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <LayoutDashboard className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
