import { authClient } from "@/lib/auth-client";
import { getSession } from "@/lib/auth-session";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getSession();
  console.log(session);

  if (!session) {
    redirect("/login");
  }
  const users = await authClient.admin.listUsers({
    query: {
      limit: 10,
    },
  });

  return (
    <div>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}
