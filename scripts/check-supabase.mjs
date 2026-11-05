import { readFileSync } from 'fs';
import { createClient } from '@supabase/supabase-js';

const env = readFileSync('.env.local', 'utf8');
const parseVal = (name) => {
  const lines = env.split(/\r?\n/);
  for (const line of lines) {
    if (line.startsWith(name + '=')) return line.slice(name.length + 1).trim();
  }
  return '';
};

let url = parseVal('NEXT_PUBLIC_SUPABASE_URL');
url = url.replace(/^["']|["']$/g, '');
let key = parseVal('SUPABASE_SERVICE_ROLE_KEY');
key = key.replace(/^["']|["']$/g, '');

console.log('Supabase URL:', url);
const supabase = createClient(url, key);

// Test si la table influencers existe
const { data, error } = await supabase.from('influencers').select('*').limit(5);
console.log('\n=== TABLE influencers ===');
console.log('Error:', error?.message || 'none');
console.log('Data:', JSON.stringify(data, null, 2));
console.log('Count:', data?.length ?? 0);

// Test getInfluencerByCode avec Service Key
const cleanCode = 'DIAGNE221';
const { data: inf, error: infErr } = await supabase
  .from('influencers')
  .select('*')
  .ilike('promo_code', cleanCode)
  .eq('is_active', true)
  .maybeSingle();

console.log('\n=== TEST getInfluencerByCode (Service Role) ===');
console.log('Error:', infErr);
console.log('Found:', inf);

// Test avec Anon Key
let anonKey = parseVal('NEXT_PUBLIC_SUPABASE_ANON_KEY').replace(/^["']|["']$/g, '');
const anonSupabase = createClient(url, anonKey);
const { data: anonInf, error: anonErr } = await anonSupabase
  .from('influencers')
  .select('*')
  .ilike('promo_code', cleanCode)
  .eq('is_active', true)
  .maybeSingle();

console.log('\n=== TEST getInfluencerByCode (Anon Key) ===');
console.log('Error:', anonErr);
console.log('Found:', anonInf);
