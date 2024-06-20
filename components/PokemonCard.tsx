import { PokemonReduced } from '@/hooks/usePokemonList';
import { Link } from 'expo-router';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

const PokemonCard = (props: { pokemon: PokemonReduced | null }) => {

    return (
        <Link href={{
            pathname: `/[pokemonId]`,
            params: {
                pokemonName: props?.pokemon?.name,
                pokemonId: props?.pokemon?.id
            }
        }} asChild>
            <TouchableOpacity style={styles.touchableBox}>
                <Image source={{ uri: props?.pokemon?.image }} style={styles.image} />
            </TouchableOpacity>
        </Link >
    );
}

export default PokemonCard

const styles = StyleSheet.create({
    touchableBox: {
        marginVertical: 8,
        marginHorizontal: 12,
        height: 80,
        width: 80,
        backgroundColor: "#DD9AC2",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    image: {
        width: 70,
        height: 70,
    }
})