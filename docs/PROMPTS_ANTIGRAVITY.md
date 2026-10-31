# Al_Muxtaar_Société — Prompts complets pour Antigravity

## Mode d'emploi

1. Copiez ce dossier à la racine de votre projet : `.agents/rules`, `.agents/workflows`, `docs/` et `public/assets/`.
2. Exportez le cahier des charges (Markdown ou Word) et placez-le dans `docs/cahier-des-charges.md`.
3. Placez vos icônes et avatars SVG dans `public/assets/icons` et `public/assets/avatars`, et votre logo dans `public/assets/logo`.
4. Ouvrez le dossier dans Antigravity. Les règles sont lues automatiquement.
5. Lancez **un prompt par conversation d'agent**, dans l'ordre (P0 → P15). Utilisez le mode **Planning** : lisez le plan, corrigez-le, puis seulement validez.
6. Après chaque prompt : testez, faites un `git commit`, puis passez au suivant.
7. Si un prompt échoue ou dérive, ne le répétez pas : écrivez une correction précise (« le bouton X doit… »).

Hypothèse technique : Next.js + Supabase. L'identifiant de connexion est le **numéro de téléphone** (mappé sur un e-mail technique pour l'authentification), l'e-mail réel étant optionnel. Une vérification par SMS (OTP) pourra être ajoutée plus tard.

Variables à préparer avant P1 : projet Supabase (URL, clé anon, clé service), nom de domaine, numéros marchands Wave / Orange Money.

---

## P0 — Architecture (plan seulement, aucun code)

```
Contexte : nouveau projet Al_Muxtaar_Société. Lis @docs/cahier-des-charges.md en entier et les règles du projet.
Objectif : me proposer l'architecture complète du MVP du module Al_Muxtaar_Doc, sans écrire de code.
Contraintes : respecter la stack imposée ; prévoir dès maintenant la place des modules Service et Boutique sans les développer ; un seul dépôt.
Livrables (dans l'artifact Plan) :
1. arborescence des dossiers (app/, lib/, components/, supabase/migrations/, public/assets/)
2. liste des pages avec, pour chacune, qui y a accès (visiteur, élève, élève abonné, admin)
3. modèle de données (tables, colonnes, relations) pour : profils, niveaux, séries, matières, chapitres, leçons, exercices, quiz, plans, abonnements, paiements, progression, notifications, audit_logs
4. stratégie d'accès (RLS) et de rôles
5. découpage du MVP en 8 étapes testables, dans l'ordre de développement
6. les risques techniques et les questions que tu as pour moi
Critères d'acceptation : le plan est cohérent avec le cahier des charges ; aucune question importante n'est laissée en suspens ; ne code rien.
```

## P1 — Initialisation du projet

```
Contexte : le plan P0 est validé (voir l'artifact Plan et @docs/cahier-des-charges.md).
Objectif : créer le squelette du projet qui démarre sans erreur.
Contraintes : Next.js App Router + TypeScript + Tailwind ; ESLint et Prettier ; dossier supabase/ pour les migrations ; pas de fonctionnalité métier.
Livrables :
- projet initialisé, structure de dossiers du plan P0
- fichier .env.example commenté (aucune vraie clé), .gitignore correct
- client Supabase côté serveur et côté navigateur dans lib/supabase/
- layout racine, page d'accueil provisoire, page 404 et page d'erreur
- README avec les commandes (installation, lancement, migrations)
- dépôt Git initialisé avec un premier commit propre
Critères d'acceptation : « npm run dev » démarre ; « npm run build » et « npm run lint » passent ; aucun secret dans le dépôt.
```

## P2 — Système de design

