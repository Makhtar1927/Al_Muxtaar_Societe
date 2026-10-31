-- Migration initiale du projet Al_Muxtaar_Société
-- Ce fichier servira de point d'ancrage pour les futures migrations du schéma complet en P5.

-- Extension uuid-ossp pour la génération d'identifiants uniques
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Extension pgcrypto pour les fonctionnalités cryptographiques
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

