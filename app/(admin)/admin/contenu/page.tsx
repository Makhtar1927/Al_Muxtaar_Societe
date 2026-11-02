import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { redirect } from 'next/navigation';
import ContentManagerClient from '@/components/admin/content-manager-client';

export const metadata = {
  title: 'Gestion du contenu — Admin Al Muxtaar',
};

export const dynamic = 'force-dynamic';

export default async function AdminContenuPage() {
  const supabase = createClient();
  const admin = createAdminClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/connexion');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  if (!profile || !['admin', 'editor'].includes(profile.role)) redirect('/dashboard');

  // Fetch full content tree with column aliases for database compatibility
  const { data: subjects } = await admin
    .from('subjects')
    .select('id, name, level_id, track_id')
    .order('name');

  const { data: rawChapters } = await admin
    .from('chapters')
    .select('id, title, subject_id, status, order_index')
    .order('order_index');

  const { data: rawLessons } = await admin
    .from('lessons')
    .select('id, title, chapter_id, status, order_index, is_free, content_markdown')
    .order('order_index');

  const { data: exercises } = await admin
    .from('exercises')
    .select('id, lesson_id, statement_md, solution_md, difficulty, sort_order')
    .order('sort_order');

  const chapters = (rawChapters ?? []).map((c: any) => ({
    id: c.id,
    title: c.title,
    subject_id: c.subject_id,
    status: c.status,
    sort_order: c.order_index ?? 0,
  }));

  const lessons = (rawLessons ?? []).map((l: any) => ({
    id: l.id,
    title: l.title,
    chapter_id: l.chapter_id,
    status: l.status,
    sort_order: l.order_index ?? 0,
    is_free_preview: Boolean(l.is_free),
    content_md: l.content_markdown ?? '',
  }));

  return (
    <main className="min-h-screen bg-surface py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <span className="text-xs font-bold text-turquoise uppercase tracking-wider">
            Édition Pédagogique
          </span>
          <h1 className="text-2xl font-bold text-navy mt-0.5">Gestion du contenu &amp; Programmes</h1>
          <p className="text-text/70 text-sm mt-0.5">
            Créez et organisez les chapitres, leçons, fiches réflexes et exercices d&apos;application.
          </p>
        </div>
        <ContentManagerClient
          subjects={(subjects ?? []) as unknown as Parameters<typeof ContentManagerClient>[0]['subjects']}
          chapters={(chapters ?? []) as unknown as Parameters<typeof ContentManagerClient>[0]['chapters']}
          lessons={(lessons ?? []) as unknown as Parameters<typeof ContentManagerClient>[0]['lessons']}
          exercises={(exercises ?? []) as unknown as Parameters<typeof ContentManagerClient>[0]['exercises']}
          userRole={profile.role}
        />
      </div>
    </main>
  );
}