```
Contexte : projet initialisé (P1). Les couleurs et le style sont dans les règles du projet. Les icônes et avatars SVG sont dans /public/assets.
Objectif : créer le système de design réutilisable, avant toute page.
Contraintes : mobile d'abord ; accessibilité (contraste, cibles ≥ 44 px, focus visible) ; aucune dépendance lourde ; utiliser uniquement les icônes et avatars fournis.
Livrables :
- tokens Tailwind : couleurs, rayons (16 px), ombres douces, espacements, typographie (une police lisible et chaleureuse, chargée de façon légère)
- composants dans components/ui : Button (4 variantes), Card, Input, Select, Badge de statut (en attente, actif, expiré, rejeté), Modal, Toast, ProgressBar, Tabs, EmptyState, Skeleton
- composant Icon qui charge les SVG fournis, et composant Avatar (avec avatar neutre par défaut)
- en-tête avec le logo, menu principal (Doc, Service, Boutique, Mon compte) et menu mobile ; pied de page
- page /design (réservée au développement) qui montre tous les composants
Critères d'acceptation : la page /design s'affiche correctement à 375 px et 1280 px ; contraste conforme ; captures jointes ; aucun composant ne dépend d'une couleur écrite en dur.
```

## P3 — Pages publiques d'Al_Muxtaar_Doc

```
Contexte : design system prêt (P2).
Objectif : créer la vitrine publique du module Doc.
Contraintes : contenu en français simple ; aucune donnée sensible ; les cours payants ne sont jamais affichés ici ; textes courts.
Livrables :
- / : accueil de la plateforme avec les trois modules (Doc actif, Service et Boutique « bientôt »)
- /doc : présentation de Al_Muxtaar_Doc, avantages, aperçu gratuit, appel à s'abonner
- /doc/catalogue : classes → séries → matières (au départ Terminale S2 – Mathématiques disponible, le reste « bientôt »)
- /doc/tarifs : formules 700 FCFA/1 mois et 2 000 FCFA/3 mois (lues depuis la table plans, avec des données temporaires), explication « comment s'abonner » en 4 étapes
- /faq, /contact (lien WhatsApp configurable), /conditions, /confidentialite (textes provisoires à valider)
- SEO de base (titres, descriptions, Open Graph) et site rapide
Critères d'acceptation : parcours visiteur complet à 375 px ; aucun défilement horizontal ; scores Lighthouse mobile > 85 en performance ; captures jointes.
```

## P4 — Authentification et rôles

```
Contexte : pages publiques prêtes (P3). Voir le cahier des charges, sections 3 et 4.4.
Objectif : inscription, connexion et gestion des rôles.
Contraintes : identifiant = numéro de téléphone sénégalais (+221, validation du format) ; l'e-mail réel est optionnel ; utiliser Supabase Auth (e-mail technique dérivé du téléphone) ; mots de passe jamais stockés par nous ; limitation des tentatives de connexion.
Livrables :
- table profiles (nom, prénom, téléphone, e-mail optionnel, niveau, série, avatar, rôle : student | admin | editor) liée à auth.users, créée par trigger
- pages /inscription, /connexion, /mot-de-passe-oublie (réinitialisation par e-mail si fourni, sinon message pour contacter le support)
- choix de l'avatar dans la liste fournie, modifiable dans /compte
- session longue : l'élève reste connecté 60 jours sur le même appareil
- protection des routes par middleware : /compte et /dashboard pour élèves connectés, /admin pour admin uniquement
- politiques RLS sur profiles (un élève ne lit et ne modifie que son profil ; l'admin lit tout)
- script supabase/seed pour créer un administrateur de test
Critères d'acceptation : inscription et connexion fonctionnent ; un élève ne peut pas ouvrir /admin ; un test montre qu'un élève ne peut pas lire le profil d'un autre ; messages d'erreur clairs en français.
```

## P5 — Base de données des contenus et données de départ

