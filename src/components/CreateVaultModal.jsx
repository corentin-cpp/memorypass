import {Button} from "./Button";
import { useState } from "react";
import { supabase } from "@/lib/supbaseClient";
import { useAuth } from "@/lib/AuthProvider";

export default function CreateVaultModal({ open, onClose }) {
    const { user } = useAuth();
    const [vaultName, setVaultName] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Coffre créé :", vaultName);
      supabase.from("vaults")
        .insert([{ name: vaultName, user_id: user.id }])
        .then(({ data, error }) => {
          if (error) {
            console.error("Erreur lors de la création du coffre :", error);
          } else {
            alert("Coffre créé avec succès !");
            setVaultName("");
            onClose();
          }
        });
      onClose();
    };
  
    if (!open) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
        <div className="bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white p-8 rounded-xl w-full max-w-md shadow-2xl">
          <h2 className="text-xl font-bold mb-6 text-center">Créer un nouveau coffre</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="vaultName" className="block text-sm mb-1">Nom du coffre</label>
              <input
                id="vaultName"
                value={vaultName}
                onChange={(e) => setVaultName(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Ex: Personnel"
              />
            </div>
            <div className="flex gap-4">
              <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700 py-2 rounded-lg">
                Créer
              </Button>
              <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
                Annuler
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }