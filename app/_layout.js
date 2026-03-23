import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState, createContext } from "react";

export const EventosContext = createContext(null);

export default function Layout() {
  const [eventos, setEventos] = useState([]);

  return (
    <EventosContext.Provider value={{ eventos, setEventos }}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#ED1C24" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen name="index" options={{ title: "FIAPSpace" }} />
        <Stack.Screen name="eventos" options={{ title: "Eventos do Dia" }} />
        <Stack.Screen name="cadastro" options={{ title: "Cadastrar Evento" }} />
      </Stack>
    </EventosContext.Provider>
  );
}
