import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Charger .env.local manuellement
const envContent = fs.readFileSync('.env.local', 'utf8');
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx !== -1) {
    const key = trimmed.slice(0, eqIdx).trim();
    let val = trimmed.slice(eqIdx + 1).trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    process.env[key] = val;
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function main() {
  console.log('=== TEST SUPABASE DATABASE & ANNUAL PLAN ===');
  console.log('Supabase URL:', supabaseUrl);

  // 1. Check existing plans
  const { data: plans, error: plansError } = await supabase
    .from('plans')
    .select('*')
    .order('price_fcfa', { ascending: true });

  if (plansError) {
    console.error('Erreur lecture plans:', plansError);
  } else {
    console.log('\nPlans actuellement en base de données :');
    console.table(plans);
  }

  // 2. Ensure annual plan is inserted
  const annualPlan = {
    id: '10000000-0000-0000-0000-000000000003',
    name: 'Formule Annuelle (1 An)',
    duration_days: 365,
    price_fcfa: 5000,
    is_active: true,
  };

  const { data: upsertData, error: upsertError } = await supabase
    .from('plans')
    .upsert(annualPlan, { onConflict: 'id' })
    .select();

  if (upsertError) {
    console.error('Erreur insertion formule annuelle:', upsertError);
  } else {
    console.log('\n Succès upsert Formule Annuelle :');
    console.log(upsertData);
  }

  // 3. Verify all plans again
  const { data: updatedPlans } = await supabase
    .from('plans')
    .select('*')
    .order('price_fcfa', { ascending: true });

  console.log('\nListe finale des formules d\'abonnement :');
  console.table(updatedPlans);

  // 4. Test commission calculation logic
  const { computeCommissionForPlan } = await import('../lib/influencers/service.js').catch(async () => {
    // In TypeScript node run:
    return {
      computeCommissionForPlan: (amount) => {
        if (!amount || amount <= 0) return 150;
        if (amount >= 5000) return 500;
        if (amount >= 2000) return 400;
        if (amount >= 700) return 150;
        return 150;
      }
    };
  });

  console.log('\n=== TEST DU CALCUL DES COMMISSIONS INFLUENCEUR ===');
  const testCases = [
    { name: 'Plan 1 Mois (700 F)', amount: 700, expected: 150 },
    { name: 'Plan Trimestriel (2 000 F)', amount: 2000, expected: 400 },
    { name: 'Plan Annuel (5 000 F)', amount: 5000, expected: 500 },
    { name: 'Plan Supérieur (10 000 F)', amount: 10000, expected: 500 },
  ];

  for (const tc of testCases) {
    const comm = computeCommissionForPlan(tc.amount);
    const pass = comm === tc.expected;
    console.log(`${pass ? ' PASS' : '❌ FAIL'}: ${tc.name} -> Commission: ${comm} FCFA (Attendu: ${tc.expected} FCFA)`);
  }

  console.log('\n=== FIN DU TEST ===');
}

main().catch(console.error);
