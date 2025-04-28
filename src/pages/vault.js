import { useEffect, useState } from 'react';
import { supabase } from "@/lib/supbaseClient";
import { useAuth } from '@/lib/AuthProvider';
import Link from "next/link";
import { Button } from '@/components/Button';
import CreateVaultModal from "@/components/CreateVaultModal";
import {
    Eye,
    Plus,
} from "lucide-react";

export default function Vault() {
    const [vaultData, setVaultData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, loading } = useAuth();
  
    useEffect(() => {
      if (loading) return; // Attendre que la session utilisateur soit chargée
  
      if (!user) {
        window.location.href = "/login";
        return;
      }
  
      const fetchData = async () => {
        const { data, error } = await supabase
          .from("vaults")
          .select("*")
          .eq("user_id", user.id);
  
        if (error) {
          console.error("Erreur lors de la récupération des mots de passe :", error);
        } else {
          setVaultData(data);
        }
      };
  
      fetchData();
    }, [user, loading]);

    const handleDelete = async (e, id) => {
        e.preventDefault();
        const { error } = await supabase
            .from('vaults')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting vault:', error);
        } else {
            setVaultData(vaultData.filter((item) => item.id !== id));
        }
    }

    if (!user && loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white">
                <p>Chargement...</p>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white px-6 py-10">
            <div className="max-w-6xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">🔐 Mes Coffres - Forts</h1>
                <p className="text-gray-400 mb-8">Voici tous les identifiants enregistrés dans votre compte :</p>
                <div className="flex justify-end mb-8">
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg transition-all"
                    >
                        <Plus size={18} />
                        <span>Créer un coffre</span>
                    </Button>
                </div>
                <CreateVaultModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Cartes d’identifiants mockées */}
                    {vaultData.map((item) => (
                        <div key={item.id} className="bg-zinc-800 p-5 rounded-xl shadow">
                            <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                            <p className="text-sm text-gray-400">{item.description}</p>
                            <Link className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded flex items-center gap-2"
                                href={`/vault/${item.id}`}>
                                <Eye className="inline mr-1" size={16} />
                                Voir les mots de passe
                            </Link>
                            {item.canDelete && (
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const confirmDelete = confirm(`Êtes-vous sûr de vouloir supprimer le coffre "${item.name}" ?`);
                                        if (confirmDelete) handleDelete(e, item.id);
                                    }}
                                    className="mt-3 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg flex items-center justify-center transition-all"
                                >
                                    🗑️ Supprimer
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}