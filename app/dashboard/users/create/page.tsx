import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth-session";
import CreateUserForm from "./create-user-form";
import { Button } from "@/components/ui/button";

export default async function page() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col justify-between">
        <h1 className="text-3xl font-bold mb-6 text-background">Créer un utilisateur</h1>
        <Button asChild variant="outline" className="w-fit bg-white/10 backdrop-blur-sm border border-white/60 text-background hover:bg-white/20 hover:text-background">
          <Link href="/dashboard/users">Retour à la liste des utilisateurs</Link>
        </Button>
      </div>
      <CreateUserForm />
    </div>
  );
}
