import { Button } from "@/components/Button";
import { Geist, Geist_Mono } from "next/font/google";
import { LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white font-sans">
      <main className="px-6 py-20 text-center max-w-4xl mx-auto">
        <h2 className="text-5xl font-extrabold mb-6 leading-tight">
          Protégez vos mots de passe.<br />
          En toute simplicité.
        </h2>
        <p className="text-xl text-gray-300 mb-10">
          MemoryPass est votre coffre-fort numérique : sécurisé, simple et privé.
          Gardez le contrôle sur vos informations sensibles sans effort.
        </p>
        <Button className="text-lg bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-full font-semibold">
          Créer un compte gratuit
        </Button>

        <div className="mt-24 grid gap-12 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <ShieldCheck className="w-12 h-12 mb-4 text-green-400" />
            <h3 className="text-xl font-semibold mb-2">Sécurité renforcée</h3>
            <p className="text-gray-400">
              Vos données sont chiffrées de bout en bout avec des standards de sécurité de niveau militaire.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <Sparkles className="w-12 h-12 mb-4 text-yellow-300" />
            <h3 className="text-xl font-semibold mb-2">Interface intuitive</h3>
            <p className="text-gray-400">
              Une application pensée pour tous : rapide, fluide et agréable à utiliser au quotidien.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <LockKeyhole className="w-12 h-12 mb-4 text-blue-400" />
            <h3 className="text-xl font-semibold mb-2">Confidentialité totale</h3>
            <p className="text-gray-400">
              Aucune collecte de données : vous êtes l&apos;unique détenteur de vos mots de passe.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