```
Contexte : auth en place (P4). Voir cahier des charges sections 4.2, 4.3 et 10.
Objectif : créer le modèle de données des cours avec les politiques d'accès.
Contraintes : migrations SQL versionnées dans supabase/migrations ; RLS sur toutes les tables ; les leçons non gratuites ne sont lisibles que par un élève abonné actif ou un admin ; structure extensible (autres classes, séries et matières sans changer le code).
Livrables :
- tables : levels, tracks, subjects, chapters, lessons (contenu en markdown avec LaTeX, champ is_free, statut draft/published), exercises, quizzes, quiz_questions, quiz_answers, progress
- fonction SQL has_active_subscription(user_id) utilisée par les politiques RLS
- données de départ : niveaux Seconde/Première/Terminale ; série S2 ; matière Mathématiques ; chapitres de Terminale S2 Maths (liste de la section 4.3 du cahier des charges, à confirmer) avec une leçon d'exemple gratuite et une leçon payante, en brouillon
- types TypeScript générés à partir de la base
Critères d'acceptation : tests SQL montrant que : visiteur ne lit que le catalogue et les leçons gratuites publiées ; élève non abonné idem ; élève abonné lit toutes les leçons publiées de sa classe ; seul l'admin peut écrire.
```

## P6 — Abonnement et activation par l'admin

```
Contexte : base des contenus prête (P5). Voir cahier des charges sections 4.5 et 4.6.
Objectif : un élève demande un abonnement, l'admin l'active, et l'accès s'ouvre ou se ferme selon l'abonnement.
Contraintes : activation uniquement manuelle par l'admin (pas de paiement automatique à ce stade) ; prix lus depuis la table plans (700 FCFA/1 mois, 2 000 FCFA/3 mois) ; jamais de logique d'accès uniquement côté interface.
Livrables :
- tables plans, subscriptions (statut pending/active/rejected/expired/suspended/cancelled, dates, activated_by, motif de rejet), payments (montant, opérateur Wave/Orange Money/Free Money, numéro de transaction, preuve optionnelle)
- page élève /abonnement : choix de la formule, instructions de paiement (numéros marchands depuis la configuration), formulaire de preuve, suivi du statut
- page admin /admin/abonnements : liste filtrable (en attente, actifs, expirés), détail du paiement, boutons Activer (date de début = activation, fin = début + durée), Rejeter (motif obligatoire), Prolonger, Suspendre
- renouvellement : si l'élève renouvelle avant l'expiration, la nouvelle période s'ajoute à la suite
- tâche planifiée quotidienne : passer en « expiré » les abonnements dont la date de fin est dépassée
- journal audit_logs pour chaque action admin
Critères d'acceptation : parcours testé de bout en bout (demande → activation → accès → expiration simulée → blocage) ; un élève ne peut pas activer son propre abonnement ; un test prouve que l'accès aux leçons payantes est refusé sans abonnement actif.
```

## P7 — Gestion des contenus (admin)

```
Contexte : abonnements en place (P6). Voir cahier des charges section 4.7.
Objectif : permettre à l'admin et à l'éditeur de créer et publier les cours sans toucher au code.
Contraintes : rôles admin et editor uniquement ; pas de HTML brut non nettoyé (protection XSS) ; formules en LaTeX avec aperçu KaTeX.
Livrables :
- /admin/contenu : arbre niveau → série → matière → chapitre → leçon, avec création, modification, réordonnancement (glisser-déposer) et suppression sécurisée
- éditeur de leçon : markdown + formules LaTeX avec aperçu en direct, gabarit de leçon (objectifs, rappels, cours, méthodes, exemples, exercices, quiz, résumé), case « leçon gratuite », statut brouillon/publié, aperçu « comme un élève »
- éditeur d'exercices (énoncé, corrigé détaillé, difficulté 1 à 3) et de quiz (questions à choix multiples avec explication)
- téléversement d'images compressées automatiquement (Supabase Storage)
- bloc « Illustration interactive » (type, fichier, légende, image de secours), la lecture viendra en P12
Critères d'acceptation : créer un chapitre complet de bout en bout ; formules correctes sur mobile ; un éditeur ne peut pas gérer les abonnements ; contenus brouillons invisibles pour les élèves.
```

## P8 — Lecteur de cours

