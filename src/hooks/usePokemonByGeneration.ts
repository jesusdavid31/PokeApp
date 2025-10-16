/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/usePokemonByGeneration.ts
import { useCallback, useRef, useState } from "react";

// STORE
import { usePokemonGenerationsStore } from "../store/pokemonGenerations.store";
import { useListPokemon } from "../store/listPokemon.store";

// INTERFACES
import { typeColorMap } from "../pages/PokemonListPage/interfaces/pokemon-colors.interface";

export interface SimplePokemon {
    id: string;
    name: string;
    img: string;
    weight: string;
    height: string;
    type: string;
    color: string;
}

const pokemonDetailUrl = (name: string) => `https://pokeapi.co/api/v2/pokemon/${name}`;

export function usePokemonByGeneration() {

    // STORE
    const { generations } = usePokemonGenerationsStore();
    const { pokemon, setPokemon } = useListPokemon();

    // Estado local (luego lo migramos a Zustand si quieres)
    // const [pokemons, setPokemons] = useState<SimplePokemon[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Para evitar recargar la misma generación si ya está cargada
    const loadedGenIdRef = useRef<number | null>(null);

    const loadGeneration = useCallback(async (genId: number) => {

        // Si ya cargaste esta generación, no vuelvas a cargar
        if (loadedGenIdRef.current === genId && pokemon) return;

        const gen = generations.find((g) => g.id === genId);
        if (!gen) {
            setError("Generación no encontrada en el store.");
            return;
        }

        setError(null);
        setLoading(true);

        try {

            // Pedimos el detalle de cada pokemon por su "name"
            const requests = gen.pokemon.map(async (sp) => {
                
                const res = await fetch(pokemonDetailUrl(sp.name));
                if (!res.ok) throw new Error(`No se pudo obtener ${sp.name}`);
                const data = await res.json();

                // con typeList creamos una lista de tipos (ej: ["fire", "flying"]) a partir de los datos del Pokémon
                const typeList = data.types.map((t: any) => t.type.name);
                // tomamos el primer tipo de la lista (ej: "fire") para determinar el color
                const primaryType = typeList[0];
                // Si el tipo principal (como "fire") existe en el typeColorMap, toma su valor (ej: "fire")
                // Si no existe, usa "normal" (por si el tipo no está mapeado aún)
                let color = typeColorMap[primaryType] || 'normal';

                if ( color === 'normal' && typeList.length > 1 ) {
                    // Si el tipo es "normal" pero hay más de un tipo, usamos el segundo tipo para determinar el color
                    color = typeList[1];
                }

                const image =
                    data?.sprites?.other?.["official-artwork"]?.front_default ??
                    data?.sprites?.other?.home?.front_default ??
                    data?.sprites?.front_default ??
                    null;

                const item: SimplePokemon = { 
                    // Usamos el id del Pokémon, asegurándonos de que tenga 3 dígitos con ceros a la izquierda
                    id: `#${data.id.toString().padStart(3, '0')}`,
                    // Convertimos el nombre del Pokémon a formato capitalizado (ej: "bulbasaur" a "Bulbasaur")
                    name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
                    img: image,
                    // Convertimos el peso y la altura a un formato más legible
                    // El peso se divide por 10 para convertir de hectogramos a kilogramos
                    weight: `${(data.weight / 10).toFixed(1)} kg`,
                    // La altura se divide por 10 para convertir de decímetros a metros
                    height: `${(data.height / 10).toFixed(1)} m`,
                    // Unimos los tipos en una cadena (ej: "Fire / Flying")
                    // Si hay más de un tipo, los unimos con " / "
                    type: typeList.join(' / '),
                    // Asignamos el color basado en el primer tipo del Pokémon
                    color,
                };

                return item;
            });

            const result = await Promise.all(requests);

            // Ordenado por id (opcional, ayuda a que se vea consistente)
            // result.sort((a, b) => a.id - b.id);

            setPokemon(result);
            loadedGenIdRef.current = genId;

        } catch (e: any) {
            setError(e?.message ?? "Error al cargar Pokémon de la generación.");
            setPokemon([]); // Limpiamos la lista en caso de error
        } finally {
            setLoading(false);
        }

    }, [generations, pokemon, setPokemon]);

    return {
        loading,    // boolean
        error,      // string | null
        loadGeneration, // (genId: number) => Promise<void>
    };
}
