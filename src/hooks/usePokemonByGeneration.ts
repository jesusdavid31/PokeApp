/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/usePokemonByGeneration.ts
import { useCallback } from "react";
import { useParams } from 'react-router-dom';

// STORE
import { usePokemonGenerationsStore } from "../store/pokemonGenerations.store";
import { useListPokemonStore } from "../store/listPokemon.store";

// INTERFACES
import { typeColorMap } from "../pages/PokemonListPage/interfaces/pokemon-colors.interface";

// Librerías
import Swal from "sweetalert2";

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

    const { generation } = useParams<{ generation: string }>();

    // STORE
    const { generations } = usePokemonGenerationsStore();
    const { setPokemon, setLoading, setTotalPokemon } = useListPokemonStore();

    const basicPokemon: SimplePokemon = {
        id: 'Sin ID',
        name: '',
        img: '',
        weight: 'Ninguno',
        height: 'Ninguno',
        type: 'Ninguno',
        color: 'normal',
    };

    const loadGeneration = useCallback(async ( page: number ) => {

        const gen = generations.find((g) => g.name === generation);
        if (!gen) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se encontró la generación solicitada.",
            });
            return;
        }

        setLoading(true);

        try {

            const pageSize = 10;
            // Nos protegemos de páginas fuera de rango
            const totalPages = Math.max(1, Math.ceil(gen.pokemon.length / pageSize));
            // Usamos safePage en lugar de page para calcular start/end
            const safePage = Math.min(Math.max(page, 1), totalPages);

            const start = (safePage - 1) * pageSize;
            const end = start + pageSize;

            // toma SOLO los 10 de la página solicitada
            const pageSpecies = gen.pokemon.slice(start, end);

            // Pedimos el detalle de cada pokemon por su "name"
            const requests = pageSpecies.map(async (sp) => {
                
                const res = await fetch(pokemonDetailUrl(sp.name));
                // if (!res.ok) throw new Error(`No se pudo obtener al Pokémon ${sp.name}`);
                if (!res.ok) {
                    basicPokemon.name = sp.name.charAt(0).toUpperCase() + sp.name.slice(1);
                    return basicPokemon; // Retorna un Pokémon básico en caso de error  
                }
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

            setTotalPokemon(gen.pokemon.length);
            setPokemon(result);

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: (error instanceof Error ? error.message : "No se encontraron todos los Pokémons para la generación seleccionada. Por favor, intenta de nuevo."),
            });
            setPokemon([]); // Limpiamos la lista en caso de error
        } finally {
            setLoading(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [generations, generation, setPokemon, setTotalPokemon, setLoading]);

    return {
        generation,
        loadGeneration, // (genId: number) => Promise<void>
    };
}