```
Contexte : contenus créés par l'admin (P7), accès contrôlé (P5, P6).
Objectif : l'expérience de lecture des cours pour l'élève abonné.
Contraintes : mobile d'abord ; formules KaTeX nettes et sans débordement ; chargement rapide ; protection des contenus (pas de bouton de téléchargement, filigrane discret avec le nom/téléphone de l'élève sur la page, pas de promesse d'inviolabilité).
Livrables :
- /doc/[niveau]/[serie]/[matiere] : liste des chapitres avec progression
- /doc/.../[chapitre]/[leçon] : lecteur avec sommaire du chapitre, boutons précédente/suivante, taille du texte et mode sombre
- corrigés masqués derrière un bouton « Voir la solution »
- quiz avec correction automatique et score enregistré
- bouton « Marquer comme terminée » et mise à jour de la progression
- pour un non-abonné : aperçu des leçons gratuites seulement, et pour les autres un écran clair « Abonne-toi » (sans fuite du contenu dans le code source ni l'API)
Critères d'acceptation : un test automatique prouve qu'un non-abonné ne reçoit pas le contenu payant dans la réponse de l'API ; lecture agréable à 375 px ; progression enregistrée ; captures jointes.
```

## P9 — Tableau de bord de l'élève

```
Contexte : lecteur de cours prêt (P8). Voir cahier des charges section 4.4.
Objectif : le tableau de bord visible uniquement par les élèves avec abonnement actif.
Contraintes : un élève sans abonnement actif est redirigé vers /abonnement avec un message clair ; données lues côté serveur.
Livrables :
- /dashboard : bandeau de bienvenue avec avatar, statut de l'abonnement, date d'expiration et jours restants (alerte corail sous 7 jours)
- matières de sa classe, progression globale et par chapitre, bouton « Reprendre où j'en étais »
- derniers résultats de quiz et suggestion des chapitres à revoir
- favoris et notes personnelles par leçon
- annonces de l'équipe
- page /compte : profil, avatar, mot de passe, historique des abonnements
Critères d'acceptation : parcours testé pour les 4 profils (visiteur, élève non abonné, élève abonné, abonnement expiré) ; affichage fluide à 375 px.
```

## P10 — Back-office : tableau de bord admin

```
Contexte : fonctions élèves prêtes (P6 à P9). Voir cahier des charges section 4.7.
Objectif : la vue d'ensemble de l'administrateur.
Contraintes : accès admin uniquement ; export sans données inutiles.
Livrables :
- /admin : cartes de synthèse (élèves inscrits, abonnés actifs, demandes en attente, revenus du mois, abonnements expirant sous 7 jours) et graphique des inscriptions et abonnements sur 30 jours
- /admin/eleves : recherche, fiche élève (abonnements, progression), blocage/déblocage, réinitialisation de mot de passe
- /admin/tarifs : modification des formules sans toucher au code
- /admin/journal : journal des actions admin filtrable
- /admin/roles : gestion des administrateurs et éditeurs
- export CSV des abonnements et paiements
Critères d'acceptation : chiffres cohérents avec la base ; un éditeur ne voit pas les revenus ; export CSV vérifié.
```

## P11 — Notifications et rappels

```
Contexte : abonnements et profils en place. Voir cahier des charges section 7.
Objectif : informer l'élève et l'équipe aux bons moments.
Contraintes : fournisseur d'envoi abstrait (interface) pour pouvoir changer d'opérateur SMS/WhatsApp ; aucun envoi réel en développement (mode simulation) ; pas de données personnelles dans les journaux.
Livrables :
- table notifications et cloche de notifications dans l'en-tête
- événements : demande reçue, abonnement activé, abonnement rejeté (avec motif), rappel à 7 jours et 2 jours avant l'expiration, abonnement expiré
- alerte à l'admin pour chaque nouvelle demande
- lien WhatsApp préformaté pour contacter le support
- tâche planifiée quotidienne qui crée les rappels
Critères d'acceptation : chaque événement crée une notification visible ; les rappels ne sont pas envoyés deux fois ; mode simulation vérifié.
```

