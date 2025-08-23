import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { auth } from "@/lib/auth";
import { getSession } from "@/lib/auth-session";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default async function page() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/dashboard");
  }

  const users = await auth.api.listUsers({
    query: {
      limit: 10,
      offset: 0,
      sortBy: "createdAt",
      sortDirection: "desc",
    },
    headers: await headers(),
  });

  return (
    <div className="container mx-auto py-6 space-y-4">
      <h1 className="text-3xl font-bold mb-6 text-background">Liste des utilisateurs</h1>
      <Button asChild variant="outline" className="w-fit bg-white/10 backdrop-blur-sm border border-white/60 text-background">
        <Link href="/dashboard/users/create">Créer un utilisateur</Link>
      </Button>
      <Table className="bg-white/10 backdrop-blur-sm border border-white/60 rounded-md overflow-hidden">
        <TableHeader>
          <TableRow>
            <TableHead className="text-background">Nom</TableHead>
            <TableHead className="text-background">Email</TableHead>
            <TableHead className="text-background">Rôle</TableHead>
            <TableHead className="text-right text-background">Créé le</TableHead>
            <TableHead className="text-right text-background"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white/10 backdrop-blur-sm border border-white/60">
          {users.users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                Aucun utilisateur trouvé.
              </TableCell>
            </TableRow>
          ) : (
            users.users.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium text-background">{u.name || "—"}</TableCell>
                <TableCell className="text-background">{u.email || "—"}</TableCell>
                <TableCell className="text-background">{u.role || "—"}</TableCell>

                <TableCell className="text-right text-background">
                  {u.createdAt.toLocaleDateString("fr-FR")}
                </TableCell>
                <TableCell className="text-right text-background">
                  <DeleteUserButton userId={u.id} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

const DeleteUserButton = ({ userId }: { userId: string }) => {
  return (
    <form
      action={async () => {
        "use server";
        await auth.api.removeUser({
          body: {
            userId: userId, // required
          },
          headers: await headers(),
        });
        revalidatePath("/dashboard/users");
      }}
    >
      <Button type="submit" variant="destructive" className="w-fit">
        <Trash2 className="w-4 h-4" />
        Supprimer
      </Button>
    </form>
  );
};
