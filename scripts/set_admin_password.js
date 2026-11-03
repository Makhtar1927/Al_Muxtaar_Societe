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

async function setPassword() {
  const adminUserId = '91656de5-c86f-4154-a325-4ae7a7f82e34'; // Pape Makhtar Aidara (+221772476926)
  const newPassword = 'Passer1234!';

  console.log(`Mise à jour du mot de passe pour l'utilisateur admin ${adminUserId}...`);

  const { data, error } = await supabase.auth.admin.updateUserById(adminUserId, {
    password: newPassword,
    email_confirm: true,
  });

  if (error) {
    console.error('Erreur:', error.message);
  } else {
    console.log('SUCCÈS: Mot de passe mis à jour avec succès pour:', data.user.email);
    console.log('Nouveau mot de passe:', newPassword);
  }
}

setPassword();

