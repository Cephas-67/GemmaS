import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center space-y-4">
        <p className="font-mono text-sm uppercase tracking-widest text-brand-orange">
          404
        </p>
        <h1 className="font-display text-4xl font-bold">Page introuvable</h1>
        <Link
          href="/"
          className="inline-block text-brand-blue underline-offset-4 hover:underline"
        >
          Retour à l'accueil
        </Link>
      </div>
    </main>
  );
}
