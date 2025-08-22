import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TermsOfUseScreen = ({ navigation }) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
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

  const handleAcceptTerms = () => {
    setAcceptedTerms(!acceptedTerms);
  };

  const handleContactSupport = () => {
    const email = 'juridico@augebit.com';
    const subject = 'Dúvida sobre Termos de Uso';
    const body = 'Olá,\n\nTenho uma dúvida sobre os termos de uso:\n\n';

    Linking.openURL(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const handleOpenPrivacyPolicy = () => {
    Linking.openURL('https://www.augebit.com/privacy-policy');
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

        <Text style={styles.headerTitle}>Termos de Uso</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroIconContainer}>
            <Ionicons name="document-text" size={60} color="#3d6dfb" />
          </View>
          <Text style={styles.heroTitle}>Termos de Uso</Text>
          <Text style={styles.heroSubtitle}>
            Leia com atenção os termos e condições para o uso do nosso aplicativo
          </Text>
          <Text style={styles.lastUpdated}>
            Última atualização: 15 de Janeiro de 2025
          </Text>
        </View>

        {/* Introduction */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Introdução</Text>
          <Text style={styles.contentText}>
            Bem-vindo ao MeuApp! Estes Termos de Uso ("Termos") regem o uso do nosso aplicativo móvel
            e serviços relacionados. Ao usar nosso aplicativo, você concorda em cumprir estes termos.
          </Text>
          <Text style={styles.contentText}>
            Se você não concordar com qualquer parte destes termos, não deve usar nosso aplicativo.
          </Text>
        </View>

        {/* Terms Sections */}
        {termsData.map((section, sectionIndex) => (
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
                {section.content.map((paragraph, index) => (
                  <Text key={index} style={styles.contentText}>
                    {paragraph}
                  </Text>
                ))}

                {section.list && (
                  <View style={styles.listContainer}>
                    {section.list.map((item, index) => (
                      <View key={index} style={styles.listItem}>
                        <Text style={styles.listBullet}>•</Text>
                        <Text style={styles.listText}>{item}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            )}
          </View>
        ))}

        {/* Contact Information */}
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Dúvidas sobre os Termos?</Text>
          <Text style={styles.contactDescription}>
            Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco:
          </Text>

          <TouchableOpacity style={styles.contactItem} onPress={handleContactSupport}>
            <View style={styles.contactLeft}>
              <View style={styles.contactIcon}>
                <Ionicons name="mail" size={20} color="#fff" />
              </View>
              <View style={styles.contactTextContainer}>
                <Text style={styles.contactLabel}>E-mail Jurídico</Text>
                <Text style={styles.contactValue}>juridico@augebit.com</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactItem} onPress={handleOpenPrivacyPolicy}>
            <View style={styles.contactLeft}>
              <View style={[styles.contactIcon, { backgroundColor: '#10B981' }]}>
                <Ionicons name="shield-checkmark" size={20} color="#fff" />
              </View>
              <View style={styles.contactTextContainer}>
                <Text style={styles.contactLabel}>Política de Privacidade</Text>
                <Text style={styles.contactValue}>Ver nossa política completa</Text>
              </View>
            </View>
            <Ionicons name="open-outline" size={18} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Acceptance Section */}
        <View style={styles.acceptanceSection}>
          <View style={styles.acceptanceHeader}>
            <Ionicons name="checkmark-circle" size={24} color="#3d6dfb" />
            <Text style={styles.acceptanceTitle}>Confirmação de Leitura</Text>
          </View>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={handleAcceptTerms}
          >
            <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}>
              {acceptedTerms && <Ionicons name="checkmark" size={16} color="#fff" />}
            </View>
            <Text style={styles.checkboxText}>
              Li e concordo com os Termos de Uso apresentados acima
            </Text>
          </TouchableOpacity>

          {acceptedTerms && (
            <View style={styles.acceptedIndicator}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              <Text style={styles.acceptedText}>Termos aceitos com sucesso!</Text>
            </View>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            © 2025 AugeBit. Todos os direitos reservados.
          </Text>
          <Text style={styles.footerSubtext}>
            Estes termos podem ser atualizados periodicamente.
            Recomendamos revisar regularmente.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

// Dados dos termos de uso
const termsData = [
  {
    title: 'Aceitação dos Termos',
    icon: '✅',
    content: [
      'Ao acessar e usar este aplicativo, você aceita e concorda em estar vinculado aos termos e condições deste Acordo.',
      'Se você não concordar com qualquer um destes termos e condições, não deve usar este aplicativo.'
    ]
  },
  {
    title: 'Descrição do Serviço',
    icon: '📱',
    content: [
      'Nosso aplicativo fornece uma plataforma digital para gerenciamento de dados e funcionalidades específicas conforme descrito na interface do usuário.',
      'Reservamo-nos o direito de modificar ou descontinuar o serviço a qualquer momento, com ou sem aviso prévio.'
    ]
  },
  {
    title: 'Conta do Usuário',
    icon: '👤',
    content: [
      'Para acessar algumas funcionalidades, você pode ser solicitado a criar uma conta.',
      'Você é responsável por manter a confidencialidade das informações da sua conta e senha, e por todas as atividades que ocorrem sob sua conta.'
    ]
  },
  {
    title: 'Propriedade Intelectual',
    icon: '📚',
    content: [
      'Todo o conteúdo presente no aplicativo, incluindo textos, gráficos, logos, ícones e software, são de propriedade da empresa ou de seus licenciadores.',
      'É proibida a reprodução, distribuição ou modificação sem autorização prévia por escrito.'
    ]
  },
  {
    title: 'Limitação de Responsabilidade',
    icon: '⚠️',
    content: [
      'O aplicativo é fornecido "no estado em que se encontra" e a utilização é por sua conta e risco.',
      'Não garantimos que o serviço será ininterrupto ou livre de erros.',
      'Em nenhuma circunstância a empresa será responsável por danos diretos, indiretos, incidentais ou consequentes resultantes do uso ou incapacidade de uso do aplicativo.'
    ]
  },
  {
    title: 'Alterações nos Termos',
    icon: '🔄',
    content: [
      'Podemos atualizar estes termos periodicamente.',
      'Quaisquer alterações serão notificadas no aplicativo ou por e-mail.',
      'O uso continuado do aplicativo após alterações constitui aceitação dos novos termos.'
    ]
  },
  {
    title: 'Contato',
    icon: '📞',
    content: [
      'Se você tiver perguntas sobre estes termos, entre em contato conosco pelo e-mail juridico@augebit.com.'
    ]
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 10,
    paddingBottom: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  backButton: {
    paddingRight: 10,
    paddingVertical: 5,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginRight: 35, // para compensar o botão de voltar
  },
  scrollContainer: {
    padding: 15,
    paddingBottom: 50,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 25,
  },
  heroIconContainer: {
    backgroundColor: '#d6e0ff',
    borderRadius: 50,
    padding: 20,
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginVertical: 5,
  },
  lastUpdated: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  sectionContainer: {
    marginBottom: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  sectionContent: {
    marginTop: 10,
  },
  contentText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
    lineHeight: 20,
  },
  listContainer: {
    marginLeft: 15,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  listBullet: {
    fontSize: 16,
    lineHeight: 20,
    marginRight: 8,
  },
  listText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  contactSection: {
    marginVertical: 25,
    paddingHorizontal: 10,
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 10,
  },
  contactDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e6e6e6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactIcon: {
    backgroundColor: '#3d6dfb',
    borderRadius: 20,
    padding: 8,
    marginRight: 12,
  },
  contactTextContainer: {
    flexDirection: 'column',
  },
  contactLabel: {
    fontWeight: 'bold',
    color: '#222',
    fontSize: 14,
  },
  contactValue: {
    fontSize: 12,
    color: '#555',
  },
  acceptanceSection: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  acceptanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  acceptanceTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
    marginLeft: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#3d6dfb',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#3d6dfb',
  },
  checkboxText: {
    fontSize: 15,
    color: '#333',
  },
  acceptedIndicator: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  acceptedText: {
    marginLeft: 8,
    color: '#10B981',
    fontWeight: '600',
  },
  footerContainer: {
    marginTop: 40,
    paddingHorizontal: 10,
    paddingBottom: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
  footerSubtext: {
    fontSize: 11,
    color: '#bbb',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default TermsOfUseScreen;
