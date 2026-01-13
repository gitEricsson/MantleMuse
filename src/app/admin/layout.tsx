import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Auth checks removed for hackathon demo
  // const session = await auth();
  // if (!session) redirect("/auth/login?callbackUrl=/admin");

  return <>{children}</>;
}
