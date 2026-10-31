import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-4 text-center">
      <div className="rounded-2xl border border-surface-muted bg-white p-8 shadow-card sm:p-12 max-w-md w-full">
        <span className="text-5xl font-black text-turquoise">404</span>
        <h1 className="mt-4 text-2xl font-bold text-navy">Page introuvable</h1>
        <p className="mt-2 text-sm text-navy-light">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex h-11 w-full items-center justify-center rounded-2xl bg-turquoise px-4 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-turquoise-hover"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

