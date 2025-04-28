import { useState } from "react";
import { Button } from "@/components/button";
import { Copy } from "lucide-react";
import { generate } from "generate-password";


export default function Password() {
  const [settings, setSettings] = useState({
    length: 12,
    chars: {
      min: 1,
      uppercase: true,
      lowercase: true,
      special: true,
    },
    numbers: true,
    number: {
      min: 1,
    },
  });

  const [generatedPassword, setGeneratedPassword] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes("chars.")) {
      const key = name.split(".")[1];
      setSettings((prev) => ({
        ...prev,
        chars: {
          ...prev.chars,
          [key]: type === "checkbox" ? checked : value,
        },
      }));
    } else if (name.includes("number.")) {
      const key = name.split(".")[1];
      setSettings((prev) => ({
        ...prev,
        number: {
          ...prev.number,
          [key]: value,
        },
      }));
    } else if (name === "numbers") {
      setSettings((prev) => ({
        ...prev,
        numbers: checked,
      }));
    } else {
      setSettings((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleGenerate = () => {
    console.log("Paramètres de génération :", settings);
    setGeneratedPassword(generate({
      length: parseInt(settings.length),
      uppercase: settings.chars.uppercase,
      lowercase: settings.chars.lowercase,
      numbers: settings.numbers ? settings.number.min : false,
      symbols: settings.chars.min,
      strict: true,
    }));
    console.log("Mot de passe généré :", generatedPassword);
  };

  const handleCopy = () => {
    if (generatedPassword) {
      navigator.clipboard.writeText(generatedPassword).then(() => {
        alert("Mot de passe copié !");
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white p-8">
      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center">🔐 Générer un mot de passe sécurisé</h1>
        <div className="space-y-6">

          {/* Paramètres */}
          <div>
            <label className="block mb-2 text-sm">Longueur du mot de passe</label>
            <input
              type="number"
              name="length"
              value={settings.length}
              onChange={handleChange}
              min={4}
              max={128}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="12"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Caractères</h2>
            <div className="flex flex-col gap-3">
              {/* Caractères checkbox */}
              {["uppercase", "lowercase", "special"].map((key) => (
                <label key={key} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name={`chars.${key}`}
                    checked={settings.chars[key]}
                    onChange={handleChange}
                    className="accent-purple-600"
                  />
                  {key === "uppercase" && "Majuscules (A-Z)"}
                  {key === "lowercase" && "Minuscules (a-z)"}
                  {key === "special" && "Caractères spéciaux (@#%)"}
                </label>
              ))}
              <label className="flex items-center gap-3">
                <input
                  type="number"
                  name="chars.min"
                  value={settings.chars.min}
                  onChange={handleChange}
                  min={0}
                  className="w-20 px-2 py-1 rounded bg-white/10 text-white"
                />
                Minimum de caractères obligatoires
              </label>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Chiffres</h2>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="numbers"
                  checked={settings.numbers}
                  onChange={handleChange}
                  className="accent-purple-600"
                />
                Inclure des chiffres (0-9)
              </label>
              {settings.numbers && (
                <label className="flex items-center gap-3">
                  <input
                    type="number"
                    name="number.min"
                    value={settings.number.min}
                    onChange={handleChange}
                    min={0}
                    className="w-20 px-2 py-1 rounded bg-white/10 text-white"
                  />
                  Minimum de chiffres obligatoires
                </label>
              )}
            </div>
          </div>

          {/* Bouton de génération */}
          <Button onClick={handleGenerate} className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg mt-6">
            Générer le mot de passe
          </Button>

          {/* Prévisualisation */}
          {generatedPassword && (
            <div className="mt-8 p-4 bg-white/10 rounded-xl flex flex-col gap-4 items-center">
              <p className="break-words text-center text-lg">{generatedPassword}</p>
              <Button onClick={handleCopy} className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 px-6 py-2 rounded-lg">
                <Copy size={18} />
                Copier
              </Button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
