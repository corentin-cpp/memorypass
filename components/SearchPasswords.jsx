import { useState } from "react";
import { Button } from "@/components/button";
import { Eye, Search } from "lucide-react";
import { supabase } from "@/lib/supbaseClient";
import { useAuth } from '@/lib/AuthProvider';
import { useEffect } from "react";
import PasswordInput from "@/components/PasswordInput";

export default function SearchPasswords() {
    const { user, loading } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
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

        if (loading) {
            return (
                <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white">
                    <p>Chargement...</p>
                </div>
            );
        }

        fetchData();
    }, [user, loading]);

    const filteredPasswords = passwords.filter((item) => {
        const name = typeof item.name === "string" ? item.name.toLowerCase() : "";
        const username = typeof item.username === "string" ? item.username.toLowerCase() : "";
        const url = typeof item.url === "string" ? item.url.toLowerCase() : "";
        const query = searchQuery.toLowerCase();

        return name.includes(query) || username.includes(query) || url.includes(query);
    });

    return (
        <div className="">
          <div className="">
            <h1 className="text-3xl font-bold mb-6 text-center">🔍 Rechercher un mot de passe</h1>
    
            {/* Barre de recherche */}
            <div className="flex items-center gap-2 mb-10">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par nom, identifiant ou site..."
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Button className="bg-purple-600 hover:bg-purple-700 p-3 rounded-lg">
                <Search size={20} />
              </Button>
            </div>
    
            {/* Résultats */}
            {filteredPasswords.length > 0 ? (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredPasswords.map((password) => (
            <div
              key={password.id}
              className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-xl hover:shadow-2xl transition"
            >
              <h2 className="text-lg font-semibold mb-1">{password.name}</h2>
              <p className="text-sm text-gray-300 mb-1">Identifiant : {password.username}</p>
              <p className="text-sm text-gray-400 mb-1">Site : <a href={password.url} target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:underline">{password.url}</a></p>
              <p className="text-sm text-gray-400 mb-1">Notes : {password.notes || "-"}</p>
              <p className="text-xs text-gray-500 mb-2">Ajouté le : {new Date(password.createdAt).toLocaleDateString()}</p>
              <PasswordInput value={password.password} />
            </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 mt-10">
                Aucun mot de passe trouvé.
              </div>
            )}
          </div>
        </div>
      );
}
