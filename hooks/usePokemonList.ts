import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPokemonInfo } from "./usePokemonInfo";

export type PokemonReduced = {
    id: number;
    name: string;
    image: string;
}

const fetchPokemonPaginated = async ({ pageParam = 0 }) => {
    const list = Array.from({ length: 21 }, (_, i) => i + 1 + pageParam * 21);

    const response = await Promise.all(
        list.map(id => fetchPokemonInfo(id))
    )

    const data = response.map(pokemon => ({
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.front_default,
    })) as PokemonReduced[];

    return {
        data,
        nextCursor: pageParam + 1,
        prevCursor: pageParam - 1
    }

}

export const usePokemonList = () => {

    const queryClient = useQueryClient();

    const pokemonInfinite = useInfiniteQuery({
        queryKey: ['pokemonI'],
        queryFn: fetchPokemonPaginated,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.data.length < 20) return undefined;
            return lastPage.nextCursor;
        }
    })

    const refresh = () => {
        return queryClient.refetchQueries({
            queryKey: ['pokemonI']
        })
    }

    return {
        pokemon: pokemonInfinite.data?.pages.flatMap(page => page.data) ?? [],
        isLoading: pokemonInfinite.isFetching,
        refresh,
        nextPage: pokemonInfinite.fetchNextPage,
    }
};