import { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { EventosContext } from "./_layout";

// Atualizado para permitir o cadastro nos novos andares (6 e 7)
const ANDARES_VALIDOS = ["1", "2", "3", "4", "5", "6", "7"];

export default function CadastroScreen() {
  const router = useRouter();
  const { setEventos } = useContext(EventosContext);

  const [nome, setNome] = useState("");
  const [andar, setAndar] = useState("");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [salvando, setSalvando] = useState(false);

  function salvarEvento() {
    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!nome || !andar || !inicio || !fim) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    // Valida se o horário segue o padrão de 24 horas (HH:MM)
    const regexHora = /^([01]\d|2[0-3]):[0-5]\d$/;
    if (!regexHora.test(inicio) || !regexHora.test(fim)) {
      Alert.alert("Atenção", "Horários devem estar no formato HH:MM");
      return;
    }

    // Valida se o andar informado está dentro do novo intervalo permitido (1 a 7)
    if (!ANDARES_VALIDOS.includes(andar)) {
      Alert.alert("Atenção", "Andar inválido (Escolha de 1 a 7)");
      return;
    }

    setSalvando(true);

    // Simula o processo de salvamento antes de atualizar o contexto global
    setTimeout(() => {
      setEventos((prev) => [...prev, { nome, andar, inicio, fim }]);
      setSalvando(false);

      Alert.alert("Sucesso!", "Evento cadastrado com sucesso.", [
        { text: "OK", onPress: () => router.back() },
      ]);
    }, 500);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Cadastrar Evento</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nome do Evento</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Ex: Workshop de Design"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Andar (1 a 7)</Text>
        <TextInput
          style={styles.input}
          value={andar}
          onChangeText={setAndar}
          placeholder="Ex: 7"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          maxLength={1}
        />

        <Text style={styles.label}>Início (HH:MM)</Text>
        <TextInput
          style={styles.input}
          value={inicio}
          onChangeText={setInicio}
          placeholder="08:00"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          maxLength={5}
        />

        <Text style={styles.label}>Fim (HH:MM)</Text>
        <TextInput
          style={styles.input}
          value={fim}
          onChangeText={setFim}
          placeholder="10:00"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          maxLength={5}
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={salvarEvento}
          disabled={salvando}
        >
          {salvando ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.botaoTexto}>Salvar Evento</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0b0b",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#ED1C24",
    textAlign: "center",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#141414",
    borderRadius: 18,
    padding: 20,
    shadowColor: "#ED1C24",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#f5f5f5",
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    backgroundColor: "#1f1f1f",
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#ED1C24",
  },
  botao: {
    backgroundColor: "#ED1C24",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    marginTop: 32,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
