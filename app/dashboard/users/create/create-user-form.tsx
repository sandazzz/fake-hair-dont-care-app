"use client";

import { Input } from "@/components/ui/input";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAction } from "next-safe-action/hooks";
import { createUser } from "./create-user.action";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
  role: z.enum(["admin", "user"]),
});

type FormData = z.infer<typeof schema>;

export default function CreateUserForm() {
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      role: "user",
    },
  });

  const { execute, isPending } = useAction(createUser, {
    onSuccess: () => {
      router.push("/dashboard/users");
    },
    onError: (error) => {
      toast.error(error.error?.serverError || "Une erreur est survenue");
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log("submit:", data);
    await execute(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-6 bg-white/10 backdrop-blur-sm border border-white/60 rounded-md p-6 w-full md:w-1/2"
        noValidate
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-background">Email</FormLabel>
              <FormControl>
                <Input className="bg-white/10 backdrop-blur-sm border border-white/60 text-background" type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-background">Password</FormLabel>
              <FormControl>
                <Input className="bg-white/10 backdrop-blur-sm border border-white/60 text-background" type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-background">Name</FormLabel>
              <FormControl>
                <Input className="bg-white/10 backdrop-blur-sm border border-white/60 text-background" type="text" placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-background">Role</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="bg-white/10 backdrop-blur-sm border border-white/60 text-background">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="cursor-pointer bg-white/10 backdrop-blur-sm border border-white/60 text-background hover:bg-white/20 hover:text-background  ">
          {isPending ? "Création en cours..." : "Créer l'utilisateur"}
        </Button>
      </form>
    </Form>
  );
}
