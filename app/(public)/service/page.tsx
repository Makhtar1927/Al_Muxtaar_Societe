import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { WhatsAppLogo } from "@/components/ui/icons/whatsapp-logo";
import {
  DevSolutionsIllustration,
  SchoolManagementIllustration,
  NetworkMaintenanceIllustration,
  CloudSecurityIllustration,
  AuditConsultingIllustration,
} from "@/components/service/service-interactive-illustrations";

export const metadata: Metadata = {
  title: "Al_Muxtaar_Service | Ingénierie Logicielle & Solutions Digitales au Sénégal",
  description:
    "Développement d'applications web & mobiles, plateformes de gestion scolaire, audit, maintenance, hébergement et conseil numérique à Dakar et dans tout le Sénégal.",
};

const SERVICES = [
  {
    id: "dev",
    accent: "gold",
    icon: "developpement",
    label: "Développement Sur-Mesure",
    tagline: "Sites web · Applications · Logiciels métier · SaaS",
    description:
      "Nous concevons des plateformes web et mobiles 100 % adaptées aux réalités africaines — réseaux 4G/3G, faible débit, mobile-first. De la landing page au système de gestion complet : ERP, CRM, portail élève, caisse, stock, clinique.",
    points: [
      "Sites vitrine & e-commerce optimisés pour mobiles",
      "Applications PWA installables (sans App Store)",
      "Plateformes SaaS multi-utilisateurs avec rôles",
      "Intégration paiement Wave & Orange Money",
      "Logiciels de gestion (école, stock, caisse, clinique)",
      "API REST & microservices scalables",
    ],
    illustration: DevSolutionsIllustration,
    illustrationLeft: false,
  },
  {
    id: "school",
    accent: "turquoise",
    icon: "cours",
    label: "Gestion Scolaire & ERP Éducatif",
    tagline: "Lycées · Collèges · Instituts supérieurs",
    description:
      "Notre solution de gestion scolaire couvre l'ensemble du cycle de vie d'un établissement : inscription en ligne, gestion des classes, notes, bulletins conformes MEN/IGEF, emplois du temps, présences, paiements de scolarité et notifications automatiques aux parents.",
    points: [
      "Inscriptions & dossiers élèves numériques",
      "Saisie & calcul automatique des moyennes",
      "Génération de bulletins conformes programme national",
      "Suivi des paiements de scolarité avec alertes parents",
      "Emploi du temps & gestion des salles",
      "SMS & WhatsApp automatiques parents / enseignants",
    ],
    illustration: SchoolManagementIllustration,
    illustrationLeft: true,
  },
  {
    id: "network",
    accent: "navy",
    icon: "maintenance",
    label: "Réseaux, Parcs & Maintenance Informatique",
    tagline: "Installation · Assistance · Contrats de maintenance",
    description:
      "Nous déployons et maintenons votre infrastructure informatique de A à Z : câblage réseau, switch, Wi-Fi sécurisé, onduleurs, et maintenance préventive et curative de vos postes et serveurs. Nos techniciens interviennent à Dakar et dans les régions.",
    points: [
      "Câblage structuré LAN/WAN pour salles informatiques",
      "Installation & configuration routeurs, Wi-Fi 6 & bornes AP",
      "Contrats de maintenance préventive mensuels ou annuels",
      "Dépannage & remplacement de composants urgents",
      "Installation systèmes (Windows, Ubuntu, logiciels)",
      "Récupération de données après panne ou effacement",
    ],
    illustration: NetworkMaintenanceIllustration,
    illustrationLeft: false,
  },
  {
    id: "cloud",
    accent: "coral",
    icon: "securite",
    label: "Cloud, Hébergement & Domaines",
    tagline: "Noms de domaine .SN · Messagerie pro · Sauvegarde",
    description:
      "Donnez une présence professionnelle à votre organisation : nom de domaine sénégalais (.sn) ou international (.com, .org), hébergement haute disponibilité, messagerie e-mail professionnelle sécurisée, sauvegarde cloud automatique et protection contre les cyberattaques.",
    points: [
      "Enregistrement noms de domaine .sn (NIC Sénégal) & .com",
      "Hébergement cloud infogéré (uptime 99,9 %)",
      "Messagerie pro @votre-nom.sn avec anti-spam & SSL",
      "Sauvegarde automatique quotidienne chiffrée AES-256",
      "Certificats SSL/TLS & configuration HTTPS",
      "Protection pare-feu anti-DDoS & monitoring 24/7",
    ],
    illustration: CloudSecurityIllustration,
    illustrationLeft: true,
  },
  {
    id: "audit",
    accent: "gold",
    icon: "orientation",
    label: "Conseil, Audit & Formation",
    tagline: "Stratégie digitale · Audit SI · Orientation tech",
    description:
      "Avant de coder, nous analysons vos vrais besoins. Notre équipe réalise un audit de votre système d'information, propose une feuille de route claire, puis forme vos équipes à l'autonomie. Nous accompagnons aussi les bacheliers dans le choix de leur filière informatique.",
    points: [
      "Audit du système d'information (sécurité, performance)",
      "Conseil en transformation numérique & stratégie digitale",
      "Choix & achat de matériel informatique (meilleur rapport qualité-prix)",
      "Sensibilisation à la cybersécurité (phishing, ransomware)",
      "Formations courtes : bureautique, CMS, tableur, cybersécurité",
      "Orientation des bacheliers vers les filières tech (IA, Dév, Réseau)",
    ],
    illustration: AuditConsultingIllustration,
    illustrationLeft: false,
  },
] as const;

