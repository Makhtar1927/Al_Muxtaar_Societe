import Link from "next/link";
import { Logo } from "@/components/ui/logo";

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
            <p className="text-xs font-medium text-navy">Dakar, Sénégal 🇸🇳</p>
          </div>

          {/* Module Al_Muxtaar_Doc */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-navy uppercase tracking-wider">
              Al_Muxtaar_Doc
            </h4>
            <ul className="space-y-2 text-sm text-navy-light">
              <li>
                <Link href="/doc" className="hover:text-turquoise transition-colors">
                  Présentation des cours
                </Link>
              </li>
              <li>
                <Link href="/doc/catalogue" className="hover:text-turquoise transition-colors">
                  Catalogue Terminale S2
                </Link>
              </li>
              <li>
                <Link href="/doc/tarifs" className="hover:text-turquoise transition-colors">
                  Formules & Tarifs
                </Link>
              </li>
              <li>
                <Link href="/abonnement" className="hover:text-turquoise transition-colors">
                  S&apos;abonner (Wave / Orange Money)
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
                <span className="text-navy-light/60 cursor-not-allowed">
                  Al_Muxtaar_Service (Phase 2)
                </span>
              </li>
              <li>
                <span className="text-navy-light/60 cursor-not-allowed">
                  Al_Muxtaar_Boutique (Phase 3)
                </span>
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
                <Link href="/contact" className="hover:text-turquoise transition-colors">
                  Assistance WhatsApp
                </Link>
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

