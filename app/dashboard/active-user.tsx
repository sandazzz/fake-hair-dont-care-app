import { getUserData } from "@/lib/auth-session";
import { error } from "console";

export default async function ActiveUser() {
  const user = await getUserData();

  if (!user) {
    throw error("User not found");
  }

  return <div className="text-background">Bienvenue {user.name}, sur la plateforme de gestion de Fake Hair Don&apos;t Care !</div>;
}
