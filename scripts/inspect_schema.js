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

const admin = createClient(
  envVars.NEXT_PUBLIC_SUPABASE_URL,
  envVars.SUPABASE_SERVICE_ROLE_KEY
);

async function inspect() {
  console.log('--- TEST CHAPTERS ---');
  const chRes1 = await admin.from('chapters').select('*').limit(2);
  console.log('Chapters rows:', chRes1.data ? Object.keys(chRes1.data[0] || {}) : 'error:', chRes1.error);

  console.log('--- TEST LESSONS ---');
  const lRes = await admin.from('lessons').select('*').limit(2);
  console.log('Lessons rows:', lRes.data ? Object.keys(lRes.data[0] || {}) : 'error:', lRes.error);

  console.log('--- TEST SUBJECTS ---');
  const sRes = await admin.from('subjects').select('*');
  console.log('Subjects:', sRes.data);
}

inspect();
