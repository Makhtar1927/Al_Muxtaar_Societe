import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { WaveLogo } from "@/components/ui/icons/wave-logo";
import { WhatsAppLogo } from "@/components/ui/icons/whatsapp-logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-surface-muted bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Logo size="md" />
            <p className="text-xs text-navy-light leading-relaxed">
              La plateforme éducative et technologique de référence au Sénégal. Conforme aux programmes officiels.
            </p>
            <p className="text-xs font-medium text-navy">Dakar, Sénégal</p>
          </div>

          {/* Module Al_Muxtaar_Doc */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-navy uppercase tracking-wider">
              Al_Muxtaar_Doc
            </h4>
            <ul className="space-y-2 text-sm text-navy-light">
              <li>
                <Link href="/doc" className="hover:text-turquoise transition-colors">
                  Présentation de la plateforme
                </Link>
              </li>
              <li>
                <Link href="/doc/catalogue" className="hover:text-turquoise transition-colors">
                  Catalogue national (4 Niveaux)
                </Link>
              </li>
              <li>
                <Link href="/cours/terminale/s2/mathematiques" className="hover:text-turquoise transition-colors">
                  Tle S2 Maths — Module Actif (13 Chapitres)
                </Link>
              </li>
              <li>
                <Link href="/doc/tarifs" className="hover:text-turquoise transition-colors">
                  Formules &amp; Tarifs
                </Link>
              </li>
              <li>
                <Link href="/abonnement" className="inline-flex items-center gap-1.5 hover:text-turquoise transition-colors font-medium">
                  <WaveLogo size={14} />
                  <span>S&apos;abonner (Wave Money)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Écosystème & Modules */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-navy uppercase tracking-wider">
              Écosystème
            </h4>
            <ul className="space-y-2 text-sm text-navy-light">
              <li>
                <Link href="/service" className="hover:text-turquoise transition-colors">
                  Al_Muxtaar_Service (Ingénierie)
                </Link>
              </li>
              <li>
                <Link href="/boutique" className="hover:text-turquoise transition-colors">
                  Al_Muxtaar_Boutique (Matériels)
                </Link>
              </li>
              <li>
                <span className="text-navy-light/60 cursor-not-allowed">
                  Génie en Herbe (Compétitions)
                </span>
              </li>
            </ul>
          </div>

          {/* Assistance & Légal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-navy uppercase tracking-wider">
              Support & Légal
            </h4>
            <ul className="space-y-2 text-sm text-navy-light">
              <li>
                <Link href="/faq" className="hover:text-turquoise transition-colors">
                  Questions fréquentes (FAQ)
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/221772476926?text=Bonjour%20Al%20Muxtaar,%20j'ai%20une%20question%20concernant%20la%20plateforme."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-turquoise transition-colors font-medium text-emerald-700"
                >
                  <WhatsAppLogo size={14} />
                  <span>Assistance WhatsApp (+221 77 247 69 26)</span>
                </a>
              </li>
              <li>
                <Link href="/conditions" className="hover:text-turquoise transition-colors">
                  Conditions Générales
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="hover:text-turquoise transition-colors">
                  Protection des données (CDP)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-surface-muted pt-8 text-center sm:flex sm:justify-between sm:text-left">
          <p className="text-xs text-navy-light">
            © {currentYear} Al Muxtaar Société. Tous droits réservés.
          </p>
          <p className="mt-2 text-xs text-navy-light sm:mt-0">
            Conçu pour le réseau scolaire sénégalais (optimisé mobile 3G/4G).
          </p>
        </div>
      </div>
    </footer>
  );
}