## P12 — Illustrations 3D et animations interactives

```
Contexte : bloc « Illustration interactive » créé en P7, lecteur en P8. Voir cahier des charges section 4.9.
Objectif : afficher des illustrations 3D et des animations très légères dans les leçons.
Contraintes : budget : modèle 3D < 300 Ko, animation < 100 Ko ; chargement à la demande (bouton « Voir en 3D » / « Lancer l'animation ») ; image fixe de secours ; respect de « réduire les animations » ; pas de bibliothèque lourde chargée sur les pages sans illustration.
Livrables :
- composant InteractiveFigure avec types : SVG animé, Lottie, graphique de fonction interactif (courbe avec curseurs), modèle 3D (glTF/GLB) pivotable
- chargement paresseux (code et fichiers), pause/relecture, légende et consigne
- 3 exemples dans Terminale S2 Maths : courbe de fonction avec curseur de paramètre, tangente comme pente, solide de l'espace en 3D
- vérification du poids par un script qui refuse un fichier dépassant le budget
Critères d'acceptation : les pages sans illustration ne chargent pas ces bibliothèques ; fonctionne sur un téléphone modeste ; image de secours affichée si la 3D échoue.
```

## P13 — PWA et session longue

```
Contexte : plateforme fonctionnelle. Voir cahier des charges section 8.1.
Objectif : rendre le site installable, rapide et utilisable sans reconnexion permanente.
Contraintes : ne jamais mettre en cache des contenus payants pour un utilisateur non abonné ; les paiements et inscriptions exigent Internet ; ne pas casser l'authentification.
Livrables :
- manifeste PWA (nom, icônes, couleurs de la marque), service worker, invitation à installer l'application (écran d'accueil), page « hors ligne » conviviale
- cache de l'enveloppe de l'application et des pages déjà consultées
- session longue (60 à 90 jours) avec renouvellement sécurisé
- mise à jour automatique du service worker avec message « Nouvelle version disponible »
Critères d'acceptation : audit PWA Lighthouse réussi ; l'application s'installe sur Android ; après coupure d'Internet, les pages déjà consultées s'ouvrent ; un utilisateur déconnecté ne retrouve aucun contenu payant dans le cache.
```

## P14 — Mode hors ligne par chapitre

```
Contexte : PWA en place (P13). Voir cahier des charges section 8.1.
Objectif : l'abonné télécharge des chapitres et les lit sans Internet, tant que son abonnement est valide.
Contraintes : contenu stocké chiffré dans IndexedDB ; licence signée par le serveur ; limite de 2 appareils par élève ; KaTeX et polices servis localement ; aucune promesse de protection absolue.
Livrables :
- bouton « Télécharger pour lire hors ligne » par chapitre, avec taille estimée, progression, suppression
- licence hors ligne signée (élève, appareil, date de fin d'abonnement) renouvelée à chaque connexion ; tolérance de 7 jours après la dernière vérification en ligne
- verrouillage puis suppression des contenus téléchargés si l'abonnement est expiré ou suspendu (à la reconnexion)
- protection contre le changement de date de l'appareil (dernière heure serveur mémorisée)
- synchronisation de la progression et des quiz faits hors ligne
- gestion des appareils dans /compte (voir, retirer)
Critères d'acceptation : un chapitre téléchargé s'ouvre en mode avion ; après expiration simulée et reconnexion, il est verrouillé ; le troisième appareil est refusé ; la progression se synchronise.
```

## P15 — Sécurité, tests et mise en ligne

