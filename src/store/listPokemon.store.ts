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
    loading: boolean;
    setLoading: (value: boolean) => void;
    totalPokemon: number;
    setTotalPokemon: (value: number) => void;
    pokemon: Pokemon[];
    setPokemon: (data: Pokemon[]) => void;
}

export const useListPokemonStore = create<ListPokemonState>((set) => ({
    loading: false,
    setLoading: (value) => set({ loading: value }),
    totalPokemon: 0,
    setTotalPokemon: (value) => set({ totalPokemon: value }),
    pokemon: [],
    setPokemon: (data) => set({ pokemon: data }),
}));