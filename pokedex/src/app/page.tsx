"use client";

import { useState } from "react";

// Definição do tipo
type Pokemon = {
  id: number;
  name: string;
  weight: number;
  base_experience: number;
  sprites?: {
    front_default?: string;
    other?: {
      "official-artwork"?: { front_default?: string };
    };
  };
  types: { slot: number; type: { name: string } }[];
};

export default function PokemonCard() {
  const [nameOrId, setNameOrId] = useState<string>(""); // input do usuário
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null); // busca individual

  // Buscar 1 Pokémon pelo input
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nameOrId.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(nameOrId.toLowerCase())}`
      );
      if (!res.ok) throw new Error(`Pokemon não encontrado`);
      const data = (await res.json()) as Pokemon;
      setPokemon(data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError(String(err));
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6 max-w-5xl mx-auto">
      {/* Formulário de busca */}
      <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
        <input
          name="name"
          value={nameOrId}
          onChange={(e) => setNameOrId(e.target.value)}
          placeholder="Digite o nome ou ID"
          className="border px-3 py-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Buscar
        </button>
      </form>

      {/* Erros e carregamento */}
      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Resultado da busca */}
      {pokemon && (
        <ul className="border rounded p-4 mb-6 text-center">
          <li className="text-xl font-bold">
            Nome: {pokemon.name}
          </li>
          <li className="text-xl font-bold">
            ID: #{pokemon.id}
          </li>
        </ul>
      )}
    </section>
  );
}