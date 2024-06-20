import LoadingIndicator from "@/components/LoadingIndicator";
import PokemonCard from "@/components/PokemonCard";
import { usePokemonList } from "@/hooks/usePokemonList";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function Index() {

  const [refreshing, setRefreshing] = useState(false)
  const { pokemon, isLoading, refresh, nextPage } = usePokemonList();

  const handleEndReached = async () => {
    await nextPage()
  }

  const handleRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemon}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={isLoading ? <LoadingIndicator /> : null}
        refreshing={refreshing}
        onEndReached={handleEndReached}
        onRefresh={handleRefresh}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
      />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EACBD2',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
