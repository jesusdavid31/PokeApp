import { useEffect, useState } from "react";

interface Generation {
    name: string;
    url: string;
}

export const usePokemonGenerations = () => {

    const [generations, setGenerations] = useState<Generation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGenerations = async () => {
            try {
                setLoading(true);
                const res = await fetch("https://pokeapi.co/api/v2/generation");
                if (!res.ok) throw new Error("Error al obtener las generaciones");

                const data = await res.json();
                setGenerations(data.results); // contiene nombre y url de cada generación
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

        fetchGenerations();
    }, []);

    return { generations, loading, error };
};
