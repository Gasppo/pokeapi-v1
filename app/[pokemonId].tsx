import PokemonContent from '@/components/pokemonId/PokemontContent';
import { usePokemonInfo } from '@/hooks/usePokemonInfo';
import { Link, Stack, router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const PokemonInfoModal = () => {
    const isPresented = router.canGoBack();
    const { pokemonId = '', pokemonName = '' } = useLocalSearchParams<{ pokemonId?: string, pokemonName?: string }>();
    const parsedPokemonId = parseInt(pokemonId || '');

    const { data, isLoading } = usePokemonInfo(parsedPokemonId);
    const parsedName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)

    if (!data && !isLoading) return null

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerTitle: `#${parsedPokemonId} ${parsedName}` }} />
            {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
            {!isLoading && data && <PokemonContent pokemon={data} />}
            {!isPresented && <Link href="../">Dismiss</Link>}
            <StatusBar style="light" />
        </View>
    );
}

export default PokemonInfoModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EACBD2',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


