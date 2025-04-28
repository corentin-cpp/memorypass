import { Button } from "./Button";
import { useState } from "react";
import { supabase } from "@/lib/supbaseClient";
import { useAuth } from "@/lib/AuthProvider";

export function EditPasswordModal({ open, onClose, initialData }) {
    const [formData, setFormData] = useState(initialData || {
      name: "",
      username: "",
      password: "",
      url: "",
      notes: "",
      vaultId: "",
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Mot de passe modifié :", formData);
      onClose();
    };
  
    if (!open) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
        <div className="bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white p-8 rounded-xl w-full max-w-xl shadow-2xl">
          <h1 className="text-2xl font-bold mb-6 text-center">Modifier le mot de passe</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm mb-1">Nom personnalisé</label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Ex: Compte Gmail"
              />
            </div>
            <div>
              <label htmlFor="username" className="block text-sm mb-1">Identifiant</label>
              <input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Ex: user@gmail.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm mb-1">Mot de passe</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label htmlFor="url" className="block text-sm mb-1">URL du site</label>
              <input
                id="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="https://example.com"
              />
            </div>
            <div>
              <label htmlFor="notes" className="block text-sm mb-1">Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Ex: double authentification activée..."
              />
            </div>
            <div className="flex gap-4">
              <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700 py-3 rounded-lg">
                Enregistrer
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
  