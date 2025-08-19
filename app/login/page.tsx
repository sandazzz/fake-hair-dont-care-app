import { getSession } from "@/lib/auth-session";
import LoginForm from "./login-form";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-600 via-pink-500 to-blue-600">
      <div className="max-w-md w-full">
        <LoginForm />
      </div>
    </main>
  );
}
