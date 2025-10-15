import { useState } from "react";

// STORE
import { usePokemonGenerationsStore } from '../store/usePokemonGenerations.store';

interface PokemonSpecies {
    name: string;
    url: string;
}

interface UsePokemonGenerationsState {
    loading: boolean;
    fetchGenerations: () => Promise<void>;
    error: string | null;
}

export const usePokemonGenerations = (): UsePokemonGenerationsState => {

    const { generations, setGenerations } = usePokemonGenerationsStore();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchGenerations = async () => {
        try {
            
            if (generations.length > 0) {
                return;
            }
            
            console.log('Pasando por fetchGenerations');
            setLoading(true);
            const res = await fetch("https://pokeapi.co/api/v2/generation");
            if (!res.ok) throw new Error("Error al obtener las generaciones");

            const data = await res.json();

            // Traer los datos detallados de cada generación
            const generationDetails = await Promise.all(
                data.results.map(async (gen: { name: string; url: string }, index: number) => {
                    const genRes = await fetch(gen.url);
                    if (!genRes.ok) throw new Error(`Error al obtener ${gen.name}`);

                    const genData = await genRes.json();

                    return {
                        id: index + 1,
                        name: gen.name,
                        url: gen.url,
                        pokemon: genData.pokemon_species.map((p: PokemonSpecies) => ({
                            name: p.name,
                            url: p.url,
                        })),
                    };
                })
            );

            setGenerations(generationDetails);

        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Unknown error");
            }
        } finally {
            setLoading(false);
        }
    };

    return { loading, fetchGenerations, error };
};
