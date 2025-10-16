import { create } from 'zustand';

interface Pokemon {
    id: string;
    name: string;
    img: string;
    weight: string;
    height: string;
    type: string;
    color: string;
}

interface ListPokemonState {
    pokemon: Pokemon[];
    setPokemon: (data: Pokemon[]) => void;
}

export const useListPokemon = create<ListPokemonState>((set) => ({
    pokemon: [],
    setPokemon: (data) => set({ pokemon: data }),
}));