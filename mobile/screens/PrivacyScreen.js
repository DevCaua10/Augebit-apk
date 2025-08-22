import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PrivacyPolicyScreen({ navigation }) {
  const handleEmailPress = () => {
    Linking.openURL('mailto:privacidade@augebit.com');
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleGoBack}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Ionicons name="shield-checkmark" size={48} color="#fff" style={styles.headerIcon} />
          <Text style={styles.headerTitle}>Política de Privacidade</Text>
          <Text style={styles.headerSubtitle}>Seus dados estão seguros conosco</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Seção: Dados Coletados */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="document-text" size={24} color="#3d6dfb" />
            <Text style={styles.sectionTitle}>Dados Coletados</Text>
          </View>
          <Text style={styles.sectionText}>
            Coletamos apenas os dados essenciais para funcionamento e melhoria do app:
          </Text>
          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <Ionicons name="person" size={16} color="#666" />
              <Text style={styles.listText}>Nome e e-mail</Text>
            </View>
            <View style={styles.listItem}>
              <Ionicons name="analytics" size={16} color="#666" />
              <Text style={styles.listText}>Informações de uso</Text>
            </View>
            <View style={styles.listItem}>
              <Ionicons name="phone-portrait" size={16} color="#666" />
              <Text style={styles.listText}>IP, dispositivo e sistema</Text>
            </View>
          </View>
        </View>

        {/* Seção: Como Usamos */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="settings" size={24} color="#28a745" />
            <Text style={styles.sectionTitle}>Como Usamos Seus Dados</Text>
          </View>
          <Text style={styles.sectionText}>
            Usamos seus dados para:
          </Text>
          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <Ionicons name="star" size={16} color="#666" />
              <Text style={styles.listText}>Personalizar sua experiência</Text>
            </View>
            <View style={styles.listItem}>
              <Ionicons name="build" size={16} color="#666" />
              <Text style={styles.listText}>Corrigir erros</Text>
            </View>
            <View style={styles.listItem}>
              <Ionicons name="notifications" size={16} color="#666" />
              <Text style={styles.listText}>Enviar notificações e prestar suporte</Text>
            </View>
          </View>
        </View>

        {/* Seção: Compartilhamento */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="share-social" size={24} color="#ffc107" />
            <Text style={styles.sectionTitle}>Compartilhamento de Dados</Text>
          </View>
          <Text style={styles.sectionText}>
            Não vendemos seus dados. Compartilhamos apenas com parceiros de confiança para prestar os serviços necessários.
          </Text>
        </View>

        {/* Seção: Segurança */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="lock-closed" size={24} color="#dc3545" />
            <Text style={styles.sectionTitle}>Segurança</Text>
          </View>
          <Text style={styles.sectionText}>
            Seus dados estão protegidos com medidas técnicas e administrativas rigorosas.
          </Text>
        </View>

        {/* Seção: Seus Direitos */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="checkmark-circle" size={24} color="#6f42c1" />
            <Text style={styles.sectionTitle}>Seus Direitos</Text>
          </View>
          <Text style={styles.sectionText}>
            Você pode:
          </Text>
          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <Ionicons name="eye" size={16} color="#666" />
              <Text style={styles.listText}>Acessar, corrigir ou excluir seus dados</Text>
            </View>
            <View style={styles.listItem}>
              <Ionicons name="close-circle" size={16} color="#666" />
              <Text style={styles.listText}>Revogar consentimentos</Text>
            </View>
            <View style={styles.listItem}>
              <Ionicons name="mail" size={16} color="#666" />
              <Text style={styles.listText}>
                Falar conosco: 
                <Text style={styles.emailLink} onPress={handleEmailPress}> privacidade@augebit.com</Text>
              </Text>
            </View>
          </View>
        </View>

        {/* Seção: Informações Adicionais */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Ionicons name="information-circle" size={24} color="#17a2b8" />
            <Text style={styles.infoTitle}>Informações Importantes</Text>
          </View>
          <Text style={styles.infoText}>
            💡 Mantenha o app atualizado para garantir segurança e melhorias.
          </Text>
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>Versão do App: 2.1.0</Text>
            <Text style={styles.versionText}>Última atualização: Junho 2025</Text>
          </View>
        </View>

        {/* Botão de Contato */}
        <TouchableOpacity style={styles.contactButton} onPress={handleEmailPress}>
          <Ionicons name="mail" size={20} color="#fff" />
          <Text style={styles.contactButtonText}>Entrar em Contato</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#1a1a2e',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 40,
    paddingHorizontal: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 30,
    padding: 8,
    zIndex: 1,
  },
  headerContent: {
    alignItems: 'center',
    marginTop: 20,
  },
  headerIcon: {
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#bbb',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 30,
    paddingTop: 40,
    paddingBottom: 40,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 12,
  },
  sectionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 16,
  },
  listContainer: {
    marginLeft: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  listText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginLeft: 12,
    flex: 1,
  },
  emailLink: {
    color: '#3d6dfb',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  infoCard: {
    backgroundColor: '#e3f2fd',
    borderRadius: 16,
    padding: 24,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#bbdefb',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d47a1',
    marginLeft: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#1565c0',
    lineHeight: 24,
    marginBottom: 16,
  },
  versionContainer: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#bbdefb',
  },
  versionText: {
    fontSize: 14,
    color: '#1976d2',
    marginBottom: 4,
    fontWeight: '500',
  },
  contactButton: {
    backgroundColor: '#3d6dfb',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3d6dfb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});