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
  const { data, error } = await supabase
    .from('lessons')
    .update({ status: 'published', is_free: true })
    .eq('id', '60000000-0000-0000-0000-000000000002')
    .select();

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Lesson 2 published successfully in Supabase:', data);
  }
}

run();

