import { create } from 'zustand';

interface PokemonSpecies {
    name: string;
    url: string;
}

interface Generation {
    id: number;
    name: string;
    url: string;
    pokemon: PokemonSpecies[];
}

interface PokemonGenerationsState {
    generations: Generation[];
    setGenerations: (newGenerations: Generation[]) => void;
}

export const usePokemonGenerationsStore = create<PokemonGenerationsState>((set) => ({
    generations: [],
    setGenerations: (newGenerations) => set({ generations: newGenerations }),
}));