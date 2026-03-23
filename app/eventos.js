import { useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import EventoCard from "../components/EventoCard";
import { EventosContext } from "./_layout";

export default function EventosScreen() {
  const { eventos } = useContext(EventosContext);

  if (eventos.length === 0) {
    return (
      <View style={styles.centro}>
        <Text style={styles.emoji}>🎉</Text>
        <Text style={styles.textoInfo}>Nenhum evento hoje!</Text>
        <Text style={styles.textoSub}>Todos os espaços estão livres.</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={eventos}
      keyExtractor={(_, index) => String(index)}
      renderItem={({ item }) => (
        <EventoCard
          nome={item.nome}
          andar={item.andar}
          inicio={item.inicio}
          fim={item.fim}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  content: { padding: 20 },
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  emoji: { fontSize: 48, marginBottom: 12 },
  textoInfo: { fontSize: 18, fontWeight: "bold", color: "#333" },
  textoSub: { fontSize: 14, color: "#777", marginTop: 6 },
});
