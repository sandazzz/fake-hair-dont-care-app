import { getSession } from "@/lib/auth-session";
import { SignOutButton } from "./signout-button";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getSession();
  if (!session) {
    redirect("/sign-in"); // ici, on fait une redirection SERVER-SIDE
  }

  return (
    <main>
      Welcome to dashboard
      <SignOutButton />
    </main>
  );
}
