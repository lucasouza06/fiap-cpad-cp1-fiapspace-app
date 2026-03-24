import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState, createContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export const EventosContext = createContext(null);

// Componente Customizado para o Título (Invertido)
function LogoTitle() {
  return (
    <View style={styles.headerContainer}>
      {/* O TEXTO VEM PRIMEIRO AGORA */}
      <Text style={styles.headerText}>FIAPSpace</Text>

      {/* A IMAGEM VEM DEPOIS */}
      <Image
        style={styles.logo}
        // Caminho da sua imagem local
        source={require('../assets/Captura de tela 2026-03-19 125025.png')} // Verifique se o caminho/extensão estão corretos!
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
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#000" },
          headerTintColor: "#fff",
          fontFamily: 'sans-serif-light',
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            // Usamos o componente customizado com o título invertido
            headerTitle: () => <LogoTitle /> 
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
    flexDirection: 'row', 
  },
  logo: {
    width: 370,  // Tamanho do logo
    height: 35,
    marginLeft: 40, // ESPAÇO AGORA É À ESQUERDA DA IMAGEM
  },
  headerText: {
    color: '#fff',
    fontSize: 20, 
    fontWeight: '800',
    fontFamily: 'sans-serif',
  },
});