"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Users, Settings, HelpCircle, Scissors } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

export function DashboardNav() {
  const pathname = usePathname();

  const routes = [
    {
      title: "Overview",
      href: "/dashboard",
      icon: BarChart3,
    },
    {
      title: "Donations",
      href: "/dashboard/donations",
      icon: Scissors,
    },
    {
      title: "Donors",
      href: "/dashboard/donors",
      icon: Users,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
    {
      title: "Help",
      href: "/dashboard/help",
      icon: HelpCircle,
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {routes.map((route) => (
            <SidebarMenuItem key={route.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === route.href}
                tooltip={route.title}
              >
                <Link href={route.href}>
                  <route.icon />
                  <span>{route.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