const ACCENT_COLORS: Record<string, { badge: string; border: string; dot: string; text: string }> = {
  gold: {
    badge: "bg-gold-light text-[#8A5A00] border-gold/30",
    border: "border-gold",
    dot: "bg-gold",
    text: "text-gold",
  },
  turquoise: {
    badge: "bg-turquoise-light text-[#005F58] border-turquoise/30",
    border: "border-turquoise",
    dot: "bg-turquoise",
    text: "text-turquoise",
  },
  navy: {
    badge: "bg-navy/10 text-navy border-navy/20",
    border: "border-navy",
    dot: "bg-navy",
    text: "text-navy",
  },
  coral: {
    badge: "bg-coral-light text-[#8A2A1E] border-coral/30",
    border: "border-coral",
    dot: "bg-coral",
    text: "text-coral",
  },
};

const QUICK_STATS = [
  { value: "5+", label: "Projets livrés" },
  { value: "Dakar +", label: "Régions du Sénégal" },
  { value: "24h", label: "Délai de réponse devis" },
  { value: "100%", label: "Satisfaction client" },
];

export default function ServicePage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_SUPPORT || "221770000000";
  const whatsappBase = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Bonjour Al Muxtaar Service, je souhaite obtenir un devis / des informations sur votre service :"
  )}`;

  return (
    <div className="space-y-20 py-8 sm:py-14">

      {/* ══════════════════════════════════════════════════════════
          HERO : Pôle Service
      ══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center space-y-6">
          {/* Pastille identité */}
          <div className="inline-flex items-center gap-2 rounded-full bg-gold-light px-4 py-1.5 text-xs font-black text-[#8A5A00] border border-gold/30">
            <Icon name="service" size={16} />
            AL_MUXTAAR_SERVICE — PÔLE INGÉNIERIE &amp; SOLUTIONS NUMÉRIQUES
          </div>

          <h1 className="text-3xl font-black tracking-tight text-navy sm:text-5xl lg:text-6xl leading-tight">
            Solutions logicielles &amp; services IT<br className="hidden sm:inline" />
            <span className="text-gold"> conçus pour le Sénégal</span>.
          </h1>

          <p className="mx-auto max-w-3xl text-base text-navy-light sm:text-lg leading-relaxed">
            Al_Muxtaar_Service accompagne les établissements scolaires, entreprises, PME et institutions
            dans la conception, le déploiement et la maintenance de leurs outils numériques —
            du site web à la gestion scolaire complète, en passant par la maintenance de réseaux et le conseil stratégique.
          </p>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-2">
            {QUICK_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-surface border border-navy/8 p-4 text-center"
              >
                <span className="block text-2xl font-black text-gold">{stat.value}</span>
                <span className="block text-xs text-navy-light mt-1 font-medium">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* CTAs principaux */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a href={whatsappBase} target="_blank" rel="noopener noreferrer">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto font-black shadow-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white border-0 gap-2"
              >
                <WhatsAppLogo size={22} />
                Devis gratuit sur WhatsApp
              </Button>
            </a>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto font-bold">
                Formulaire de contact →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          LES 5 SERVICES DÉTAILLÉS (alternance gauche/droite)
      ══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 space-y-20">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">
            Nos 5 domaines de compétences
          </span>
          <h2 className="text-2xl font-black text-navy sm:text-3xl">
            Des services complets, de la stratégie à la mise en production
          </h2>
        </div>

        {SERVICES.map((service, idx) => {
          const colors = ACCENT_COLORS[service.accent];
          const Illustration = service.illustration;
          const wa = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            `Bonjour Al Muxtaar Service, je suis intéressé par votre service "${service.label}" :`
          )}`;

          return (
            <div
              key={service.id}
              className={`grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14 items-center ${
                service.illustrationLeft ? "lg:[direction:rtl]" : ""
              }`}
            >
              {/* Illustration côté */}
              <div className="lg:[direction:ltr]">
                <Illustration />
              </div>

              {/* Texte côté */}
              <div className="lg:[direction:ltr] space-y-5">
                {/* Numéro + Badge service */}
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-navy/20 text-sm font-black text-navy-light">
                    0{idx + 1}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-wider ${colors.badge}`}>
                    <Icon name={service.icon} size={14} />
                    {service.label}
                  </span>
                </div>

                {/* Titre & Tagline */}
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-black text-navy leading-snug">
                    {service.label}
                  </h3>
                  <p className={`text-xs font-bold uppercase tracking-wider ${colors.text}`}>
                    {service.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-navy-light leading-relaxed">
                  {service.description}
                </p>

                {/* Ce qui est inclus */}
                <div className="rounded-2xl bg-surface border border-navy/8 p-4 space-y-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-navy/60 block">
                    Ce qui est inclus :
                  </span>
                  <ul className="space-y-1.5">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-xs text-navy-light">
                        <span className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${colors.dot}`} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA secondaire */}
                <a href={wa} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`font-bold border-2 gap-2 ${colors.border} hover:bg-opacity-10`}
                  >
                    <WhatsAppLogo size={16} />
                    Demander un devis pour ce service
                  </Button>
                </a>
              </div>
            </div>
          );
        })}
      </section>

      {/* ══════════════════════════════════════════════════════════
          PROCESSUS DE TRAVAIL EN 4 ÉTAPES
      ══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl bg-navy p-8 sm:p-12 text-white space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-gold/80">
              Notre méthode de travail
            </span>
            <h2 className="text-2xl font-black sm:text-3xl">
              De votre idée à la mise en ligne en 4 étapes claires
            </h2>
            <p className="text-sm text-white/70 max-w-2xl mx-auto">
              Pas de jargon technique inutile — un processus transparent, avec des livrables
              définis et un calendrier respecté.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                title: "Consultation & Analyse",
                desc: "Réunion de cadrage gratuite (présentiel ou WhatsApp) pour comprendre vos besoins, votre budget et vos délais.",
                color: "text-gold",
                bg: "bg-gold/10 border-gold/30",
              },
              {
                num: "02",
                title: "Proposition & Devis",
                desc: "Remise d'un devis détaillé sous 24h : cahier des charges, technologies proposées, planning et prix TTC.",
                color: "text-turquoise",
                bg: "bg-turquoise/10 border-turquoise/30",
              },
              {
                num: "03",
                title: "Développement & Livrables",
                desc: "Développement itératif avec démonstrations régulières. Vous suivez l'avancement en temps réel.",
                color: "text-white",
                bg: "bg-white/10 border-white/20",
              },
              {
                num: "04",
                title: "Déploiement & Support",
                desc: "Mise en ligne, formation de vos équipes et support post-lancement inclus pendant 30 jours.",
                color: "text-emerald-400",
                bg: "bg-emerald-500/10 border-emerald-500/30",
              },
            ].map((step) => (
              <div
                key={step.num}
                className={`rounded-2xl border p-5 space-y-3 ${step.bg}`}
              >
                <span className={`text-3xl font-black ${step.color}`}>{step.num}</span>
                <h4 className="text-sm font-black text-white">{step.title}</h4>
                <p className="text-xs text-white/70 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FAQ RAPIDE
      ══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">
            Questions fréquentes
          </span>
          <h2 className="text-2xl font-black text-navy sm:text-3xl">
            Ce que vous voulez savoir avant de nous contacter
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "Intervenez-vous en dehors de Dakar ?",
              a: "Oui. Nous intervenons dans toutes les régions du Sénégal. Pour les projets de maintenance ou d'installation réseau, nous nous déplaçons sur place. Les projets de développement sont majoritairement pilotés à distance.",
            },
            {
              q: "Quel est le délai moyen pour un site web professionnel ?",
              a: "Un site vitrine est livré en 5 à 10 jours ouvrés après validation du design. Une plateforme de gestion scolaire complète nécessite 4 à 8 semaines selon le cahier des charges.",
            },
            {
              q: "Acceptez-vous le paiement par Wave ou Orange Money ?",
              a: "Absolument. Nous acceptons Wave, Orange Money, virement bancaire et espèces. Un acompte de 30 % est demandé à la commande, le solde à la livraison.",
            },
            {
              q: "Proposez-vous une maintenance après livraison ?",
              a: "Oui. Nous proposons des contrats de maintenance mensuels ou annuels incluant les mises à jour, la surveillance de disponibilité, les sauvegardes automatiques et le support technique prioritaire.",
            },
            {
              q: "Puis-je voir des exemples de réalisations ?",
              a: "Al_Muxtaar_Doc (cette plateforme) est l'une de nos propres réalisations. Contactez-nous sur WhatsApp pour accéder à notre portfolio complet.",
            },
          ].map((faq) => (
            <div
              key={faq.q}
              className="rounded-2xl border border-navy/8 bg-surface p-5 space-y-2"
            >
              <h4 className="text-sm font-black text-navy flex items-start gap-2">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
                {faq.q}
              </h4>
              <p className="text-xs text-navy-light leading-relaxed pl-4">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CTA FINAL
      ══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-navy-dark to-navy p-8 sm:p-14 text-center text-white shadow-2xl">
          {/* Décorations */}
          <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-gold/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-turquoise/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <Icon name="service" size={52} className="mx-auto opacity-90" />
            <h2 className="text-2xl font-black sm:text-4xl leading-tight">
              Vous avez un projet numérique ?<br />
              <span className="text-gold">Discutons-en dès aujourd&apos;hui.</span>
            </h2>
            <p className="mx-auto max-w-xl text-sm text-white/80 leading-relaxed">
              Notre équipe d&apos;ingénieurs et techniciens vous propose un diagnostic gratuit
              et un devis clair et détaillé, sans engagement, sous 24 heures.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a href={whatsappBase} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="primary"
                  size="lg"
                  className="font-black bg-[#25D366] hover:bg-[#1EBE5D] text-white border-0 shadow-lg gap-2"
                >
                  <WhatsAppLogo size={22} />
                  Lancer une discussion WhatsApp
                </Button>
              </a>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="font-bold bg-white text-navy border-white hover:bg-white/90"
                >
                  Formulaire de contact
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
