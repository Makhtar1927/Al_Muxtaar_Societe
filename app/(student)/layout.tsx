import * as React from "react";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { ChangePasswordPromptModal } from "@/components/student/change-password-prompt-modal";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const mustChangePassword = !!user?.user_metadata?.must_change_password;

  return (
    <div className="flex min-h-screen flex-col bg-surface text-navy">
      <Header />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <Footer />
      <MobileBottomNav />
      {mustChangePassword && <ChangePasswordPromptModal />}
    </div>
  );
}

