# Al_Muxtaar_Société

Plateforme web éducative et commerciale sénégalaise développée dans un dépôt unifié (monolithe modulaire) regroupant :
- **Al_Muxtaar_Doc** (Phase 1 — En cours) : Cours en ligne du programme officiel sénégalais (Terminale S2 Mathématiques au lancement), exercices d'application corrigés, quiz et suivi de progression.
- **Al_Muxtaar_Service** (Phase 2 — Prévu) : Services et solutions informatiques (développement, maintenance, conseil).
- **Al_Muxtaar_Boutique** (Phase 3 — Prévu) : Matériels et produits informatiques & numériques.

---

## 🛠️ Stack Technique

- **Framework** : [Next.js](https://nextjs.org/) (App Router, React 18, TypeScript strict)
- **Styling** : [Tailwind CSS](https://tailwindcss.com/) (Design System mobile-first, tokens personnalisés)
- **Backend & Données** : [Supabase](https://supabase.com/) (PostgreSQL, Supabase Auth, Row Level Security, Supabase Storage)
- **Formules Mathématiques** : KaTeX
- **Déploiement** : Vercel / Cloud Provider compatible Node.js

---

## 🚀 Démarrage Rapide

### 1. Prérequis
- [Node.js](https://nodejs.org/) version 18+ ou 20+ (recommandé LTS)
- npm version 9+ ou 10+
- Un projet [Supabase](https://supabase.com) configuré

### 2. Installation des dépendances
```bash
npm install
```

### 3. Configuration de l'environnement
Copiez le fichier d'exemple et renseignez vos clés Supabase :
```bash
cp .env.example .env.local
```
Dans `.env.local`, renseignez :
```env
NEXT_PUBLIC_SUPABASE_URL="https://votre-projet.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="votre-cle-anonyme-publique"
SUPABASE_SERVICE_ROLE_KEY="votre-cle-service-role-secrete"
```

### 4. Lancement du serveur de développement
```bash
npm run dev
```
Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## 📦 Scripts Disponibles

| Commande | Action |
| :--- | :--- |
| `npm run dev` | Démarre le serveur local de développement |
| `npm run build` | Compile l'application pour la production |
| `npm run start` | Démarre le serveur de production |
| `npm run lint` | Analyse le code avec ESLint |
| `npm run format` | Formate le code avec Prettier |

---

## 🗄️ Base de données & Migrations Supabase

Les scripts SQL se trouvent dans le dossier `supabase/migrations/` :
- `supabase/migrations/00000_initial.sql` : Extensions initiales (`uuid-ossp`, `pgcrypto`)
- `supabase/seed.sql` : Données de test et de démarrage pédagogique

Pour appliquer les migrations avec la CLI Supabase :
```bash
npx supabase db push
```

---

## 🔒 Sécurité & Bonnes Pratiques

- **Contrôle d'accès** : L'accès aux cours payants est vérifié côté serveur par des politiques **Row Level Security (RLS)** sous PostgreSQL.
- **Identifiant élève** : Numéro de téléphone sénégalais (+221) avec dérivation technique pour Supabase Auth.
- **Secrets** : Aucun secret ou clé privée ne doit jamais être commité.

