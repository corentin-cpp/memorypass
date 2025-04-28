import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from "@/lib/supbaseClient";
import { useAuth } from "@/lib/AuthProvider";
import { useParams } from 'next/navigation';
import { Button } from "@/components/Button";
import PasswordInput from '@/components/PasswordInput';
import { Plus } from 'lucide-react';
import CreatePasswordModal from "@/components/CreatePasswordModal";

export default function VaultDetails() {
    const params = useParams();
    const [passwords, setPasswords] = useState([]);
    const [vault, setVault] = useState(null);
    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user, loading } = useAuth();

    useEffect(() => {
        if (loading) return;

        if (!user) {
            window.location.href = "/login";
            return;
        }

        if (!params?.id) {
            console.error("Paramètre 'id' manquant.");
            setError("Coffre introuvable.");
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const [vaultResponse, passwordsResponse] = await Promise.all([
                    supabase.from('vaults').select('*').eq('id', params.id).single(),
                    supabase.from('passwords').select('*').eq('vault_id', params.id)
                ]);

                if (vaultResponse.error) throw vaultResponse.error;
                if (passwordsResponse.error) throw passwordsResponse.error;

                setVault(vaultResponse.data || {});
                setPasswords(passwordsResponse.data || []);
            } catch (err) {
                console.error('Erreur lors de la récupération des données :', err);
                setError("Une erreur est survenue lors du chargement des données.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [user, loading, params?.id]);

    useEffect(() => {
        setFiltered(
            passwords.filter((pwd) =>
                pwd.name?.toLowerCase().includes(search.toLowerCase()) ||
                pwd.username?.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, passwords]);

    if (isLoading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white">
                <p>Chargement...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white">
                <p>Erreur : {error}</p>
            </div>
        );
    }

    if (!vault) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white">
                <p>Erreur : Coffre introuvable.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white px-6 py-10">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold">🔐 Mes Mots de passe - {vault.name}</h1>
                        <p className="text-gray-400 mt-1">Voici tous les identifiants enregistrés dans votre compte :</p>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg flex items-center gap-2"
                        onClick={() => setIsModalOpen(true)}>
                        <Plus size={18} /> Ajouter un mot de passe
                    </Button>
                    {isModalOpen && (<CreatePasswordModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />)}
                </div>

                <input
                    type="text"
                    placeholder="Rechercher par nom ou identifiant..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full mb-8 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((password) => (
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
            </div>
        </div>
    );
}