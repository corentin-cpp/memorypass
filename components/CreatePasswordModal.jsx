import React, { useState, useEffect } from "react";
import { Button } from "@/components/button";
import { supabase } from "@/lib/supbaseClient";
import { useAuth } from "@/lib/AuthProvider";

export default function CreatePasswordModal({ open, onClose }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState([]);
  const [vaults, setVaults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    username: "",
    password: "",
    url: "",
    notes: "",
    vault_id: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("vaults")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching vault data:", error);
      } else {
        setVaults(data);
        // Met à jour le vault_id par défaut si data n’est pas vide
        if (data.length > 0) {
          setFormData((prev) => ({ ...prev, vault_id: data[0].id }));
        }
      }
      setLoading(false);
    };
    const fetchProfile = async () => {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id);
      if (error) {
        console.error("Error fetching profile data:", error);
      } else {
        setProfile(data);
      }
    };
    fetchProfile();
    fetchData();
  }, [user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    supabase
      .from("passwords")
      .insert({
        title: formData.title,
        username: formData.username,
        password: formData.password,
        url: formData.url,
        notes: formData.notes,
        vault_id: formData.vault_id,
      })
      .then(({ data, error }) => {
        if (error) {
          console.error("Error creating password:", error);
          setError(error.message);
          alert("Erreur lors de la création du mot de passe : " + error.message);
        } else {
          alert("Mot de passe créé avec succès !");
          onClose();
        }
      });

      if(formData.vault_id === profile[0].default_vault_id) {
        onClose();
        return;
      }
      
      //Default vault_id
      supabase
      .from("passwords")
      .insert({
        title: formData.title,
        username: formData.username,
        password: formData.password,
        url: formData.url,
        notes: formData.notes,
        vault_id: profile[0].default_vault_id,
      })
      .then(({ data, error }) => {
        if (error) {
          console.error("Error creating password:", error);
          setError(error.message);
          alert("Erreur lors de la création du mot de passe dans le coffre par défaut: " + error.message);
        } else {
          onClose();
        }
      });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white p-8 rounded-xl w-full max-w-xl shadow-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Ajouter un nouveau mot de passe</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="vault_id" className="block text-sm mb-1">Choisir un coffre</label>
            <select
              id="vault_id"
              name="vault_id"
              value={formData.vault_id}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value={profile[0]?.default_vault_id}>
                Aucun coffre sélectionné
              </option>
              {vaults.map((vault) => (
                <option key={vault.id} value={vault.id}>
                  {vault.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="title" className="block text-sm mb-1">Nom personnalisé</label>
            <input
              id="title"
              name="title"
              value={formData.title}
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
            <p className="text-red-600">{error}</p>
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
