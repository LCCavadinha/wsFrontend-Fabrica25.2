"use client";

import { Pokemon } from "@/types";
import { useEffect, useState } from "react";


export default function PokemonCard() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]); // lista completa
  const [searchTerm, setSearchTerm] = useState<string>(""); // termo de busca em tempo real
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null); // Pokémon selecionado
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Filtrar Pokémons baseado no termo de busca
  const filteredPokemonList = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  // Carregar lista inicial de Pokémons
  useEffect(() => {
    const fetchAllPokemons = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        if (!res.ok) throw new Error(`Erro ao carregar Pokémons`);
        const data = await res.json();

        const detailed = await Promise.all(
          data.results.map(async (p: { name: string; url: string }) => {
            const res = await fetch(p.url);
            return (await res.json()) as Pokemon;
          })
        );
        setPokemonList(detailed);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar lista de Pokémons");
      }
    };

    fetchAllPokemons();
  }, []);

  // Buscar Pokémon detalhado ao clicar
  const handlePokemonSelect = async (pokemonName: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(pokemonName.toLowerCase())}`
      );
      if (!res.ok) throw new Error(`Pokémon não encontrado`);
      const data = (await res.json()) as Pokemon;
      setSelectedPokemon(data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Erro ao buscar Pokémon");
      setSelectedPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  const getImage = (p: Pokemon) =>
    p?.sprites?.other?.["official-artwork"]?.front_default ||
    p?.sprites?.front_default ||
    "";

  return (
    <section>
      {/* Campo de busca em tempo real */}
      <div className="mb-6">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Consultar Pokémon"
          className="border px-3 py-2 rounded-4xl w-full bg-amber-50"
        />
        <p className="text-sm text-white mt-2">
          {filteredPokemonList.length} Pokémon(s) encontrado(s)
        </p>
      </div>

      {/* Erros e carregamento */}
      {loading && <p className="text-blue-600">Carregando...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Pokémon selecionado */}
      {selectedPokemon && (
        <div className="border rounded p-4 mb-6 text-center bg-amber-50">

          {getImage(selectedPokemon) && (
            <img
              src={getImage(selectedPokemon)}
              alt={selectedPokemon.name}
              className="w-56 text-center mx-auto"
            />
          )}
          <p className="text-xl font-bold">Nome: {selectedPokemon.name}</p>
          <p className="text-xl font-bold">ID: #{selectedPokemon.id}</p>
          <p className="text-xl font-bold">Peso: {selectedPokemon.weight}</p>
          <p className="text-xl font-bold">Level: {selectedPokemon.base_experience}</p>
        </div>
      
      )}

      {/* Lista filtrada de Pokémons */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredPokemonList.map((pokemon) => (
          <div
            key={pokemon.id}
            onClick={() => handlePokemonSelect(pokemon.name)}
            className="border rounded p-2 text-center cursor-pointer bg-amber-50 hover:bg-gray-50 transition-colors"
          >
            
            <p className="text-xs text-gray-600">#{pokemon.id}</p>
            {getImage(pokemon) && (
              <img
                src={getImage(pokemon)}
                alt={pokemon.name}
                className="w-56 text-center mx-auto"
              />
            )}
            <p className="font-semibold text-sm">{pokemon.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}