# Al\_Muxtaar\_Société – Cahier des charges du projet

*Plateforme web éducative et commerciale – Version 1.0 – Octobre 2026*

## 1. Présentation générale

**Al\_Muxtaar\_Société** est une plateforme web unique, développée dans un seul environnement (une seule base de code, une seule authentification, une seule base de données), composée de trois modules :

| Module | Rôle | Priorité |
| --- | --- | --- |
| **Al\_Muxtaar\_Doc** | Cours en ligne du programme sénégalais (Seconde, Première, Terminale) | **Phase 1 – démarrage** |
| **Al\_Muxtaar\_Service** | Services informatiques : développement de solutions, maintenance, conseil et orientation | Phase 2 |
| **Al\_Muxtaar\_Boutique** | Vente de produits informatiques et numériques | Phase 3 |

**Identité visuelle** (d'après le logo) : turquoise (#00B8A9 environ) et bleu nuit (#243447 environ), symbole en forme de « A » avec flèches ascendantes (progression, réussite), signature « Société ».

**Vision** : devenir la référence sénégalaise de l'apprentissage en ligne accessible, bon marché et conforme au programme officiel, puis étendre l'écosystème avec des services et une boutique.

## 2. Objectifs du projet

- Proposer des cours **directement consultables en ligne** (pages web interactives, pas de simples PDF à télécharger).
- Respecter le **programme officiel sénégalais**, en commençant par la **Terminale S2 – Mathématiques**.
- Mettre en place un **modèle d'abonnement simple et abordable** : 700 FCFA/mois ou 2 000 FCFA pour 3 mois.
- Donner à l'administrateur le **contrôle total** de l'activation des abonnements.
- Construire une architecture **évolutive** pour ajouter classes, séries, matières, puis les modules Service et Boutique sans tout refaire.

## 3. Public cible et acteurs

| Acteur | Description | Droits principaux |
| --- | --- | --- |
| **Visiteur** | Personne non connectée | Voir la vitrine, les tarifs, des extraits gratuits |
| **Élève inscrit (non abonné)** | Compte créé, abonnement absent ou expiré | Voir le catalogue, les aperçus gratuits, demander un abonnement |
| **Élève abonné** | Abonnement **activé par l'admin** et en cours de validité | Accès complet au dashboard, cours, exercices, progression |
| **Administrateur** | Équipe Al\_Muxtaar | Gère tout : abonnements, contenus, utilisateurs, statistiques |
| **Enseignant / Rédacteur** *(optionnel, évolution)* | Auteur de contenus | Crée et modifie des cours sans accès aux paiements |
| **Parent** *(évolution)* | Suit un ou plusieurs élèves | Consulte la progression, paie l'abonnement |

## 4. Module 1 : Al\_Muxtaar\_Doc (périmètre de la Phase 1)

### 4.1 Périmètre de lancement

- **Classe** : Terminale
- **Série** : S2 (Sciences expérimentales)
- **Matière** : Mathématiques
- Structure prête pour ajouter ensuite : Terminale S1, L, etc., Première, Seconde, et d'autres matières (Physique-Chimie, SVT, Français, Philosophie, Anglais…).

### 4.2 Hiérarchie des contenus

```
Niveau (Seconde / Première / Terminale)
 └── Série (S1, S2, L…)
      └── Matière (Mathématiques…)
           └── Chapitre
                └── Leçon
                     ├── Cours (texte + formules)
                     ├── Méthodes et astuces
                     ├── Exemples résolus
                     ├── Exercices (niveaux 1 à 3) avec corrigés
                     ├── Vidéo (optionnelle)
                     └── Quiz d'auto-évaluation
```

### 4.3 Chapitres de Mathématiques Terminale S2 (proposition à valider avec le programme officiel de l'IGEF)

1. Limites et continuité
2. Dérivation et étude de fonctions
3. Suites numériques
4. Fonction logarithme népérien
5. Fonction exponentielle et fonctions puissances
6. Primitives et calcul intégral
7. Équations différentielles
8. Nombres complexes
9. Dénombrement et probabilités
10. Statistiques
11. Géométrie dans l'espace (produit scalaire, produit vectoriel selon programme)
12. Transformations du plan (isométries, similitudes)
13. Arithmétique (selon programme en vigueur)

> ⚠️ La liste exacte et l'ordre doivent être confrontés au **programme officiel en vigueur** et aux manuels agréés avant la rédaction.

### 4.4 Fonctionnalités côté élève

**Inscription et connexion**

- Inscription par nom, prénom, téléphone (obligatoire, format sénégalais +221), e-mail (optionnel), classe, série, mot de passe.
- Connexion par téléphone ou e-mail + mot de passe ; réinitialisation du mot de passe (SMS ou e-mail).

**Dashboard élève (visible uniquement si l'abonnement est actif)**

- Bandeau de bienvenue : statut de l'abonnement, date d'expiration, jours restants.
- Matières disponibles de sa classe/série (au départ : Mathématiques).
- Progression globale et par chapitre (barre de progression).
- « Reprendre où j'en étais » (dernière leçon consultée).
- Résultats des quiz, points faibles suggérés.
- Favoris et notes personnelles.
- Annonces de l'équipe (nouveau cours, devoir, rappel d'expiration).

**Lecteur de cours**

- Affichage des **formules mathématiques** en LaTeX (KaTeX), propres et lisibles sur mobile.
- Schémas et courbes (images SVG, ou graphiques interactifs avec GeoGebra/JSXGraph en évolution).
- Navigation : sommaire du chapitre, bouton « leçon précédente / suivante ».
- Marquer une leçon comme « terminée ».
- Corrigés masqués avec bouton « Voir la solution » (pour pousser l'élève à chercher d'abord).
- Mode sombre et réglage de la taille du texte.

**Évaluation**

- Quiz à choix multiples avec correction automatique.
- Exercices de type devoir/composition avec barème et corrigé détaillé.
- Annales du BAC S2 par année, avec corrigés (phase ultérieure).

**Accès aux contenus selon l'abonnement**

- Visiteur / non abonné : catalogue + 1 ou 2 leçons gratuites par matière (vitrine de démonstration).
- Abonné actif : tout le contenu de sa classe et série.
- Abonnement expiré : accès bloqué, avec rappel pour renouveler ; l'historique de progression est conservé.

### 4.5 Modèle d'abonnement et tarifs

| Formule | Durée | Prix |
| --- | --- | --- |
| **Mensuelle** | 1 mois | **700 FCFA** |
| **Trimestrielle** | 3 mois | **2 000 FCFA** (soit ≈ 667 FCFA/mois, économie de 100 FCFA) |

**Point à clarifier** : le tarif s'applique-t-il **par matière** ou donne-t-il accès à **toutes les matières** de la classe ? La structure technique prévoit les deux cas (abonnement par matière ou par pack).

### 4.6 Processus d'abonnement (activation par l'admin)

1. L'élève crée son compte.
2. Il choisit une formule (1 mois ou 3 mois) et crée une **demande d'abonnement** (statut : *En attente*).
3. Il paie via **Wave, Orange Money, Free Money** (ou autre) vers le numéro officiel Al\_Muxtaar, puis soumet : numéro de transaction, numéro payeur, montant, capture d'écran (optionnelle).
4. L'admin voit la demande dans son tableau de bord, **vérifie le paiement**, puis **active** ou **rejette** (avec motif).
5. À l'activation : date de début = date d'activation, date de fin = début + 1 ou 3 mois ; l'élève reçoit une notification (SMS/WhatsApp/e-mail) et accède au dashboard.
6. 7 jours, puis 2 jours avant l'expiration : rappel automatique. À la date de fin, statut *Expiré*, accès coupé automatiquement.
7. Renouvellement : si l'élève renouvelle avant l'expiration, la nouvelle période s'ajoute à la suite de la précédente.

**Statuts d'un abonnement** : En attente → Actif → Expiré ; ou En attente → Rejeté ; ou Actif → Suspendu / Annulé (par l'admin).

