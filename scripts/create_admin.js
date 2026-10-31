const { createClient } = require('@supabase/supabase-js');

const url = 'https://rxjiewfsmrcsrkjfqsgq.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4amlld2ZzbXJjc3JramZxc2dxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MzQ2MTE2MywiZXhwIjoyMTA5MDM3MTYzfQ.8EzN9U2tdFtwYXa0JYzK_WtdKIyXqsCjCeXznM63j9E';

const admin = createClient(url, key, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function main() {
  console.log('Tentative de création du compte administrateur officiel...');
  const { data, error } = await admin.auth.admin.createUser({
    email: '221772476926@gmail.com',
    password: 'AdminMuxtaar2026!',
    email_confirm: true,
    user_metadata: {
      first_name: 'Pape Makhtar',
      last_name: 'Aidara',
      phone: '+221772476926',
      real_email: 'papemakhtaraidara@gmail.com',
      role: 'admin',
      avatar: 'avatar_09_admin_homme.svg'
    }
  });

  if (error) {
    console.error('Erreur lors de la création :', error.message);
  } else {
    console.log('Compte administrateur créé avec succès ! ID :', data.user.id);
    
    // Mettre à jour explicitement le rôle dans profiles
    const { error: pErr } = await admin
      .from('profiles')
      .update({ role: 'admin', avatar: 'avatar_09_admin_homme.svg', email: 'papemakhtaraidara@gmail.com' })
      .eq('id', data.user.id);
    
    if (pErr) {
      console.error('Erreur mise à jour profil admin :', pErr.message);
    } else {
      console.log('Profil administrateur configuré avec succès !');
    }
  }
}

main();
