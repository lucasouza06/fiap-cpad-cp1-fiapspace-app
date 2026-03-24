import { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable, // Trocamos TouchableOpacity por Pressable
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

      <View style={{ marginTop: 350 }}> 
        {/* BOTÃO 1 */}
        <Pressable
          onPress={() => router.push("/eventos")}
          style={({ pressed }) => [
            styles.botao,
            { backgroundColor: pressed ? "#ed145b" : "#000" }
          ]}
        >
          {({ pressed }) => (
            <Text style={[styles.botaoTexto, { color: pressed ? "#fff" : "#ed145b" }]}>
              Ver Eventos do Dia
            </Text>
          )}
        </Pressable>

        {/* BOTÃO 2 */}
        <Pressable
          onPress={() => router.push("/cadastro")}
          style={({ pressed }) => [
            styles.botao,
            styles.botaoSecundario,
            { backgroundColor: pressed ? "#ed145b" : "#000" }
          ]}
        >
          {({ pressed }) => (
            <Text style={[styles.botaoTexto, { color: pressed ? "#fff" : "#ed145b" }]}>
              Cadastrar Evento
            </Text>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  content: { padding: 20 },
  subtitulo: { fontSize: 16, color: "#f5f5f5", marginBottom: 20, fontFamily: 'sans-serif', },
  botao: {
    backgroundColor: "#000",
    borderColor: "#ed145b",
    borderWidth: 2,
    padding: 16,
    alignItems: "center",
    marginTop: 12,
    
  
  },
  botaoSecundario: { backgroundColor: "#000" },
  botaoTexto: { fontWeight: "500", fontSize: 15, fontFamily: 'sans-serif', },
});