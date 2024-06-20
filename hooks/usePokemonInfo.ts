import { Pokemon } from "@/utils/PokemonType";
import { useQuery } from "@tanstack/react-query";

export const fetchPokemonInfo = async (id: number) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    //Sleep for 2000ms
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json() as Promise<Pokemon>
}

export const usePokemonInfo = (id: number) => {

    const pokemonQuery = useQuery({
        queryKey: ['pokemon', id],
        queryFn: () => fetchPokemonInfo(id),
    })

    return pokemonQuery
}