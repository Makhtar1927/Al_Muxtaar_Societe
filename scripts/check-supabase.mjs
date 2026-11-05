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

// Vérifier les colonnes de subscriptions
const { data: subCols, error: subErr } = await supabase.rpc('column_exists', {}).select('*').limit(1);

// Tenter de lire une subscription pour voir les colonnes disponibles
const { data: subSample, error: subSampleErr } = await supabase.from('subscriptions').select('id, promo_code, influencer_id').limit(1);
console.log('\n=== subscriptions promo_code/influencer_id ===');
console.log('Error:', subSampleErr?.message || 'none');
console.log('Sample:', subSample);

const { data: paySample, error: paySampleErr } = await supabase.from('payments').select('id, promo_code, influencer_id, influencer_commission').limit(1);
console.log('\n=== payments promo_code/influencer_commission ===');
console.log('Error:', paySampleErr?.message || 'none');
console.log('Sample:', paySample);
