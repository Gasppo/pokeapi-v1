import { Pokemon } from "@/utils/PokemonType";
import { capitalize } from "@/utils/capitalize";
import { ImageBackground, View, Image, Text, StyleSheet } from "react-native";

const PokemonContent = (props: { pokemon: Pokemon }) => {
    return (
        <View style={styles.pokemonEntryContainer}>
            <ImageBackground source={require('../../assets/images/grass.png')} style={styles.pokemonImageBackground} resizeMode='stretch'>
                <Image source={{ uri: props.pokemon.sprites.front_default }} style={styles.pokemonImage} />
            </ImageBackground>
            <View style={styles.pokemonInformationContainer}>
                <Text style={styles.informationTitle}>Information</Text>
                <Text style={styles.informationText}>Name: {capitalize(props.pokemon.name)}</Text>
                <Text style={styles.informationText}>Height: {props.pokemon.height}</Text>
                <Text style={styles.informationText}>Weight: {props.pokemon.weight}lbs</Text>
                <Text style={styles.informationText}>Abilities: {props.pokemon.abilities.map(ability => capitalize(ability.ability.name)).join(', ')}</Text>
            </View>
            <View style={{ flexGrow: 1 }} />
        </View>
    )
}

export default PokemonContent;

const styles = StyleSheet.create({
    informationText: {
        marginVertical: 8,
        fontSize: 16,
        fontWeight: 'semibold',
    },
    informationTitle: {
        marginVertical: 8,
        fontSize: 24,
        fontWeight: 'semibold',
    },
    pokemonImage: {
        height: 120,
        width: 120,
        marginRight: 30,
        marginTop: 30,
    },
    pokemonImageBackground: {
        alignItems: 'flex-end',
        height: 200,
        width: '100%',
    },
    pokemonEntryContainer: {
        flex: 1,
        alignItems: 'flex-start',
        width: '100%',
    },
    pokemonInformationContainer: {
        padding: 20,
    },
});