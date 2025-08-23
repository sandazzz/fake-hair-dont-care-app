import { getUserData } from "@/lib/auth-session";
import { error } from "console";

export default async function ActiveUser() {
  const user = await getUserData();

  if (!user) {
    throw error("User not found");
  }

  return <div className="text-background">{user.name}</div>;
}
