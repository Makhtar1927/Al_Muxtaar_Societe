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

  // Fetch full content tree
  const { data: subjects } = await admin
    .from('subjects')
    .select('id, name, level_id, track_id')
    .order('name');

  const { data: chapters } = await admin
    .from('chapters')
    .select('id, title, subject_id, status, sort_order')
    .order('sort_order');

  const { data: lessons } = await admin
    .from('lessons')
    .select('id, title, chapter_id, status, sort_order, is_free_preview, content_md')
    .order('sort_order');

  const { data: exercises } = await admin
    .from('exercises')
    .select('id, lesson_id, statement_md, solution_md, difficulty, sort_order')
    .order('sort_order');

  return (
    <main className="min-h-screen bg-surface py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-navy mb-2">Gestion du contenu</h1>
        <p className="text-text/70 mb-8">
          Créez et organisez chapitres, leçons, exercices et quiz.
        </p>
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

