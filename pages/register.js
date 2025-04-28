import { Button } from "@/components/Button";
import { supabase } from "@/lib/supbaseClient";
import { useState } from "react";
import { useRouter } from "next/router";


export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null)
    const router = useRouter();

    async function register() {
        if (password !== confirmPassword) {
            setMessage("Les mots de passe ne correspondent pas");
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        console.log(data);

        if (error) {
            setMessage(error.message);
        } else {
            const { data: vault, error: vaultError } = await supabase
                .from('vaults')
                .insert({
                    name: 'Vault par défaut',
                    user_id: data.user.id,
                    canDelete: false
                })
                .select()
                .single();

            if (vaultError) throw vaultError;

            const { error: profileError } = await supabase
                .from('profiles')
                .insert({
                    id: data.user.id,
                    default_vault_id: vault.id
                });

            if (profileError) throw profileError;

            if (error) {
                setMessage("Erreur lors de la création du coffre-fort par défaut");
                return;
            }
            setMessage("Inscription réussie !");
            router.push("/dashboard");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white font-sans px-4">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl">
                <h2 className="text-3xl font-bold mb-6 text-center">Bienvenue sur MemoryPass</h2>

                <div className="space-y-6">
                    {/* Register Form */}
                    <form className="space-y-4" onSubmit={(e) => {
                        e.preventDefault();
                        register();
                    }}>
                        <div>
                            <label className="block text-sm mb-1" htmlFor="email">Adresse e-mail</label>
                            <input
                                type="email"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="exemple@mail.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1" htmlFor="password">Mot de passe</label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="••••••••"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1" htmlFor="password">Confirmer votre Mot de passe</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="••••••••"
                            />
                        </div>
                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg" type="submit">
                            Créer un compte
                        </Button>
                        <p className="text-red-700 text-center">{message}</p>
                    </form>

                    <div className="border-t border-white/20 pt-4 text-center text-sm">
                        <p>Vous possèdez déjà un compte ?</p>
                        <Button variant="outline" className="mt-2 w-full py-2 rounded-lg">
                            Se connecter
                        </Button>
                        <Button variant="outline" className="mt-2 w-full py-2 rounded-lg" onClick={() => {
                            supabase.auth.signInWithOAuth({
                                provider: 'google',
                                options: {
                                    redirectTo: `${window.location.origin}/auth/callback`,
                                },
                            });
                        }}>
                            Se connecter avec Google
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}