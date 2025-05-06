"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, LogOut } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function DashboardNav() {
  const pathname = usePathname();
  const router = useRouter();
  const routes = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: BarChart3,
    },
  ];

  const handleLogout = async () => {
    // In a real app, this would call your logout API
    console.log("Logging out...");
    // Then redirect to login page
    await authClient.signOut();
    router.push("/sign-in");
  };

  return (
    <>
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

      <SidebarFooter>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </SidebarFooter>
    </>
  );
}