**Évolution recommandée (phase 2 du module)** : intégrer un agrégateur de paiement (PayTech, CinetPay, PayDunya, Intouch…) pour une **activation automatique**, en conservant l'activation manuelle comme option de secours.

### 4.7 Back-office administrateur

- **Tableau de bord** : nombre d'élèves, abonnés actifs, demandes en attente, revenus du mois, abonnements expirant bientôt.
- **Gestion des abonnements** : liste filtrable (en attente / actifs / expirés), bouton Activer, Rejeter, Prolonger, Suspendre, Offrir un accès gratuit, notes internes.
- **Gestion des élèves** : recherche, fiche détaillée (historique des abonnements, progression), blocage, réinitialisation du mot de passe.
- **Gestion des contenus** : créer/modifier/ordonner niveaux, séries, matières, chapitres, leçons ; éditeur riche avec formules LaTeX ; brouillon / publié ; aperçu avant publication ; import/export.
- **Gestion des prix** : modifier les tarifs et durées sans toucher au code ; codes promo (évolution).
- **Journal d'activité** : qui a activé quel abonnement et quand (traçabilité).
- **Gestion des administrateurs** : rôles (super-admin, gestionnaire d'abonnements, rédacteur).
- **Export** des listes (CSV/Excel) pour la comptabilité.

### 4.8 Pages publiques du module

- Accueil Al\_Muxtaar\_Doc (présentation, avantages, aperçu gratuit)
- Catalogue par classe, série et matière
- Tarifs et comment s'abonner
- FAQ, contact (WhatsApp), conditions d'utilisation, politique de confidentialité

### 4.9 Illustrations 3D et animations pédagogiques

Chaque cours peut intégrer des **illustrations 3D et des animations explicites, mais très légères**, pour rendre visibles les notions abstraites en Maths, SVT, Physique-Chimie et les autres matières. Principe : la 3D et l'animation servent à comprendre, jamais à décorer.

| Matière | Exemples d'illustrations |
| --- | --- |
| **Mathématiques** | Courbes de fonctions avec curseurs (limites, dérivée comme pente de la tangente, aire sous la courbe), suites représentées pas à pas, nombres complexes dans le plan, solides et sections de l'espace en 3D rotative, transformations du plan animées |
| **SVT** | Cellule et organites, division cellulaire, génétique et hérédité, circulation sanguine, appareils respiratoire et digestif, schémas de la reproduction |
| **Physique-Chimie** | Circuits électriques, mouvement et forces, lancer de projectile, optique (lentilles, réfraction), ondes, modèles de molécules et d'atomes, réactions chimiques |
| **Autres matières** | Cartes et frises animées (Histoire-Géographie), schémas de conjugaison ou de grammaire (Français), etc. |

**Technologies légères recommandées**

- **SVG et animations CSS** pour les schémas animés : quelques Ko, nets sur tous les écrans.
- **Lottie** (animations vectorielles au format JSON) pour les animations plus riches.
- **JSXGraph** ou **GeoGebra** pour les graphiques mathématiques interactifs (curseurs, points déplaçables).
- **three.js** ou **model-viewer** avec modèles **glTF/GLB compressés** (Draco ou meshopt) pour la 3D que l'élève peut faire pivoter et agrandir.
- Modèles créés avec Blender, puis optimisés avant publication.

**Règles de légèreté (contexte mobile et connexion limitée)**

1. Budget par illustration : modèle 3D < 300 Ko, animation SVG ou Lottie < 100 Ko.
2. **Chargement à la demande** : une image fixe s'affiche d'abord ; la 3D ou l'animation démarre au toucher d'un bouton « Voir en 3D » ou « Lancer l'animation ».
3. **Version de secours** : sur un appareil faible ou si la 3D n'est pas supportée, l'élève voit l'image fixe avec sa légende.
4. Respect du réglage « réduire les animations » du téléphone, et possibilité de mettre en pause ou de rejouer.
5. Chaque illustration est accompagnée d'une **explication écrite** et d'une courte consigne (par exemple « déplace le curseur et observe la tangente »).
6. Les illustrations des chapitres téléchargés sont incluses dans le **mode hors ligne** (section 8.1).

**Production et organisation**

- Une bibliothèque d'illustrations réutilisables (repère de courbes, solides, circuits, cellule), pour produire vite et garder un style uniforme aux couleurs de la marque.
- Dans l'éditeur admin, un bloc « Illustration interactive » s'ajoute à une leçon (type, fichier, légende, image de secours).
- Priorité de lancement : 2 à 3 illustrations par chapitre de Maths Terminale S2 (courbes interactives et géométrie dans l'espace d'abord) ; SVT et Physique-Chimie suivent avec leurs modules.

### 4.10 Génie en Herbe : compétitions de classe à 500 FCFA

Chaque classe, quel que soit son niveau ou sa série, peut **créer son propre concours « Génie en Herbe »** pour **500 FCFA**. Les questions sont **générées automatiquement** et **adaptées au programme** de la classe concernée.

**Hypothèse retenue** : 500 FCFA = **une compétition créée** (une session, avec un nombre de participants plafonné, à fixer). Ce point est à confirmer (voir plus bas).

**Parcours de création**

1. L'organisateur (délégué de classe, élève ou enseignant) choisit la **classe et la série**, les **matières** et les **chapitres** couverts, la **difficulté**, le nombre de questions et le format.
2. Il paie **500 FCFA** par mobile money ; l'admin valide (puis validation automatique quand le paiement automatisé sera en place).
3. La plateforme **génère les questions** à partir du programme et du contenu des cours.
4. L'organisateur peut **relire, retirer ou remplacer** des questions avant le lancement.
5. Un **lien et un code d'invitation** sont envoyés ; les participants rejoignent depuis leur téléphone.
6. La compétition se joue en direct ou à une date programmée ; **classement, résultats par question et certificat** à la fin.

**Formats de jeu**

- QCM chronométré, vrai/faux, réponse courte, question « éclair » (le plus rapide marque).
- **Manches par matière** (par exemple Maths, SVT, Physique-Chimie, Culture générale).
- Mode **individuel** ou **par équipes** (une équipe peut jouer sur un seul téléphone).
- **Écran animateur** pour projeter les questions et le classement en salle de classe.
- Mode **entraînement** solo avec les mêmes questions après la compétition.

**Génération automatique des questions**

- Chaque question est rattachée à un **chapitre du programme** ; seules les notions de la classe sont utilisées, et l'organisateur choisit les chapitres déjà étudiés.
- Génération par **IA à partir du contenu de la plateforme** (cours, exercices, programme officiel), au format structuré : énoncé, options, bonne réponse, explication, chapitre, difficulté.
- **Contrôle qualité automatique** : une seule bonne réponse, options cohérentes, absence de doublons, **vérification par calcul** des questions de Maths et de Physique-Chimie.
- **Banque de questions** : toute question validée est conservée et réutilisée, ce qui réduit le coût de génération et améliore la qualité avec le temps.
- Signalement d'une question douteuse par les joueurs, puis correction ou retrait par l'admin.
- Les questions d'une matière sans contenu publié sur la plateforme sont générées à partir du programme officiel et signalées « à relire » par l'équipe.

**Règles et équité**

- Points selon l'exactitude et la rapidité, bonus de série de bonnes réponses.
- Chronomètre géré par le serveur ; questions et options mélangées selon les joueurs ; un joueur = une session.
- Scores et classements visibles uniquement par les participants de la compétition.

**Aspects techniques**

- Jeu en direct par **WebSockets** (ou service temps réel du back-end), avec reconnexion automatique et faible consommation de données.
- Nouvelles tables : compétitions, participants, équipes, questions, réponses, scores, paiements de compétition, signalements.
- Back-office : liste et validation des compétitions, banque de questions, signalements, réglage du prix et des plafonds.
- Calendrier : cette fonctionnalité s'ajoute à la **phase 4** (extension du module Doc), après le lancement du MVP.

**Décisions retenues pour Génie en Herbe**

| Question | Décision recommandée | Pourquoi |
| --- | --- | --- |
| **Abonnement de l'organisateur** | Aucun abonnement Doc requis : les 500 FCFA suffisent pour créer. Les abonnés Doc actifs reçoivent une compétition offerte par trimestre (à valider). | Aucun frein à l'entrée, et un avantage concret pour s'abonner. |
| **Abonnement des participants** | Aucun : compte gratuit et code d'invitation. Après la compétition, chacun voit son score et la correction des questions ; l'entraînement illimité et les cours liés restent réservés aux abonnés. | Diffusion rapide dans la classe ; chaque participant devient un futur abonné. |
| **Nombre de participants** | 500 FCFA = jusqu'à 60 participants (une classe, y compris les classes nombreuses). Au-delà : palier à 150 participants pour 1 000 FCFA (à valider), puis devis pour une école ou un concours inter-classes. | Le coût du temps réel et de la génération grandit avec le nombre de joueurs. |
| **Classes concernées** | Toutes les classes dès le départ, avec deux niveaux de qualité : **Cours publiés** (questions basées sur le contenu de la plateforme, badge « Vérifié ») et **Programme officiel** (questions générées sur la liste officielle des chapitres, relues par l'équipe avant la première utilisation, puis conservées dans la banque). | Respecte l'ambition « toute classe » sans publier de questions non relues. |
| **Prérequis** | Saisir, pour chaque classe et série, la liste des chapitres du programme officiel avant l'ouverture de cette classe aux compétitions. | Sans ce référentiel, les questions ne seraient pas conformes au programme. |

**Reste à confirmer**

1. Les 500 FCFA paient-ils bien **une compétition** (hypothèse retenue) ?
2. Le **coût de génération par IA** : à calculer pour vérifier la marge après les frais de paiement mobile.
3. Les **prix des paliers** (1 000 FCFA pour 150 participants) et l'**offre aux abonnés** (une compétition par trimestre).

## 5. Module 2 : Al\_Muxtaar\_Service (cadrage préliminaire)

**Al\_Muxtaar\_Service** propose des services informatiques et numériques aux particuliers, étudiants, PME et institutions. Catalogue de départ :

| Famille de services | Exemples | Tarification |
| --- | --- | --- |
| **Développement de solutions** | Sites web, applications web et mobiles, logiciels de gestion (stock, caisse, école, clinique), plateformes sur mesure | Devis selon le projet |
| **Maintenance et assistance** | Dépannage et maintenance de PC, installation de systèmes et logiciels, réseaux, sauvegarde et récupération de données, contrats de maintenance mensuels ou annuels | Forfait ou abonnement |
| **Conseil et orientation** | Orientation vers les filières informatiques et numériques, choix du matériel, audit, accompagnement de projets, stratégie digitale | Forfait ou séance |
| **Services d'information et numériques** | Noms de domaine, hébergement, e-mails professionnels, design graphique, sensibilisation à la cybersécurité, formations courtes | Forfait |

Fonctions de base : catalogue des services, fiche service (description, délais, prix), **demande de devis ou de rendez-vous** par formulaire, suivi de chaque demande par statut (reçue, en étude, devis envoyé, en cours, livrée), espace client avec historique et fichiers échangés, gestion des contrats de maintenance et de leurs échéances, gestion par l'admin, facture ou reçu. Utilise **le même compte** que le module Doc.

## 6. Module 3 : Al\_Muxtaar\_Boutique (cadrage préliminaire)

**Al\_Muxtaar\_Boutique** vend des produits informatiques et numériques : ordinateurs et smartphones (neufs ou reconditionnés), accessoires et périphériques (claviers, souris, chargeurs, disques, clés USB), matériel réseau, imprimantes et consommables, licences de logiciels, cartes et abonnements numériques, ainsi que des produits numériques téléchargeables (modèles, e-books, outils).

Fonctions de base : catalogue par catégories et marques avec fiches techniques (caractéristiques, photos, prix, stock), recherche et filtres, panier, commande, paiement mobile (Wave, Orange Money) ou à la livraison, suivi de commande, gestion de la livraison (Dakar et régions, frais par zone), garantie et service après-vente, gestion du stock et des commandes par l'admin, factures et reçus, livraison immédiate des produits numériques après paiement validé.

## 7. Fonctionnalités transversales (communes aux 3 modules)

- **Authentification unique** (un seul compte pour Doc, Service et Boutique).
- **Menu principal** commun avec les trois accès et un espace « Mon compte ».
- **Notifications** : e-mail, SMS et WhatsApp (via l'API WhatsApp Business ou lien direct).
- **Multilingue** : français au départ ; wolof/arabe/anglais en option plus tard.
- **Moteur de recherche** interne (cours, produits, services).
- **Module de paiement unifié** réutilisé par les trois modules.
- **Rôles et permissions** (RBAC) centralisés.
- **Statistiques et rapports** globaux.

## 8. Exigences non fonctionnelles

**Adaptation au contexte sénégalais**

- **Mobile first** : la majorité des élèves utilisent un smartphone.
- **Léger et rapide** même en 3G/4G instable : images compressées, chargement progressif, pas de vidéos lourdes par défaut (vidéos optionnelles en basse qualité).
- **PWA** (installable sur l'écran d'accueil, cache des cours déjà lus pour une consultation partiellement hors ligne).
- Paiements par **mobile money** en priorité.

**Sécurité**

- Mots de passe hachés (Argon2/bcrypt), HTTPS obligatoire, protection CSRF/XSS/injection SQL, limitation des tentatives de connexion.
- **Un compte = un usage personnel** : limite de sessions simultanées (ex. 2 appareils) pour décourager le partage.
- Protection des contenus : pas de bouton de téléchargement, désactivation du clic droit (dissuasion), filigrane discret (nom/téléphone de l'élève) sur les pages de cours.
- Contrôle d'accès **côté serveur** : l'accès aux leçons est vérifié à chaque requête (jamais uniquement côté interface).
- Sauvegardes automatiques quotidiennes de la base de données.

**Performance et fiabilité**

- Chargement d'une page < 3 secondes sur 4G ; disponibilité cible 99 %.
- Prévoir de monter en charge (centaines puis milliers d'élèves simultanés avant les examens).

**Conformité**

- Respect de la **loi sénégalaise sur les données personnelles** (loi n° 2008-12, Commission de Protection des Données Personnelles – CDP) : déclaration, mentions légales, consentement.
- Conditions générales de vente et d'utilisation, politique de remboursement.
- Attention aux **droits d'auteur** : les contenus doivent être originaux ou rédigés par vos soins ; ne pas copier des manuels protégés.

### 8.1 Accès sans connexion pour les abonnés : choix recommandé

Le besoin couvre deux cas : ne pas avoir à se reconnecter à chaque visite, et consulter les cours **sans Internet**. Le meilleur choix pour une plateforme web est une **PWA (Progressive Web App)** : le site s'installe sur l'écran d'accueil et enregistre les cours sur l'appareil, avec une licence qui suit l'abonnement.

| Solution | Fonctionnement | Avantages | Limites |
| --- | --- | --- | --- |
| Cache simple du navigateur | Le navigateur garde les pages déjà visitées | Aucun développement | Vidé sans prévenir, aucun contrôle de l'abonnement |
| **PWA (recommandé)** | Service worker et stockage local (IndexedDB), téléchargement des chapitres choisis | Un seul code web, installable, hors ligne, mises à jour automatiques | Stockage limité selon l'appareil ; sur iPhone, l'installation sur l'écran d'accueil est nécessaire pour un stockage durable |
| Application mobile (Android/iOS, empaquetage du même code) | Le site est livré comme application | Stockage plus fiable, présence sur les stores | Coût, validation des stores, maintenance : à envisager en phase 4 |

Règles de fonctionnement :

1. **Session longue** : l'élève se connecte une fois ; la session reste ouverte (30 à 90 jours) tant que l'abonnement est valide.
2. **Téléchargement par chapitre** : un bouton « Télécharger pour lire hors ligne » stocke texte, formules (KaTeX servi localement), images compressées, exercices et corrigés.
3. **Licence hors ligne signée** : à chaque connexion, le serveur délivre une licence (élève, appareil, date de fin d'abonnement). Sans Internet, l'application la vérifie localement, avec une tolérance (par exemple 7 jours après la dernière vérification en ligne).
4. **Expiration ou suspension** : à la reconnexion, la licence est mise à jour ; si l'abonnement est expiré ou suspendu, les contenus téléchargés sont verrouillés puis supprimés.
5. **Protection** : contenus stockés chiffrés et liés au compte, limite de 2 appareils, protection contre le changement de date de l'appareil (mémorisation de la dernière heure serveur connue). Aucune protection hors ligne n'est absolue : l'objectif est de dissuader.
6. **Synchronisation** : progression, quiz et notes faits hors ligne sont envoyés au retour de la connexion.
7. **Connexion obligatoire** pour l'inscription, la demande d'abonnement et le paiement ; l'activation par l'admin reste inchangée.

**Mise en œuvre par étapes** : MVP = session longue, PWA installable, cache des pages consultées ; étape suivante = téléchargement par chapitre et licence hors ligne.

## 9. Architecture technique proposée

**Principe** : un seul projet (monolithe modulaire) avec trois modules fonctionnels et un noyau commun.

```
al-muxtaar-societe/
 ├── core/        (auth, utilisateurs, rôles, paiements, notifications)
 ├── doc/         (cours, chapitres, quiz, abonnements)
 ├── service/     (catalogue de services, demandes)
 ├── boutique/    (produits, panier, commandes)
 ├── admin/       (back-office global)
 └── public/      (site vitrine, accueil)
```

**Pile technologique recommandée** (une des deux options) :

| Option | Front-end | Back-end | Base de données | Hébergement |
| --- | --- | --- | --- | --- |
| **A – JavaScript/TypeScript** | Next.js (React) + Tailwind CSS | Next.js API / NestJS | PostgreSQL (ex. Supabase) | Vercel + Supabase, ou VPS |
| **B – PHP** | Blade/Livewire + Tailwind | Laravel | MySQL/PostgreSQL | VPS ou hébergement mutualisé |

Outils complémentaires : KaTeX (formules), éditeur riche (TipTap), stockage de fichiers (S3 compatible), file d'attente pour SMS/e-mails, Git pour le versionnage, Sentry pour le suivi des erreurs.

**Hébergement** : un serveur avec bonne latence vers l'Afrique de l'Ouest (ou CDN type Cloudflare), nom de domaine (ex. almuxtaar.com ou .sn), certificat SSL.

## 10. Modèle de données (principales tables)

| Table | Champs principaux |
| --- | --- |
| **users** | id, nom, prénom, téléphone, e-mail, mot de passe, rôle, niveau, série, statut, date de création |
| **levels** | id, nom (Seconde, Première, Terminale) |
| **tracks** | id, level\_id, nom (S1, S2, L…) |
| **subjects** | id, track\_id, nom, icône, ordre |
| **chapters** | id, subject\_id, titre, ordre, statut (brouillon/publié) |
| **lessons** | id, chapter\_id, titre, contenu, type, gratuit (oui/non), ordre |
| **exercises** | id, lesson\_id, énoncé, corrigé, difficulté |
| **quizzes / questions / answers** | liés aux leçons ou chapitres |
| **plans** | id, nom, durée (en mois), prix, portée (matière/pack) |
| **subscriptions** | id, user\_id, plan\_id, statut, début, fin, activé\_par, motif de rejet |
| **payments** | id, subscription\_id, montant, opérateur, n° transaction, preuve, statut |
| **progress** | user\_id, lesson\_id, terminé, score, date |
| **notifications** | user\_id, type, message, lu, date |
| **audit\_logs** | admin\_id, action, cible, date |
| *Modules futurs* | services, service\_requests, products, orders, order\_items, deliveries |

## 11. Parcours utilisateur principal (résumé)

**Élève** : Accueil → Inscription → Choix de la classe/série → Choix de la formule → Paiement + envoi de la preuve → *Attente de validation* → Notification d'activation → Dashboard → Matière Mathématiques → Chapitre → Leçon → Exercices/Quiz → Progression.

**Admin** : Connexion → Demandes en attente → Vérification du paiement → Activation → L'élève est notifié automatiquement.

## 12. Feuille de route (planning indicatif)

| Phase | Contenu | Durée estimée |
| --- | --- | --- |
| **0 – Cadrage** | Validation de ce cahier des charges, charte graphique, maquettes (Figma), choix de la pile technique, nom de domaine | 1–2 semaines |
| **1 – MVP Doc** | Authentification, structure des contenus, lecteur de cours avec formules, abonnement avec activation manuelle, dashboard élève et admin, **3 à 4 chapitres de Maths Terminale S2** | 6–8 semaines |
| **2 – Contenu et test** | Rédaction de tous les chapitres de Maths S2, quiz, test pilote avec 20–50 élèves, corrections | 4–6 semaines |
| **3 – Lancement** | Mise en ligne, communication (WhatsApp, TikTok, écoles), suivi des retours | 2 semaines |
| **4 – Extension Doc** | Paiement automatique, nouvelles matières (Physique-Chimie, SVT), puis Terminale S1, Première, Seconde | continu |
| **5 – Service** | Développement du module Service | 4–6 semaines |
| **6 – Boutique** | Développement du module Boutique | 6–8 semaines |

**Définition du MVP (indispensable pour le lancement)** : inscription/connexion, catalogue, lecteur de cours avec formules, demande d'abonnement, activation par l'admin, accès conditionné à l'abonnement, expiration automatique, session longue et PWA installable (accès sans reconnexion), gestion des contenus par l'admin.

## 13. Production du contenu pédagogique

Le contenu est le cœur de la valeur. Prévoir :

- Un **gabarit unique de leçon** : objectifs → rappels → cours → méthodes → exemples → exercices → quiz → résumé.
- Une équipe de **rédacteurs/enseignants** de Maths S2 avec relecture.
- Un rythme de publication (ex. 1 chapitre complet par semaine).
- Une **charte de qualité** : exactitude, conformité au programme, clarté, corrigés détaillés.

## 14. Modèle économique et indicateurs

- Revenus : abonnements (700 F/mois ou 2 000 F/3 mois), puis services et boutique.
- **Exemple** : 500 abonnés sur 3 mois = 1 000 000 FCFA de revenus ; frais de paiement mobile à prévoir (≈ 1 à 3 %).
- Indicateurs : inscrits, taux de conversion en abonnés, taux de renouvellement, leçons les plus consultées, abandon par chapitre, revenu mensuel, coût d'acquisition.
- Marketing : essais gratuits, parrainage, partenariats avec lycées et professeurs, communication avant les compositions et le BAC, offres promotionnelles saisonnières (rentrée, révisions BAC).

## 15. Risques et solutions

| Risque | Solution |
| --- | --- |
| Partage de comptes entre élèves | Limite de sessions, filigrane, détection d'usage anormal |
| Copie/diffusion des cours | Filigrane, pas de téléchargement, mentions légales |
| Retard de validation des paiements | Notifications aux admins, plusieurs gestionnaires, puis paiement automatique |
| Connexion Internet faible | Pages légères, PWA, cache |
| Manque de contenu au lancement | Lancement progressif chapitre par chapitre, avec avertissement clair |
| Fraude (fausses preuves de paiement) | Vérification de la transaction sur le relevé du compte marchand |
| Dépendance à une seule personne | Documentation, sauvegardes, code versionné |

## 16. Livrables attendus

1. Maquettes (wireframes et design) validées
2. Application web fonctionnelle (module Doc)
3. Back-office administrateur
4. Contenu de Maths Terminale S2
5. Documentation technique et guide d'utilisation admin
6. Conditions générales d'utilisation et politique de confidentialité

## 17. Questions ouvertes à trancher

1. Le prix de 700 / 2 000 FCFA est-il **par matière** ou **pour toutes les matières** de la classe ?
2. Y aura-t-il des **leçons gratuites** pour attirer les élèves ?
3. Quels **moyens de paiement** au démarrage (Wave, Orange Money, Free Money) et quels numéros officiels ?
4. Qui **rédige les cours** (vous, des enseignants partenaires) ?
5. Les cours seront-ils en **texte et formules**, avec ou sans **vidéos** ?
6. Quelles sont vos préférences de **technologie** (Next.js ou Laravel) et votre **budget d'hébergement** ?
7. Faut-il prévoir un **espace parent** et une **application mobile** à terme ?
8. Quel **nom de domaine** souhaitez-vous (almuxtaar.com, almuxtaar.sn) ?
9. Doit-on prévoir des **codes promo, parrainages ou tarifs pour établissements** ?

## 18. Prochaine étape recommandée

Valider les points de la section 17, puis passer à la **création des maquettes** et à la **mise en place du projet** (structure du dépôt, base de données, authentification, puis module Al\_Muxtaar\_Doc).
