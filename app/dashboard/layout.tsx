import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import ActiveUser from "./active-user";
import { Card } from "@/components/ui/card";
import { getUserData } from "@/lib/auth-session";

export default async function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserData();

  if (!user) {
    throw new Error("User not found");
  }

  const role = user.role ?? "user";
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col w-full">
        <div className="flex flex-1">
          <Sidebar>
            <SidebarHeader className="flex h-14 items-center border-b px-4">
              <span className="font-semibold">Fake Hair Don&apos;t Care</span>
            </SidebarHeader>
            <SidebarContent>
              <DashboardNav role={role} />
            </SidebarContent>
          </Sidebar>
          <main className="flex-1 w-full max-w-full p-2 sm:p-4 lg:p-6 xl:p-8 overflow-hidden bg-gradient-to-tr from-pink-500 via-pink-500/60 to-purple-500/50" >
            <Card className="flex flex-row items-center justify-between w-full p-6 bg-white/10 backdrop-blur-sm border border-white/60">
              <SidebarTrigger className="text-white" />
              <ActiveUser />
            </Card>
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
