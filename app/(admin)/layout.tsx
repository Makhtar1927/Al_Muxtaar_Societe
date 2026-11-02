import * as React from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { Footer } from "@/components/layout/footer";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = createAdminClient();
  const { count: pendingCount } = await admin
    .from("subscriptions")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");

  return (
    <div className="flex min-h-screen flex-col bg-surface text-navy">
      <AdminHeader pendingCount={pendingCount ?? 0} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
