# ✅ Checklist de Déploiement — Al Muxtaar Société

> Guide complet pour mettre en production la plateforme. Suivez les étapes dans l'ordre.

---

## 0. Prérequis

- [ ] Compte [Supabase](https://supabase.com) créé
- [ ] Compte [Vercel](https://vercel.com) **ou** accès Google Cloud (pour Cloud Run)
- [ ] Node.js ≥ 18 installé localement
- [ ] Git configuré (`git config --global user.email` et `user.name`)
- [ ] Repository GitHub cloné : `https://github.com/Makhtar1927/Al_Muxtaar_Societe`

---

## 1. Configuration Supabase

### 1.1 Créer le projet Supabase

1. Aller sur [app.supabase.com](https://app.supabase.com)
2. **New Project** → Nom : `al-muxtaar` → Région : **Paris (eu-west-3)**
3. Choisir un mot de passe DB fort → **Create project**
4. Attendre l'initialisation (~2 min)

### 1.2 Récupérer les clés

Dans **Settings → API** :

| Variable | Valeur |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL (ex: `https://xxxx.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon / public key |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role key (**⚠️ confidentielle, jamais côté client**) |

### 1.3 Appliquer les migrations SQL

Dans **SQL Editor** de Supabase, exécuter les fichiers **dans cet ordre exact** :

```
supabase/migrations/00000_initial.sql
supabase/migrations/00001_profiles_and_auth.sql
supabase/migrations/00002_courses_and_content.sql
supabase/migrations/00003_payments.sql
supabase/migrations/00004_content_management.sql
```

> **Important :** Copier-coller le contenu de chaque fichier dans le SQL Editor et cliquer **Run**.

### 1.4 Injecter les données de démarrage (seed)

```sql
-- Exécuter dans SQL Editor après toutes les migrations :
-- Contenu du fichier supabase/seed.sql
```

> Le seed crée le compte admin : `221770000000` / `AdminMuxtaar2026!` et les données de démonstration.

### 1.5 Créer les Storage Buckets

Dans **Storage** → **New bucket** :

| Bucket | Public | Description |
|--------|--------|-------------|
| `payments` | ❌ Non | Captures d'écran de paiement Wave/Orange Money |
| `content` | ✅ Oui | Images des leçons et exercices |

Pour le bucket `content`, ajouter cette politique d'accès public :
```sql
CREATE POLICY "Lecture publique contenu" ON storage.objects
  FOR SELECT USING (bucket_id = 'content');
```

### 1.6 Configurer l'Auth Supabase

Dans **Authentication → Settings** :

- **Site URL** : `https://almuxtaar.sn` (ou votre URL Vercel pendant le dev)
- **Redirect URLs** : ajouter `https://almuxtaar.sn/**`
- **Email auth** : activé (pour les faux emails `221XXXXXXXXX@gmail.com`)
- **Désactiver** "Confirm email" pour simplifier (optionnel en dev)

---

## 2. Variables d'environnement

### 2.1 Créer `.env.local` à la racine du projet

```bash
# Copier le template :
cp .env.example .env.local
```

Remplir toutes les valeurs :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://VOTRE_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Site
NEXT_PUBLIC_SITE_URL=https://almuxtaar.sn

# Paiement mobile (numéros Wave et Orange Money)
NEXT_PUBLIC_WAVE_NUMBER=77XXXXXXX
NEXT_PUBLIC_OM_NUMBER=76XXXXXXX

# WhatsApp support
NEXT_PUBLIC_WA_SUPPORT=221XXXXXXXXX
```

> **⚠️ Ne jamais committer `.env.local`** — il est dans `.gitignore`.

---

## 3. Déploiement Vercel (recommandé)

### 3.1 Connecter le repo

1. Aller sur [vercel.com/new](https://vercel.com/new)
2. **Import Git Repository** → sélectionner `Makhtar1927/Al_Muxtaar_Societe`
3. **Framework preset** : Next.js (détecté automatiquement)
4. **Root directory** : `.` (racine)

### 3.2 Variables d'environnement Vercel

Dans **Settings → Environment Variables**, ajouter :

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_WAVE_NUMBER`
- `NEXT_PUBLIC_OM_NUMBER`
- `NEXT_PUBLIC_WA_SUPPORT`

### 3.3 Déployer

Cliquer **Deploy** → attendre ~3 min → l'URL Vercel est générée.

---

## 4. Déploiement Cloud Run (alternatif)

### 4.1 Dockerfile

Créer `Dockerfile` à la racine :

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["npm", "start"]
```

### 4.2 Déployer sur Cloud Run

```bash
# Build et push l'image
gcloud builds submit --tag gcr.io/VOTRE_PROJECT/al-muxtaar

# Déployer le service
gcloud run deploy al-muxtaar \
  --image gcr.io/VOTRE_PROJECT/al-muxtaar \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated \
  --set-env-vars "NEXT_PUBLIC_SUPABASE_URL=...,NEXT_PUBLIC_SUPABASE_ANON_KEY=..."
```

---

## 5. DNS & Domaine personnalisé

1. Dans votre registrar (OVH, Gandi, etc.), pointer le domaine `almuxtaar.sn` vers l'IP Vercel/Cloud Run
2. Activer HTTPS (automatique sur Vercel, via Let's Encrypt)
3. Mettre à jour `NEXT_PUBLIC_SITE_URL=https://almuxtaar.sn` dans les variables d'env
4. Mettre à jour **Supabase Auth → Site URL** avec le vrai domaine

---

## 6. Vérification post-déploiement

### 6.1 Tests fonctionnels essentiels

- [ ] **Page d'accueil** accessible sans connexion (`/`)
- [ ] **Inscription** : créer un compte avec numéro `+221 77 000 0001`
- [ ] **Connexion** : se connecter avec ce compte
- [ ] **Dashboard élève** (`/dashboard`) : visible et fonctionnel
- [ ] **Demande d'abonnement** (`/abonnement`) : formulaire de paiement s'affiche
- [ ] **Activation admin** : se connecter en admin → `/admin/abonnements` → activer l'abonnement
- [ ] **Accès cours** : vérifier que le paywall s'affiche sans abonnement, disparaît avec abonnement actif
- [ ] **Rendu KaTeX** : ouvrir une leçon avec formule mathématique → vérifier le rendu
- [ ] **Laboratoire math** (`/cours/laboratoire`) : cercle trig et grapheur fonctionnels
- [ ] **PWA** : sur mobile, vérifier "Ajouter à l'écran d'accueil"
- [ ] **Hors-ligne** : désactiver le réseau → la page offline (`/offline`) s'affiche

### 6.2 Tests de sécurité

- [ ] Accéder à `/admin` sans compte admin → redirigé vers `/dashboard`
- [ ] Accéder à `/cours/terminale/s2/mathematiques/...` sans abonnement → paywall affiché
- [ ] Vérifier headers HTTP (outil : [securityheaders.com](https://securityheaders.com))
- [ ] Vérifier SEO (outil : [search.google.com/search-console](https://search.google.com/search-console))

### 6.3 Performances

- [ ] Lighthouse score ≥ 80 (Performance, Accessibility, SEO)
- [ ] Tester sur mobile 3G simulé

---

## 7. Compte administrateur

Après avoir appliqué `supabase/seed.sql` :

| Champ | Valeur |
|-------|--------|
| Numéro | `770 000 000` |
| Mot de passe | `AdminMuxtaar2026!` |
| Rôle | `admin` |
| URL | `https://almuxtaar.sn/admin` |

> **⚠️ Changer le mot de passe admin immédiatement** après le premier déploiement.

---

## 8. Maintenance

### Cron job — expiration automatique des abonnements

La fonction `expire_overdue_subscriptions()` est définie en base. Pour l'exécuter automatiquement chaque nuit, créer un cron dans Supabase Edge Functions ou via un service externe (Vercel Cron, GitHub Actions) :

```sql
-- À exécuter chaque nuit à minuit :
SELECT expire_overdue_subscriptions();
```

Avec Vercel Cron, ajouter dans `vercel.json` :
```json
{
  "crons": [
    {
      "path": "/api/cron/expire-subscriptions",
      "schedule": "0 0 * * *"
    }
  ]
}
```

### Sauvegardes

- Supabase Pro inclut des sauvegardes quotidiennes automatiques
- Sur Free tier : exporter manuellement via `pg_dump` chaque semaine

---

## 9. Structure des fichiers de migration

```
supabase/
├── migrations/
│   ├── 00000_initial.sql          # Extensions, schema de base
│   ├── 00001_profiles_and_auth.sql # Profils utilisateurs, RLS auth
│   ├── 00002_courses_and_content.sql # Plans, cours, leçons, quiz, progression
│   ├── 00003_payments.sql         # Paiements, audit, notifications, cron
│   └── 00004_content_management.sql # Fichiers médias, tri du contenu
├── seed.sql                       # Données initiales (admin + démo)
└── tests/
    └── rls_content_test.sql       # Tests de sécurité RLS
```

---

*Généré automatiquement — Al Muxtaar Société Platform v1.0 (P15)*
