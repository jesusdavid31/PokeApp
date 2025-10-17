/* eslint-disable @typescript-eslint/no-explicit-any */

// STORE
import { useListPokemonStore } from '../../../store/listPokemon.store';

// INTERFACES
import { typeColorMap } from "../../../interfaces/pokemon-colors.interface";
import type { Pokemon } from '../../../interfaces/pokemon.interface';

import Swal from 'sweetalert2';

export interface SimplePokemon {
    id: string;
    name: string;
    img: string;
    weight: string;
    height: string;
    type: string;
    color: string;
}

export const usePokemon = () => {

    // STORE
    const { setPokemon, setTotalPokemon, setLoading } = useListPokemonStore();

    const basicPokemon: SimplePokemon = {
        id: 'Error al cargar sus datos',
        name: '',
        img: '',
        weight: 'Error al cargar sus datos',
        height: 'Error al cargar sus datos',
        type: 'Error al cargar sus datos',
        color: 'normal',
    };

    const getPokemons = async ( page: number ) => {

        if (page < 1) {
            console.warn("Ya estás en la primera página.");
            return;
        }

        const limit = 10;
        const offset = (page - 1) * limit;

        try {
            
            setLoading(true);
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
            const data = await res.json();

            // Usamos Promise.all para esperar a que todas las promesas de fetch se resuelvan y obtener los detalles de cada Pokémon
            const pokemonDetails = await Promise.all(
                data.results.map(async (poke: { name: string; url: string }) => {

                    const res = await fetch(poke.url);
                    if (!res.ok) {
                        basicPokemon.name = poke.name.charAt(0).toUpperCase() + poke.name.slice(1);
                        return basicPokemon; // Retorna un Pokémon sin datos en caso de error  
                    }
                    const data: Pokemon = await res.json();

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

                    return {
                        // Usamos el id del Pokémon, asegurándonos de que tenga 3 dígitos con ceros a la izquierda
                        id: `#${data.id.toString().padStart(3, '0')}`,
                        // Convertimos el nombre del Pokémon a formato capitalizado (ej: "bulbasaur" a "Bulbasaur")
                        name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
                        img: data.sprites.front_default,
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
                })
            );

            setTotalPokemon(data.count);
            setPokemon(pokemonDetails);
            setLoading(false);

        } catch (error: any) {
            Swal.fire('Error', error, 'error');
        }

    }

    return { 
        getPokemons,
    };
};