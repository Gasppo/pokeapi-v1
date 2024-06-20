import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { Image } from "react-native";

const queryClient = new QueryClient();

export default function RootLayout() {


  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{
          headerStyle: { backgroundColor: '#B486AB' },
          headerTitleAlign: 'center',
          headerTitle: () =>
            <Image
              source={require("../assets/images/pokemon-logo.png")}
              style={{ height: 35, width: 100, resizeMode: "cover", }}
            />
        }} />
        <Stack.Screen name="[pokemonId]" options={{
          presentation: 'modal',
          headerStyle: { backgroundColor: '#B486AB' },
        }} />
      </Stack>
    </QueryClientProvider>
  );
}
