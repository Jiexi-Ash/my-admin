import supabaseServerComponentClient from "@/lib/supabaseServer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sign In",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await supabaseServerComponentClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  return <>{children}</>;
}
