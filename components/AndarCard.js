import { View, Text, StyleSheet } from "react-native";

export default function AndarCard({ andar, ocupado, nomeEvento, horario }) {
  return (
    <View style={[styles.card, ocupado ? styles.ocupado : styles.livre]}>
      <Text style={styles.andar}>{andar}º Andar</Text>
      <Text style={styles.status}>{ocupado ? "🔴 Ocupado" : "🟢 Livre"}</Text>
      {ocupado && (
        <>
          <Text style={styles.info}>{nomeEvento}</Text>
          <Text style={styles.info}>até {horario}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  livre: { backgroundColor: "#e6f9ee" },
  ocupado: { backgroundColor: "#fdecea" },
  andar: { fontSize: 22, fontWeight: "bold", color: "#222" },
  status: { fontSize: 16, marginTop: 6, fontWeight: "600" },
  info: { fontSize: 14, color: "#555", marginTop: 4 },
});
