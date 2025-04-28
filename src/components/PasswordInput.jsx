import { Eye, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PasswordInput({ value }) {
    const [passwordShow, setPasswordShow] = useState("");

    useEffect(() => {
        let temp = "";
        for (let i = 0; i < value.length; i++) {
            temp += "*";
        }
        setPasswordShow(temp);
    }, []);

    function showPassword(){
        alert("Votre mot de passe est : " + value);
    }

    function copyPassword() {
        navigator.clipboard.writeText(value).then(() => {
            alert("Mot de passe copié dans le presse-papiers !");
        }).catch(err => {
            console.error('Erreur lors de la copie : ', err);
        });
    }

    return (
        <div className="flex items-center bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-lg">
            <p>{passwordShow}</p>
            <button className="ml-2 text-purple-400 hover:text-purple-600" onClick={showPassword}>
                <Eye size={20} />
            </button>
            <button className="ml-2 text-purple-400 hover:text-purple-600" onClick={copyPassword}>
                <Copy size={20} />
            </button>
        </div>
    );
}