import { View, Text, StyleSheet } from "react-native";

export default function EventoCard({ nome, andar, inicio, fim }) {
  return (
    <View style={styles.card}>
      <Text style={styles.nome}>{nome}</Text>
      <Text style={styles.detalhe}>📍 {andar}º Andar</Text>
      <Text style={styles.detalhe}>
        🕐 {inicio} — {fim}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#ED1C24",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  nome: { fontSize: 16, fontWeight: "bold", color: "#222" },
  detalhe: { fontSize: 14, color: "#555", marginTop: 4 },
});
