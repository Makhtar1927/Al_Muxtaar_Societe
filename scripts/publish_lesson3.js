const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

let envContent = '';
if (fs.existsSync('.env.local')) envContent += fs.readFileSync('.env.local', 'utf8') + '\n';
if (fs.existsSync('.env')) envContent += fs.readFileSync('.env', 'utf8');

const env = {};
envContent.split('\n').forEach((line) => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) env[match[1].trim()] = match[2].trim().replace(/^['"]|['"]$/g, '');
});

const url = env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.log('Credentials missing. URL:', !!url, 'KEY:', !!key);
  process.exit(1);
}

const supabase = createClient(url, key);

async function run() {
  const lessonId = '60000000-0000-0000-0000-000000000003';
  const chapterId = '50000000-0000-0000-0000-000000000002'; // Dérivation et étude de fonctions

  const lessonData = {
    id: lessonId,
    chapter_id: chapterId,
    title: 'Dérivation, tangentes et variations de fonctions',
    order_index: 1,
    content_markdown: '# Chapitre 2 : Dérivation et Étude de Fonctions',
    is_free: true,
    status: 'published',
  };

  const { data, error } = await supabase
    .from('lessons')
    .upsert(lessonData, { onConflict: 'id' })
    .select();

  if (error) {
    console.error('Error inserting lesson 3:', error);
  } else {
    console.log('Lesson 3 successfully upserted and published:', data);
  }
}

run();
