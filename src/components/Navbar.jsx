import Link from "next/link";
import { useAuth } from "@/lib/AuthProvider";
import { Button } from "@/components/Button";

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white text-white w-full z-50">
            <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                    Memory<span className="text-purple-400">Pass</span>
                </Link>

                {/* Menu */}
                <div className="flex items-center gap-4">
                    {!user ? (
                        <>
                            <Link href="/login">
                                <Button className="bg-white/10 hover:bg-white/20 rounded-full px-5 py-2 text-sm font-medium">
                                    Se connecter
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button className="bg-purple-600 hover:bg-purple-700 rounded-full px-5 py-2 text-sm font-medium">
                                    Créer un compte
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/dashboard">
                                <Button className="bg-white/10 hover:bg-white/20 rounded-full px-5 py-2 text-sm font-medium">
                                    Mon compte
                                </Button>
                            </Link>
                            <Button
                                onClick={logout}
                                className="bg-purple-600 hover:bg-purple-700 rounded-full px-5 py-2 text-sm font-medium"
                            >
                                Se déconnecter
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
