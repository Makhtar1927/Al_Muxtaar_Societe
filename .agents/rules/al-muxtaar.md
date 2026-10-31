# Projet Al_Muxtaar_Société — règles permanentes

Plateforme web unique composée de trois modules : Al_Muxtaar_Doc (cours en ligne), Al_Muxtaar_Service (services informatiques), Al_Muxtaar_Boutique (produits informatiques et numériques).
Public : élèves sénégalais (Seconde, Première, Terminale), mobile d'abord, connexion Internet parfois lente (3G/4G).
Référence produit à suivre : @docs/cahier-des-charges.md

## Stack imposée (ne pas changer sans me demander)
- Next.js (App Router) + TypeScript + Tailwind CSS
- Supabase : PostgreSQL, Auth, Storage, Row Level Security
- KaTeX pour les formules mathématiques
- PWA (service worker) pour la session longue et le mode hors ligne
- Un seul dépôt, un seul projet, trois modules : app/(doc), app/(service), app/(boutique), noyau commun dans lib/ et components/

## Méthode de travail
- Toujours produire un plan (artifact Plan) et attendre mon accord avant de coder.
- Une seule fonctionnalité par tâche. Ne modifie pas ce qui n'est pas demandé.
- Termine chaque tâche en lançant l'application, en testant, puis en résumant : fichiers créés/modifiés, ce qui marche, ce qui reste.
- Propose un message de commit Git à la fin de chaque tâche.
- Si une information manque, pose une question courte au lieu d'inventer.

## Langue
- Interface utilisateur : français (ton simple, phrases courtes, vocabulaire scolaire sénégalais).
- Code, noms de variables, commentaires : anglais.
- Monnaie : FCFA, format « 2 000 FCFA ». Téléphone : format sénégalais +221.

## Sécurité (obligatoire)
- Le contrôle d'accès est vérifié côté serveur et par Row Level Security, jamais seulement dans l'interface.
- Aucune clé secrète dans le code : variables d'environnement, fichier .env.example fourni.
- Valider toutes les entrées (zod). Protéger contre XSS, CSRF et injection SQL.
- Un élève ne lit les leçons payantes que si son abonnement est actif (statut active ET date de fin non dépassée).
- Les actions admin sont enregistrées dans un journal (audit_logs).

## Performance
- Mobile d'abord (largeur de test : 375 px), pages légères, images compressées (WebP/AVIF), chargement à la demande.
- Illustrations 3D < 300 Ko, animations < 100 Ko, avec image de secours.

## Design
- Couleurs : turquoise #00B8A9, bleu nuit #243447, or #F7B731, corail #F0654C (alertes), fond #F4F8FB, texte #17222F.
- Style : propre, arrondi (rayon 16 px), ombres douces, légèrement 3D, très lisible sur petit écran.
- Utiliser uniquement les icônes et avatars fournis dans /public/assets (SVG). Ne pas en inventer.
- Accessibilité : contraste suffisant, cibles tactiles ≥ 44 px, focus visible, respect de « réduire les animations ».

## Tarifs initiaux (modifiables en base, table plans)
- 1 mois : 700 FCFA — 3 mois : 2 000 FCFA.
- Activation de l'abonnement uniquement par un administrateur.
