import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RelatoriosScreen({ route, navigation }) {
  const { pedidos } = route.params;

  // Contagem por status
  const statusCounts = pedidos.reduce((acc, pedido) => {
    acc[pedido.status] = (acc[pedido.status] || 0) + 1;
    return acc;
  }, {});

  const statusColors = {
    'Aberto': '#FFA500',
    'Em Andamento': '#00a8ff',
    'Finalizado': '#00c851',
    'Cancelado': '#ff4757',
  };

  return (
    <View style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Relatórios de Pedidos</Text>

      <Text style={styles.subtitle}>Resumo por Status:</Text>
      {Object.keys(statusCounts).map(status => (
        <Text key={status} style={[styles.statusText, { color: statusColors[status] }]}>
          {status}: {statusCounts[status]}
        </Text>
      ))}

      <Text style={styles.subtitle}>Todos os Pedidos:</Text>

      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.titulo}</Text>
            <Text style={styles.cardDescription}>{item.descricao}</Text>
            <Text style={[styles.cardStatus, { color: statusColors[item.status] }]}>
              Status: {item.status}
            </Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
  title: {
    color: '#7c3aed',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  statusText: {
    fontSize: 16,
    marginBottom: 5,
  },
  card: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDescription: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 5,
  },
  cardStatus: {
    fontWeight: 'bold',
    marginTop: 10,
  },
});
