import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState, createContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

// Criação do contexto para compartilhamento da lista de eventos entre as telas
export const EventosContext = createContext(null);

// Componente que renderiza o título e a logo na barra superior
function LogoTitle() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>FIAPSpace</Text>

      <Image
        style={styles.logo}
        source={require("../assets/Captura de tela 2026-03-19 125025.png")}
        resizeMode="contain"
      />
    </View>
  );
}

export default function Layout() {
  const [eventos, setEventos] = useState([]);

  return (
    <EventosContext.Provider value={{ eventos, setEventos }}>
      <StatusBar style="light" />

      {/* Configuração global de navegação das telas */}
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#000" },
          headerTintColor: "#fff",
          fontFamily: "sans-serif-light",
        }}
      >
        {/* Tela principal com componente de título customizado */}
        <Stack.Screen
          name="index"
          options={{
            headerTitle: () => <LogoTitle />,
          }}
        />

        <Stack.Screen name="eventos" options={{ title: "Eventos do Dia" }} />
        <Stack.Screen name="cadastro" options={{ title: "Cadastrar Evento" }} />
      </Stack>
    </EventosContext.Provider>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 370,
    height: 35,
    marginLeft: 40,
  },
  headerText: {
    color: "#ED1C24",
    fontSize: 20,
    fontWeight: "800",
    fontFamily: "sans-serif",
  },
});
