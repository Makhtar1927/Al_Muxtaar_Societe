import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-surface-muted bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/assets/logo/logo.png"
              alt="Logo Al Muxtaar"
              width={42}
              height={42}
              className="h-10 w-auto object-contain"
              priority
            />
            <span className="text-lg font-bold tracking-tight text-navy">
              Al Muxtaar <span className="text-turquoise text-sm font-semibold uppercase">Société</span>
            </span>
          </Link>
          <nav className="flex items-center gap-3">
            <Link
              href="/connexion"
              className="inline-flex h-11 items-center justify-center rounded-2xl border border-navy/15 px-4 text-sm font-semibold text-navy transition-colors hover:bg-surface"
            >
              Connexion
            </Link>
            <Link
              href="/inscription"
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-turquoise px-4 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-turquoise-hover"
            >
              S&apos;inscrire
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="mx-auto max-w-5xl px-4 py-12 text-center sm:py-16">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-turquoise-light px-3.5 py-1 text-xs font-semibold text-turquoise">
            <span className="h-2 w-2 rounded-full bg-turquoise animate-pulse" />
            Programme Officiel du Sénégal
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-navy sm:text-5xl">
            L&apos;apprentissage d&apos;excellence, <br className="hidden sm:inline" />
            accessible à chaque élève sénégalais.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-navy-light sm:text-lg">
            Des cours interactifs, exercices d&apos;application corrigés et quiz conformes au programme scolaire national.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/doc"
              className="inline-flex h-12 items-center justify-center rounded-2xl bg-turquoise px-6 text-base font-bold text-white shadow-hover transition-all hover:bg-turquoise-hover"
            >
              Découvrir Al_Muxtaar_Doc
            </Link>
            <Link
              href="/doc/tarifs"
              className="inline-flex h-12 items-center justify-center rounded-2xl border border-navy/20 bg-white px-6 text-base font-semibold text-navy transition-all hover:bg-surface"
            >
              Tarifs (Dès 700 FCFA)
            </Link>
          </div>
        </section>

        {/* 3 Modules Cards */}
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <h2 className="mb-6 text-center text-xl font-bold text-navy sm:text-2xl">
            L&apos;Écosystème Al Muxtaar
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Module 1 : Doc */}
            <div className="relative flex flex-col justify-between rounded-2xl border-2 border-turquoise/30 bg-white p-6 shadow-card">
              <div>
                <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-turquoise-light px-2.5 py-0.5 text-xs font-bold text-turquoise">
                  Actif — Phase 1
                </div>
                <h3 className="text-xl font-bold text-navy">Al_Muxtaar_Doc</h3>
                <p className="mt-2 text-sm text-navy-light">
                  Plateforme éducative pour réviser le Baccalauréat et progresser à son rythme.
                  Commence par la <strong>Terminale S2 en Mathématiques</strong>.
                </p>
              </div>
              <div className="mt-6">
                <Link
                  href="/doc"
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-turquoise py-2.5 text-sm font-semibold text-white transition-colors hover:bg-turquoise-hover"
                >
                  Accéder aux cours
                </Link>
              </div>
            </div>

            {/* Module 2 : Service */}
            <div className="relative flex flex-col justify-between rounded-2xl border border-surface-muted bg-white p-6 opacity-85 shadow-card">
              <div>
                <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-surface-muted px-2.5 py-0.5 text-xs font-semibold text-navy-light">
                  Bientôt disponible — Phase 2
                </div>
                <h3 className="text-xl font-bold text-navy">Al_Muxtaar_Service</h3>
                <p className="mt-2 text-sm text-navy-light">
                  Solutions informatiques professionnelles : développement web et mobile, maintenance de parc et conseil d&apos;orientation.
                </p>
              </div>
              <div className="mt-6">
                <span className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-2xl bg-surface-muted py-2.5 text-sm font-semibold text-navy-light">
                  En préparation
                </span>
              </div>
            </div>

            {/* Module 3 : Boutique */}
            <div className="relative flex flex-col justify-between rounded-2xl border border-surface-muted bg-white p-6 opacity-85 shadow-card">
              <div>
                <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-surface-muted px-2.5 py-0.5 text-xs font-semibold text-navy-light">
                  Bientôt disponible — Phase 3
                </div>
                <h3 className="text-xl font-bold text-navy">Al_Muxtaar_Boutique</h3>
                <p className="mt-2 text-sm text-navy-light">
                  Vente de matériels et consommables informatiques de qualité, avec livraison rapide partout au Sénégal.
                </p>
              </div>
              <div className="mt-6">
                <span className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-2xl bg-surface-muted py-2.5 text-sm font-semibold text-navy-light">
                  En préparation
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-muted bg-white py-8 text-center text-xs text-navy-light">
        <div className="mx-auto max-w-6xl px-4">
          <p>© {new Date().getFullYear()} Al Muxtaar Société — Tous droits réservés.</p>
          <p className="mt-1">Dakar, Sénégal · Conforme aux recommandations pédagogiques officielles.</p>
        </div>
      </footer>
    </div>
  );
}

