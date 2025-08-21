import { getSession } from "@/lib/auth-session";
import LoginForm from "./login-form";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen flex justify-center items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-blue-600">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-pink-400/30 to-purple-500/40"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-pink-400/40 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-radial from-blue-500/30 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-radial from-purple-400/50 to-transparent rounded-full blur-2xl"></div>
      </div>
      <div className="max-w-md w-full">
        <LoginForm />
      </div>
    </main>
  );
}
