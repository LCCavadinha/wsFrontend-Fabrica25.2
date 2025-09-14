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
    <section className="flex flex-col h-screen max-h-5/6">
      {/* Campo de busca em tempo real */}
      <div className="mb-6 flex-shrink-0">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Consultar Pokémon"
          className="border px-3 py-2 rounded-4xl w-full bg-amber-50"
        />
        {searchTerm && (
          <p className={`text-sm mt-2 ${filteredPokemonList.length === 0
            ? "text-black"
            : "text-white"
            }`}>
            {filteredPokemonList.length === 0
              ? "Nenhum Pokémon encontrado"
              : `${filteredPokemonList.length} Pokémon(s) encontrado(s)`
            }
          </p>
        )}
      </div>

      {/* Pokémon selecionado */}
      {selectedPokemon && (
        <div className=" relative border rounded p-4 mb-6 text-center bg-amber-50 md:flex items-center justify-around flex-shrink-0">
          <button
            onClick={() => setSelectedPokemon(null)}
            className="absolute cursor-pointer top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center  hover:bg-red-600 transition-colors text-lg font-bold"
          >
            X
          </button>
          {getImage(selectedPokemon) && (
            <img
              src={getImage(selectedPokemon)}
              alt={selectedPokemon.name}
              className="w-56 text-center mx-auto md:mx-0"
            />
          )}
          <div className="flex flex-col gap-0.5 md:text-start">
            <p className="text-xl font-bold">ID: #{selectedPokemon.id}</p>
            <p className="text-xl font-bold">Nome: {selectedPokemon.name}</p>
            <p className="text-xl font-bold">Peso: {selectedPokemon.weight}</p>
            <p className="text-xl font-bold">Level: {selectedPokemon.base_experience}</p>
          </div>
        </div>

      )}

      {/* Lista filtrada de Pokémons */}

      <div className="flex-1 overflow-y-auto scrollbar-pokemon">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-2 group">
          {filteredPokemonList.map((pokemon) => (
            <div
              key={pokemon.id}
              onClick={() => handlePokemonSelect(pokemon.name)}
              className="border rounded p-2 text-center cursor-pointer bg-amber-50 
                transition-all duration-300 ease-out
                group-hover:filter group-hover:opacity-85
                hover:!blur-none hover:!opacity-100 hover:transform hover:-translate-y-2 hover:shadow-lg hover:z-10"
            >
              <p className="text-xs text-gray-600">#{pokemon.id}</p>
              {getImage(pokemon) && (
                <img
                  src={getImage(pokemon)}
                  alt={pokemon.name}
                  className="w-56 text-center mx-auto transition-transform duration-300 hover:scale-105"
                />
              )}
              <p className="font-semibold text-xs md:text-sm">{pokemon.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}