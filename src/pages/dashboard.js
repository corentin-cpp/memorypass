import Link from "next/link";
import { useState } from "react";
import {
  LockKeyhole,
  Search,
  FilePlus,
  LogOut,
  Home,
  Menu,
  X,
  RefreshCcw,
  Eye,
  SearchCheck,
} from "lucide-react";
import { Button } from "@/components/Button";
import { supabase } from "@/lib/supbaseClient";
import { useAuth } from '@/lib/AuthProvider';
import { useEffect } from "react";
import PasswordInput from "@/components/PasswordInput";
import SearchPasswords from "@/components/SearchPasswords";

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, loading } = useAuth();
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    if (loading) return; // Attendre que la session utilisateur soit chargée

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabase
        .from("passwords")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Erreur lors de la récupération des mots de passe :", error);
      } else {
        setPasswords(data);
      }
    };

    fetchData();
  }, [user, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white">
      {/* Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 bg-zinc-950 shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-4 text-purple-400">MemoryPass</h2>
        <nav className="space-y-2">
          <Link href="/dashboard" className="flex items-center gap-2 hover:text-purple-400">
            <Home size={18} /> Accueil
          </Link>
          <Link href="/password" className="flex items-center gap-2 hover:text-purple-400">
            <FilePlus size={18} /> Générateur
          </Link>
          <Link href="/vault" className="flex items-center gap-2 hover:text-purple-400">
            <LockKeyhole size={18} /> Coffre-fort
          </Link>
          <Link href="/search" className="flex items-center gap-2 hover:text-purple-400">
            <Search size={18} /> Recherche
          </Link>
          <Link href="/logout" className="flex items-center gap-2 hover:text-purple-400">
            <LogOut size={18} /> Déconnexion
          </Link>
        </nav>
      </aside>

      {/* Mobile sidebar */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="bg-zinc-800 p-2 rounded-xl"
        >
          {mobileOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {mobileOpen && (
        <div className="md:hidden fixed top-0 left-0 w-64 h-full bg-zinc-950 p-6 z-40 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-purple-400">MemoryPass</h2>
          <nav className="space-y-4">
            <Link href="/dashboard" className="block hover:text-purple-400">Accueil</Link>
            <Link href="/password" className="block hover:text-purple-400">Générateur</Link>
            <Link href="/vault" className="block hover:text-purple-400">Coffre-fort</Link>
            <Link href="/search" className="block hover:text-purple-400">Recherche</Link>
            <Link href="/logout" className="block hover:text-purple-400">Déconnexion</Link>
          </nav>
        </div>
      )}

      {/* Contenu principal */}
      <main className="flex-1 px-6 py-10 space-y-12 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white">Bienvenue sur votre espace sécurisé</h1>

        {/* Raccourcis */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Link href="/password" className="bg-purple-600 hover:bg-purple-700 p-6 rounded-xl shadow-md text-center font-semibold flex items-center justify-center">
            <RefreshCcw size={24} className="m-2" />
            Générer un mot de passe
          </Link>
          <Link href="/vault" className="bg-indigo-600 hover:bg-indigo-700 p-6 rounded-xl shadow-md text-center font-semibold flex items-center justify-center">
            <Eye size={24} className="m-2" />
            Voir mes comptes
          </Link>
          <Link href="/search" className="bg-pink-600 hover:bg-pink-700 p-6 rounded-xl shadow-md text-center font-semibold flex items-center justify-center">
            <SearchCheck size={24} className="m-2" />
            Rechercher un identifiant
          </Link>
        </div>

        {/* Aperçu comptes récents */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Derniers comptes ajoutés</h2>
          <SearchPasswords />
        </div>
        {/* Aperçu Connexion */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Historiques des connexions</h2>
          
        </div>
      </main>
    </div>
  );
}