```
Contexte : fonctionnalités du MVP terminées. Lance le workflow /securite-avant-livraison puis prépare la livraison.
Objectif : valider la sécurité et mettre le MVP en ligne.
Contraintes : aucune fonctionnalité nouvelle ; corrections seulement après mon accord.
Livrables :
- rapport de sécurité (routes, RLS, secrets, validation, limitation de débit)
- tests automatiques : accès aux leçons selon les 4 profils, cycle de vie d'un abonnement, contrôle des rôles
- journalisation d'erreurs, sauvegardes quotidiennes de la base, page de statut simple
- configuration de déploiement (variables d'environnement, domaine, HTTPS, en-têtes de sécurité)
- conditions d'utilisation et politique de confidentialité à compléter (mentions de conformité avec la CDP du Sénégal)
- check-list de lancement et plan de retour arrière
Critères d'acceptation : tous les tests passent ; aucun secret dans le dépôt ; build de production réussi ; guide d'utilisation de l'admin d'une page.
```

---

## Prompts des phases suivantes

### P16 — Génie en Herbe (compétitions de classe)

```
Contexte : MVP en ligne. Voir cahier des charges section 4.10 (décisions retenues).
Objectif : permettre à une classe de créer un concours Génie en Herbe pour 500 FCFA.
Contraintes : 500 FCFA = une compétition, jusqu'à 60 participants ; organisateur et participants sans abonnement Doc obligatoire ; questions générées par IA à partir du référentiel du programme et du contenu des cours, jamais sans contrôle qualité ; temps réel léger pour mobile.
Livrables :
- tables : competitions, participants, teams, question_bank, competition_questions, answers, scores, reports
- parcours de création (classe, série, matières, chapitres, difficulté, format) puis paiement de 500 FCFA avec validation admin
- génération des questions (JSON strict : énoncé, options, bonne réponse, explication, chapitre, difficulté), contrôles automatiques (une seule bonne réponse, doublons, vérification des calculs), banque de questions réutilisable, relecture admin des questions « programme officiel »
- salle de jeu en temps réel : code d'invitation, QCM chronométré, vrai/faux, question éclair, manches, équipes, écran animateur
- scores, classement, résultats par question, certificat, signalement d'une question douteuse
Critères d'acceptation : une compétition complète jouée à 10 téléphones simulés ; chronomètre géré par le serveur ; questions rattachées à un chapitre du programme.
```

### P17 — Al_Muxtaar_Service

```
Contexte : voir cahier des charges section 5. Même compte et mêmes composants que le module Doc.
Objectif : le module de services informatiques (développement de solutions, maintenance, conseil et orientation, services numériques).
Livrables : catalogue de services, fiche service, demande de devis ou de rendez-vous, suivi des demandes par statut (reçue, en étude, devis envoyé, en cours, livrée), espace client avec fichiers échangés, contrats de maintenance avec échéances, back-office, reçus.
Critères d'acceptation : parcours complet client et admin ; aucune duplication de l'authentification ni du design system.
```

### P18 — Al_Muxtaar_Boutique

```
Contexte : voir cahier des charges section 6. Même compte et mêmes composants que le module Doc.
Objectif : la boutique de produits informatiques et numériques.
Livrables : catalogue par catégories avec fiches techniques et filtres, panier, commande, paiement mobile ou à la livraison, frais de livraison par zone, suivi de commande, garantie et service après-vente, gestion du stock, produits numériques livrés après paiement validé, factures.
Critères d'acceptation : commande complète testée ; stock décrémenté correctement ; un produit numérique n'est accessible qu'après validation du paiement.
```

---

## Prompts de correction (modèles)

**Correction d'une interface** :
```
Sur la page [nom], à 375 px : [problème précis]. Attendu : [résultat précis, avec valeurs : taille, couleur, espacement]. Ne modifie que ce composant. Montre une capture avant/après.
```

**Correction d'un bug** :
```
Bug : [ce qui se passe] quand [actions exactes]. Attendu : [comportement]. Trouve la cause d'abord (explique-la), propose le correctif minimal, ajoute un test qui échoue avant et passe après, puis applique.
```

**Revue de code** :
```
Relis les fichiers modifiés lors de la dernière tâche. Cherche : failles d'accès, données exposées, validations manquantes, code dupliqué, pages lourdes. Liste les problèmes par gravité, sans rien modifier.
```
