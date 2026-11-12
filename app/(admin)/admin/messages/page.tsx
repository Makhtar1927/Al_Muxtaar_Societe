import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getAllContactMessages } from '@/lib/contact/service';
import ContactMessagesManager from '@/components/admin/contact-messages-manager';
import { AdminHeader } from '@/components/admin/admin-header';

export const metadata: Metadata = {
  title: 'Boîte de réception & Messages de Contact | Administration',
  description: 'Consultez et répondez aux messages envoyés par les élèves et visiteurs.',
};

export const dynamic = 'force-dynamic';

export default async function AdminMessagesPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/connexion?redirect=/admin/messages');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    redirect('/dashboard');
  }

  const messages = getAllContactMessages();

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-turquoise bg-turquoise-light px-2.5 py-0.5 rounded-full">
            Support & Relations Visiteurs
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-navy tracking-tight">
          Boîte de réception des Messages
        </h1>
        <p className="text-xs sm:text-sm text-navy-light mt-1">
          Tous les messages envoyés depuis le formulaire de contact du site. Vous pouvez y répondre directement par WhatsApp en un clic.
        </p>
      </div>

      <ContactMessagesManager initialMessages={messages} />
    </div>
  );
}

