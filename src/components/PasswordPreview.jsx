import { useEffect } from "react"
import PasswordInput from "@/components/PasswordInput"

export default function PasswordPreview({ passwords }) {
    useEffect(() => {
        console.log("Password Parameters: ", passwords)
    }, []);

    return (
        passwords.map((password) => (
            <div
                key={password.id}
                className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-xl hover:shadow-2xl transition p-4 mb-4"
            >
                <h2 className="text-lg font-semibold mb-1">{password.name}</h2>
                <p className="text-sm text-gray-300 mb-1">Identifiant : {password.username}</p>
                <p className="text-sm text-gray-400 mb-1">Site : <a href={password.url} target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:underline">{password.url}</a></p>
                <p className="text-sm text-gray-400 mb-1">Notes : {password.notes || "-"}</p>
                <p className="text-xs text-gray-500 mb-2">Ajouté le : {new Date(password.createdAt).toLocaleDateString()}</p>
                <PasswordInput value={password.password} />
            </div>
        ))
    )
}