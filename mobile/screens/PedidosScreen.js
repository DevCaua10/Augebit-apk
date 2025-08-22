import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Alert,
  Image,
  StatusBar,
  Platform,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';

const { width } = Dimensions.get('window');

export default function PedidosScreen({ navigation }) {
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [mostrarData, setMostrarData] = useState(false);
  const [arquivo, setArquivo] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [pedidos, setPedidos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const adicionarPedido = () => {
    if (!titulo.trim() || !descricao.trim()) {
      Alert.alert(
        'Atenção',
        'Complete todos os campos!',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      return;
    }
    
    const novoPedido = {
      id: Date.now().toString(),
      titulo,
      descricao,
      status: 'Aberto',
      data: dataSelecionada.toLocaleDateString('pt-BR'),
      arquivo,
    };
    setPedidos([novoPedido, ...pedidos]);
    setTitulo('');
    setDescricao('');
    setArquivo(null);
    setModalVisible(false);
    
    Alert.alert(
      'Sucesso',
      'Pedido concluído!',
      [{ text: 'OK' }],
      { cancelable: false }
    );
  };

  const alterarStatus = (id) => {
    setPedidos((prev) =>
      prev.map((pedido) =>
        pedido.id === id
          ? {
              ...pedido,
              status:
                pedido.status === 'Aberto'
                  ? 'Em Andamento'
                  : pedido.status === 'Em Andamento'
                  ? 'Finalizado'
                  : 'Aberto',
            }
          : pedido
      )
    );
  };

  const cancelarPedido = (id) => {
    setPedidos((prev) =>
      prev.map((pedido) =>
        pedido.id === id
          ? { ...pedido, status: 'Cancelado' }
          : pedido
      )
    );
  };

  const handleLongPress = (id) => {
    Alert.alert(
      'Remover Pedido',
      'Tem certeza que deseja apagar este pedido?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Apagar',
          onPress: () => {
            setPedidos(pedidos.filter(pedido => pedido.id !== id));
            Alert.alert('Pedido apagado com sucesso!');
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => alterarStatus(item.id)}
      onLongPress={() => handleLongPress(item.id)}
      delayLongPress={500}
      activeOpacity={0.8}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.statusIndicator, statusIndicatorStyle[item.status]]} />
        <View style={styles.cardContent}>
          <Text style={styles.titulo}>{item.titulo}</Text>
          {item.descricao ? (
            <Text style={styles.descricao}>{item.descricao}</Text>
          ) : null}
          <Text style={styles.dataPedido}>Data: {item.data}</Text>
          {item.arquivo && (
            <Text style={styles.arquivoNome}>Arquivo: {item.arquivo.name}</Text>
          )}
        </View>
        <View style={styles.cardActions}>
          <View style={[styles.statusBadge, statusBadgeStyle[item.status]]}>
            <Text style={[styles.statusText, statusTextStyle[item.status]]}>{item.status}</Text>
          </View>
          {item.status !== 'Cancelado' && (
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={() => cancelarPedido(item.id)}
            >
              <Ionicons name="close-circle" size={24} color="#ff4757" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1a1a1a" barStyle="light-content" />
      
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTitleContainer}>
            <Ionicons name="clipboard" size={28} color="#7c3aed" />
            <Text style={styles.headerTitle}>Portal de Pedidos</Text>
          </View>
          <View style={styles.headerStats}>
            <Text style={styles.statsText}>{pedidos.length} pedidos</Text>
          </View>
        </View>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        {/* NOVO PEDIDO BUTTON */}
        <TouchableOpacity 
          style={styles.newOrderButton} 
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
          <View style={styles.buttonContent}>
            <View style={styles.buttonIconContainer}>
              <Ionicons name="add" size={24} color="#fff" />
            </View>
            <Text style={styles.buttonText}>Novo Pedido</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </View>
        </TouchableOpacity>

        {/* BOTÃO PARA IR PARA RELATÓRIO */}
        <TouchableOpacity 
          style={[styles.newOrderButton, {backgroundColor: '#00a8ff', marginBottom: 10}]} 
          onPress={() => navigation.navigate('Relatorios', { pedidos })}
          activeOpacity={0.8}
        >
          <View style={styles.buttonContent}>
            <Ionicons name="document-text" size={24} color="#fff" />
            <Text style={[styles.buttonText, {marginLeft: 15}]}>Ver Relatório</Text>
          </View>
        </TouchableOpacity>

        {/* PEDIDOS LIST */}
        <FlatList
          data={pedidos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="document-text-outline" size={80} color="#444" />
              <Text style={styles.emptyTitle}>Nenhum pedido ainda</Text>
              <Text style={styles.emptySubtitle}>Toque no botão acima para criar seu primeiro pedido</Text>
            </View>
          }
        />
      </View>

      {/* MODAL */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Novo Pedido</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalForm}>
              <View style={styles.inputContainer}>
                <Ionicons name="text" size={20} color="#7c3aed" />
                <TextInput
                  placeholder="Título do pedido"
                  value={titulo}
                  onChangeText={setTitulo}
                  style={styles.input}
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="document-text" size={20} color="#7c3aed" />
                <TextInput
                  placeholder="Descrição detalhada"
                  value={descricao}
                  onChangeText={setDescricao}
                  style={[styles.input, styles.textArea]}
                  placeholderTextColor="#999"
                  multiline
                  numberOfLines={3}
                />
              </View>

              <TouchableOpacity 
                onPress={() => setMostrarData(true)} 
                style={styles.dateContainer}
              >
                <Ionicons name="calendar" size={20} color="#7c3aed" />
                <Text style={styles.dateText}>
                  {dataSelecionada.toLocaleDateString('pt-BR')}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#666" />
              </TouchableOpacity>

              {mostrarData && (
                <DateTimePicker
                  value={dataSelecionada}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || dataSelecionada;
                    setMostrarData(false);
                    setDataSelecionada(currentDate);
                  }}
                />
              )}

              <TouchableOpacity 
                style={styles.uploadContainer} 
                onPress={async () => {
                  let result = await DocumentPicker.getDocumentAsync({});
                  if (result.type === 'success') {
                    setArquivo(result);
                  }
                }}
              >
                <Ionicons name={arquivo ? "document" : "attach"} size={20} color="#7c3aed" />
                <Text style={styles.uploadText}>
                  {arquivo ? `${arquivo.name}` : 'Anexar arquivos'}
                </Text>
                {arquivo && <Ionicons name="checkmark-circle" size={20} color="#00c851" />}
              </TouchableOpacity>

              <TouchableOpacity onPress={adicionarPedido} style={styles.submitButton}>
                <Ionicons name="send" size={20} color="#fff" />
                <Text style={styles.submitButtonText}>Enviar Pedido</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Menu inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.7}
        >
          <Ionicons name="home" size={24} color="#666" />
          <Text style={styles.navText}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Work')}
          activeOpacity={0.7}
        >
          <Ionicons name="briefcase-outline" size={24} color="#666" />
          <Text style={styles.navText}>Projetos</Text>
        </TouchableOpacity>

        <TouchableOpacity 
         style={[styles.navItem, styles.activeNavItem]}
          onPress={() => navigation.navigate('Pedidos')}
          activeOpacity={0.7}
        >
          <Ionicons name="document-text-outline" size={24} color="#7c3aed" />
          <Text  style={[styles.navText, styles.activeNavText]}>Pedidos</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

// Tela de Relatório
export function RelatorioScreen({ route, navigation }) {
  const { pedidos } = route.params;

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={[styles.statusIndicator, statusIndicatorStyle[item.status]]} />
        <View style={styles.cardContent}>
          <Text style={styles.titulo}>{item.titulo}</Text>
          {item.descricao ? <Text style={styles.descricao}>{item.descricao}</Text> : null}
          <Text style={styles.dataPedido}>Data: {item.data}</Text>
          {item.arquivo && <Text style={styles.arquivoNome}>Arquivo: {item.arquivo.name}</Text>}
          <Text style={styles.statusRelatorio}>Status: {item.status}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1a1a1a" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={[styles.headerTitle, {textAlign: 'center', marginVertical: 15}]}>Relatório de Pedidos</Text>
      </View>
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={80} color="#444" />
            <Text style={styles.emptyTitle}>Nenhum pedido para mostrar</Text>
          </View>
        }
      />
      <TouchableOpacity
        style={[styles.newOrderButton, {margin: 20, backgroundColor: '#7c3aed'}]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos comuns e específicos
const statusIndicatorStyle = {
  Aberto: { backgroundColor: '#FFA500' },
  'Em Andamento': { backgroundColor: '#00a8ff' },
  Finalizado: { backgroundColor: '#00c851' },
  Cancelado: { backgroundColor: '#ff4757' },
};

const statusBadgeStyle = {
  Aberto: { backgroundColor: '#ffb347' },
  'Em Andamento': { backgroundColor: '#33b5e5' },
  Finalizado: { backgroundColor: '#00c851' },
  Cancelado: { backgroundColor: '#ff4444' },
};

const statusTextStyle = {
  Aberto: { color: '#663d00' },
  'Em Andamento': { color: '#005580' },
  Finalizado: { color: '#005500' },
  Cancelado: { color: '#990000' },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    backgroundColor: '#111',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#7c3aed',
    fontWeight: 'bold',
    fontSize: 24,
    marginLeft: 8,
  },
  headerStats: {
    backgroundColor: '#333',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  statsText: {
    color: '#aaa',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  newOrderButton: {
    flexDirection: 'row',
    backgroundColor: '#7c3aed',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIconContainer: {
    marginRight: 15,
    backgroundColor: '#5b21b6',
    borderRadius: 20,
    padding: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  listContainer: {
    paddingBottom: 60,
  },
  card: {
    backgroundColor: '#222',
    borderRadius: 8,
    marginBottom: 15,
    padding: 15,
    flexDirection: 'row',
  },
  cardHeader: {
    flexDirection: 'row',
    flex: 1,
  },
  statusIndicator: {
    width: 10,
    borderRadius: 5,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  titulo: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  descricao: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 4,
  },
  dataPedido: {
    color: '#999',
    fontSize: 12,
    marginTop: 6,
  },
  arquivoNome: {
    color: '#00c851',
    fontSize: 13,
    marginTop: 6,
  },
  statusRelatorio: {
    color: '#ddd',
    fontWeight: 'bold',
    marginTop: 6,
  },
  cardActions: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  cancelButton: {
    marginTop: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyTitle: {
    color: '#666',
    fontSize: 20,
    marginTop: 15,
  },
  emptySubtitle: {
    color: '#666',
    fontSize: 14,
    marginTop: 5,
    maxWidth: width * 0.7,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
  },
  modalContent: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  closeButton: {
    padding: 5,
  },
  modalForm: {
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#7c3aed',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
  },
  input: {
    flex: 1,
    paddingLeft: 8,
    fontSize: 16,
    color: '#222',
  },
  textArea: {
    height: 60,
    textAlignVertical: 'top',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#7c3aed',
    borderBottomWidth: 1,
    paddingVertical: 8,
    marginBottom: 15,
  },
  dateText: {
    flex: 1,
    paddingLeft: 8,
    fontSize: 16,
    color: '#222',
  },
  uploadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#7c3aed',
    borderBottomWidth: 1,
    paddingVertical: 8,
    marginBottom: 20,
  },
  uploadText: {
    flex: 1,
    paddingLeft: 8,
    fontSize: 16,
    color: '#222',
  },
  submitButton: {
    backgroundColor: '#7c3aed',
    paddingVertical: 12,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeNavItem: {
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    borderRadius: 8,
  },
  navText: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  activeNavText: {
    color: '#7c3aed',
    fontWeight: '600',
  },
});
