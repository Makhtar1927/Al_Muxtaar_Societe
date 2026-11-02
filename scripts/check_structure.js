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

const supabase = createClient(url, key);

async function check() {
  const { data: chapters, error } = await supabase
    .from('chapters')
    .select('id, title, order_index')
    .order('order_index');

  console.log('Chapters:', chapters);

  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, title, chapter_id, order_index, status, is_free')
    .order('order_index');

  console.log('Lessons:', lessons);
}

check();
