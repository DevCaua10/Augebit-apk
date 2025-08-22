import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const HelpScreen = ({ navigation }) => {
  const [expandedSections, setExpandedSections] = useState({});

  const handleGoBack = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  const toggleSection = (sectionIndex) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionIndex]: !prev[sectionIndex]
    }));
  };

  const openWhatsApp = () => {
    const phoneNumber = '5511999999999';
    const message = 'Olá! Preciso de ajuda com o app.';
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    const fallbackUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    Linking.canOpenURL(url)
      .then((supported) => Linking.openURL(supported ? url : fallbackUrl))
      .catch((err) => console.warn('Erro ao abrir WhatsApp:', err));
  };

  const sendEmail = () => {
    const email = 'suporte@augebit.com';
    const subject = 'Solicitação de Suporte - App';
    const body = `Olá equipe de suporte,

Preciso de ajuda com o seguinte:

[Descreva seu problema aqui]

---
Informações do dispositivo:
- Plataforma: ${Platform.OS}
- Versão do SO: ${Platform.Version}
- Versão do App: 2.1.0

Aguardo retorno.

Atenciosamente,
[Seu nome]`;

    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    Linking.canOpenURL(mailtoUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(mailtoUrl);
        } else {
          Alert.alert(
            'Aplicativo de Email',
            'Não foi possível abrir o aplicativo de email. Por favor, envie um email manualmente para suporte@augebit.com',
            [{ text: 'OK' }]
          );
        }
      })
      .catch((err) => {
        console.warn('Erro ao abrir email:', err);
        Alert.alert(
          'Erro',
          'Não foi possível abrir o aplicativo de email. Tente novamente ou entre em contato pelo WhatsApp.',
          [{ text: 'OK' }]
        );
      });
  };

  const handleRateApp = () => {
    const storeUrl = Platform.OS === 'ios' 
      ? 'https://apps.apple.com/app/id123456789'
      : 'https://play.google.com/store/apps/details?id=com.suaempresa.meuapp';
    
    Alert.alert(
      'Avaliar App',
      'Gostaria de avaliar nosso app na loja?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Avaliar', onPress: () => Linking.openURL(storeUrl) }
      ]
    );
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
        
        <Text style={styles.headerTitle}>Ajuda e Suporte</Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroIconContainer}>
            <Ionicons name="help-circle" size={60} color="#3d6dfb" />
          </View>
          <Text style={styles.heroTitle}>Como podemos ajudar você?</Text>
          <Text style={styles.heroSubtitle}>
            Encontre respostas para as perguntas mais comuns ou entre em contato conosco
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>
          
          <TouchableOpacity style={styles.quickActionItem} onPress={sendEmail}>
            <View style={styles.quickActionLeft}>
              <View style={styles.quickActionIcon}>
                <Ionicons name="mail" size={24} color="#fff" />
              </View>
              <View style={styles.quickActionTextContainer}>
                <Text style={styles.quickActionTitle}>Enviar E-mail</Text>
                <Text style={styles.quickActionDescription}>Abrirá seu app de email</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickActionItem} onPress={openWhatsApp}>
            <View style={styles.quickActionLeft}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#25D366' }]}>
                <Ionicons name="logo-whatsapp" size={24} color="#fff" />
              </View>
              <View style={styles.quickActionTextContainer}>
                <Text style={styles.quickActionTitle}>WhatsApp</Text>
                <Text style={styles.quickActionDescription}>Suporte via chat</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickActionItem} onPress={handleRateApp}>
            <View style={styles.quickActionLeft}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#FF9500' }]}>
                <Ionicons name="star" size={24} color="#fff" />
              </View>
              <View style={styles.quickActionTextContainer}>
                <Text style={styles.quickActionTitle}>Avaliar App</Text>
                <Text style={styles.quickActionDescription}>Compartilhe sua experiência</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* FAQ Sections */}
        {sections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.sectionContainer}>
            <TouchableOpacity 
              style={styles.sectionHeader}
              onPress={() => toggleSection(sectionIndex)}
            >
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionIcon}>{section.icon}</Text>
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
              <Ionicons 
                name={expandedSections[sectionIndex] ? "chevron-up" : "chevron-down"} 
                size={20} 
                color="#666" 
              />
            </TouchableOpacity>
            
            {expandedSections[sectionIndex] && (
              <View style={styles.sectionContent}>
                {section.items.map((item, itemIndex) => (
                  <View key={itemIndex} style={styles.faqItem}>
                    <View style={styles.questionContainer}>
                      <View style={styles.questionIcon}>
                        <Ionicons name="help-circle-outline" size={16} color="#3d6dfb" />
                      </View>
                      <Text style={styles.question}>{item.question}</Text>
                    </View>
                    <Text style={styles.answer}>{item.answer}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}

        {/* Contact Section */}
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Horário de Atendimento</Text>
          <View style={styles.scheduleContainer}>
            <View style={styles.scheduleItem}>
              <Ionicons name="time-outline" size={20} color="#3d6dfb" />
              <View style={styles.scheduleText}>
                <Text style={styles.scheduleDay}>Segunda a Sexta</Text>
                <Text style={styles.scheduleHour}>8h às 18h</Text>
              </View>
            </View>
            <View style={styles.scheduleItem}>
              <Ionicons name="calendar-outline" size={20} color="#3d6dfb" />
              <View style={styles.scheduleText}>
                <Text style={styles.scheduleDay}>Sábado</Text>
                <Text style={styles.scheduleHour}>9h às 14h</Text>
              </View>
            </View>
            <View style={styles.scheduleItem}>
              <Ionicons name="mail-outline" size={20} color="#3d6dfb" />
              <View style={styles.scheduleText}>
                <Text style={styles.scheduleDay}>Domingo</Text>
                <Text style={styles.scheduleHour}>Apenas e-mail</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <View style={styles.tipContainer}>
            <Ionicons name="bulb-outline" size={24} color="#3d6dfb" />
            <Text style={styles.tipText}>
              Mantenha o app sempre atualizado para ter acesso às últimas funcionalidades e melhorias de segurança.
            </Text>
          </View>
          
          <Text style={styles.versionText}>
            Versão do App: 2.1.0{'\n'}
            Última atualização: Junho 2025
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

// Dados estruturados em seções
const sections = [
  {
    title: 'Primeiros Passos',
    icon: '🚀',
    items: [
      {
        question: 'Como faço login?',
        answer: 'Abra o app, insira seu e-mail e senha cadastrados e toque em "Entrar". Certifique-se de que está conectado à internet.',
      },
      {
        question: 'Como criar uma conta?',
        answer: 'Na tela de login, toque em "Criar conta", preencha seus dados pessoais e siga as instruções de verificação por e-mail.',
      },
      {
        question: 'Como verificar minha conta?',
        answer: 'Após o cadastro, verifique sua caixa de entrada (e spam) para encontrar o e-mail de verificação e clique no link fornecido.',
      },
    ],
  },
  {
    title: 'Conta e Segurança',
    icon: '🔐',
    items: [
      {
        question: 'Esqueci minha senha, e agora?',
        answer: 'Toque em "Esqueci minha senha" na tela de login, digite seu e-mail e siga as instruções enviadas para redefinir sua senha.',
      },
      {
        question: 'Como alterar minha senha?',
        answer: 'Acesse "Configurações" > "Segurança" > "Alterar senha". Digite sua senha atual e a nova senha duas vezes.',
      },
      {
        question: 'Como editar meu perfil?',
        answer: 'Vá até "Perfil" no menu principal, toque em "Editar" e atualize suas informações pessoais conforme necessário.',
      },
    ],
  },
  {
    title: 'Funcionalidades',
    icon: '⚙️',
    items: [
      {
        question: 'Como visualizar meus dados?',
        answer: 'Seus dados estão organizados na tela principal. Use os filtros e opções de visualização para personalizar a exibição.',
      },
      {
        question: 'Como exportar informações?',
        answer: 'Acesse a seção desejada, toque no ícone de compartilhamento e escolha o formato de exportação (PDF, Excel, etc.).',
      },
      {
        question: 'Como configurar notificações?',
        answer: 'Vá em "Configurações" > "Notificações" e personalize quais alertas você deseja receber e quando.',
      },
    ],
  },
  {
    title: 'Problemas Técnicos',
    icon: '🔧',
    items: [
      {
        question: 'App não carrega ou está lento?',
        answer: 'Verifique sua conexão com a internet, feche e reabra o app. Se persistir, reinicie seu dispositivo.',
      },
      {
        question: 'Como atualizar o app?',
        answer: 'Acesse a App Store (iOS) ou Google Play (Android), procure pelo app e toque em "Atualizar" se disponível.',
      },
      {
        question: 'Posso usar o app offline?',
        answer: 'Algumas funcionalidades básicas funcionam offline, mas a maioria dos recursos requer conexão com a internet.',
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#1a1a2e',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  backButton: {
    padding: 8,
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 30,
  },
  heroIconContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#f0f4ff',
    borderRadius: 50,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 12,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  sectionContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionContent: {
    marginTop: 16,
  },
  quickActionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  quickActionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3d6dfb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  quickActionTextContainer: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  quickActionDescription: {
    fontSize: 14,
    color: '#666',
  },
  faqItem: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  questionIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  answer: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginLeft: 24,
  },
  contactSection: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  scheduleContainer: {
    gap: 12,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleText: {
    marginLeft: 12,
    flex: 1,
  },
  scheduleDay: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  scheduleHour: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  footerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f0f4ff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  tipText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginLeft: 12,
    flex: 1,
  },
  versionText: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default HelpScreen;