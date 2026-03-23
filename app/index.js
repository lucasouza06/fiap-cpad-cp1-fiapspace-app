import { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import AndarCard from "../components/AndarCard";
import { EventosContext } from "./_layout";

const ANDARES = [1, 2];

export default function HomeScreen() {
  const router = useRouter();
  const { eventos } = useContext(EventosContext);

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
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
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

      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.push("/eventos")}
      >
        <Text style={styles.botaoTexto}>Ver Eventos do Dia</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.botao, styles.botaoSecundario]}
        onPress={() => router.push("/cadastro")}
      >
        <Text style={styles.botaoTexto}>Cadastrar Evento</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  content: { padding: 20 },
  subtitulo: { fontSize: 16, color: "#555", marginBottom: 20 },
  botao: {
    backgroundColor: "#ED1C24",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    marginTop: 12,
  },
  botaoSecundario: { backgroundColor: "#333" },
  botaoTexto: { color: "#fff", fontWeight: "bold", fontSize: 15 },
});
