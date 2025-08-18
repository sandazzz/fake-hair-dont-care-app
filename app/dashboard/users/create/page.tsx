import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function page() {
  return (
    <div>
      <h1>Créer un utilisateur</h1>
      <Link href="/dashboard/users">Retour à la liste des utilisateurs</Link>
      <form action={async (formData) => {
        "use server";
        await auth.api.createUser({
          body: {
            email: formData.get("email") as string, // required
            password: formData.get("password") as string, // required
            name: formData.get("name") as string, // required
            role: formData.get("role") as "admin" | "user",
          },
          headers: await headers(),
        });
        revalidatePath("/dashboard/users");
        redirect("/dashboard/users");
      }}>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <input type="text" name="name" placeholder="Name" />
        <input type="text" name="role" placeholder="Role" />
        <button type="submit">Create User</button>
      </form>
    </div>
  )
}
