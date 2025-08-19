import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import ActiveUser from "./active-user";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1">
          <Sidebar>
            <SidebarHeader className="flex h-14 items-center border-b px-4">
              <span className="font-semibold">Fake Hair Don&apos;t Care</span>
            </SidebarHeader>
            <SidebarContent>
              <DashboardNav />
            </SidebarContent>
          </Sidebar>
          <main className="flex-1 w-full max-w-full p-2 sm:p-4 lg:p-6 xl:p-8 overflow-hidden">
            <div className="flex items-center justify-between">
              <SidebarTrigger />
              <ActiveUser />
            </div>
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
