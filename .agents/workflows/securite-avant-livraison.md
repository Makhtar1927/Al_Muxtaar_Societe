# Contrôle de sécurité avant livraison

1. Liste toutes les routes et tables, et pour chacune qui peut lire, écrire, modifier, supprimer.
2. Vérifie que chaque table a des politiques RLS et teste avec : visiteur, élève sans abonnement, élève abonné, admin.
3. Cherche des secrets dans le code et l'historique Git.
4. Vérifie la validation des entrées (zod) sur chaque formulaire et chaque route API.
5. Vérifie les en-têtes de sécurité et la limitation des tentatives de connexion.
6. Produis un rapport : problème, gravité, correction proposée. Corrige après mon accord.
