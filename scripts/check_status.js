const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const env = fs.readFileSync('.env.local', 'utf8');
const envVars = {};
env.split('\n').forEach(l => {
  const parts = l.trim().split('=');
  if (parts.length >= 2) {
    const k = parts[0].trim();
    const v = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
    envVars[k] = v;
  }
});

const supabase = createClient(
  envVars.NEXT_PUBLIC_SUPABASE_URL,
  envVars.SUPABASE_SERVICE_ROLE_KEY
);

async function check() {
  console.log('--- CHAPITRES ---');
  const { data: chapters, error: chErr } = await supabase.from('chapters').select('id, title, status, sort_order');
  console.log('Chapters count:', chapters ? chapters.length : 0, chErr ? chErr.message : '');
  if (chapters && chapters.length > 0) {
    console.log(chapters.map(c => `${c.sort_order}. ${c.title} (${c.status})`));
  }

  console.log('\n--- LEÇONS ---');
  const { data: lessons, error: lErr } = await supabase.from('lessons').select('id, title, is_free, status, chapter_id');
  console.log('Lessons count:', lessons ? lessons.length : 0, lErr ? lErr.message : '');
  if (lessons && lessons.length > 0) {
    lessons.forEach(l => console.log(`  - ${l.title} (free: ${l.is_free}, status: ${l.status})`));
  }

  console.log('\n--- PROFILS ---');
  const { data: profiles, error: pErr } = await supabase.from('profiles').select('id, first_name, last_name, phone, role');
  console.log('Profiles:', profiles, pErr ? pErr.message : '');

  console.log('\n--- ABONNEMENTS ---');
  const { data: subs, error: subErr } = await supabase.from('subscriptions').select('id, user_id, status, start_date, end_date');
  console.log('Subscriptions:', subs, subErr ? subErr.message : '');

  console.log('\n--- PAIEMENTS ---');
  const { data: payments, error: payErr } = await supabase.from('payments').select('id, student_id, amount, status, transaction_code');
  console.log('Payments:', payments, payErr ? payErr.message : '');
}

check();
