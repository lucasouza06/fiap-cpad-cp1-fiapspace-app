import { useState, useContext } from "react";
// Adicionamos o useRouter dentro das chaves do expo-router
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import AndarCard from "../components/AndarCard";
import { EventosContext } from "./_layout";

const ANDARES = [1, 2, 3, 4, 5];

export default function HomeScreen() {
  const router = useRouter();
  const { eventos } = useContext(EventosContext);

  // Controle do menu de interação (aberto/fechado)
  const [menuAberto, setMenuAberto] = useState(false);

  function getStatusAndar(andar) {
    const agora = new Date();
    const horaAtual =
      agora.getHours().toString().padStart(2, "0") +
      ":" +
      agora.getMinutes().toString().padStart(2, "0");

    const eventoAtivo = eventos.find(
      (ev) =>
        ev.andar === String(andar) &&
        ev.inicio <= horaAtual &&
        ev.fim >= horaAtual,
    );

    return eventoAtivo
      ? {
          ocupado: true,
          nomeEvento: eventoAtivo.nome,
          horario: eventoAtivo.fim,
        }
      : { ocupado: false };
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitulo}>Status dos espaços agora</Text>

        {ANDARES.map((andar) => {
          const { ocupado, nomeEvento, horario } = getStatusAndar(andar);
          return (
            <AndarCard
              key={andar}
              andar={andar}
              ocupado={ocupado}
              nomeEvento={nomeEvento}
              horario={horario}
            />
          );
        })}

        {/* Espaço para não cobrir o último card quando o menu abrir */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Interface do FAB Interativo */}
      <View style={styles.fabContainer}>
        {menuAberto && (
          <View style={styles.menuOpcoes}>
            <Pressable
              style={styles.opcaoBotao}
              onPress={() => {
                setMenuAberto(false);
                router.push("/eventos");
              }}
            >
              <Text style={styles.opcaoTexto}>Ver Eventos do Dia</Text>
            </Pressable>

            <Pressable
              style={styles.opcaoBotao}
              onPress={() => {
                setMenuAberto(false);
                router.push("/cadastro");
              }}
            >
              <Text style={styles.opcaoTexto}>Cadastrar Evento</Text>
            </Pressable>
          </View>
        )}

        <Pressable
          style={[styles.fabPrincipal, menuAberto && styles.fabAberto]}
          onPress={() => setMenuAberto(!menuAberto)}
        >
          <Text style={styles.fabIcone}>{menuAberto ? "✕" : "+"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  content: { padding: 20 },
  subtitulo: {
    fontSize: 16,
    color: "#f5f5f5",
    marginBottom: 20,
    fontFamily: "sans-serif",
  },
  fabContainer: {
    position: "absolute",
    bottom: 30,
    right: 25,
    alignItems: "flex-end",
  },
  menuOpcoes: {
    marginBottom: 15,
    alignItems: "flex-end",
  },
  opcaoBotao: {
    backgroundColor: "#ed145b",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  opcaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  fabPrincipal: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: "#ed145b",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  fabAberto: {
    backgroundColor: "#333", // Cor neutra ao abrir
  },
  fabIcone: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});
