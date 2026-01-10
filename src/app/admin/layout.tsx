import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Check if user is authenticated
  if (!session) {
    redirect("/auth/login?callbackUrl=/admin");
  }

  // Check if user has admin role
  if (session.user.role !== "admin") {
    redirect("/");
  }

  return <>{children}</>;
}
