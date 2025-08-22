import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen({ navigation }) {
  const [showTechnicalInfo, setShowTechnicalInfo] = useState(false);

  const appInfo = {
    name: 'MeuApp',
    version: '1.2.3',
    buildNumber: '45',
    releaseDate: '15 de Janeiro, 2025',
    developer: 'Sua Empresa',
    email: 'contato@suaempresa.com',
    website: 'https://www.suaempresa.com',
    github: 'https://github.com/suaempresa/meuapp'
  };

  const handleOpenLink = async (url, title) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Erro', `Não foi possível abrir ${title}`);
      }
    } catch (error) {
      Alert.alert('Erro', `Erro ao abrir ${title}`);
    }
  };

  const handleEmailSupport = () => {
    const subject = encodeURIComponent(`Suporte - ${appInfo.name} v${appInfo.version}`);
    const body = encodeURIComponent(`
Olá equipe de suporte,

Informações do dispositivo:
- Versão do App: ${appInfo.version}
- Plataforma: ${Platform.OS}
- Versão do Sistema: ${Platform.Version}

Descreva seu problema ou dúvida:

`);
    const emailUrl = `mailto:${appInfo.email}?subject=${subject}&body=${body}`;
    handleOpenLink(emailUrl, 'E-mail');
  };

  const handleRateApp = () => {
    // URLs das lojas
    const storeUrl = Platform.OS === 'ios' 
      ? 'https://apps.apple.com/app/id123456789' // Substitua pelo ID real
      : 'https://play.google.com/store/apps/details?id=com.suaempresa.meuapp'; // Substitua pelo package name real
    
    Alert.alert(
      'Avaliar App',
      'Gostaria de avaliar nosso app na loja?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Avaliar', onPress: () => handleOpenLink(storeUrl, 'Loja de Apps') }
      ]
    );
  };

  const handleShareApp = () => {
    const shareMessage = `Confira o ${appInfo.name}! Um app incrível que uso no meu dia a dia. Disponível na loja de apps.`;
    
    // Aqui você pode implementar o compartilhamento nativo
    Alert.alert(
      'Compartilhar',
      shareMessage,
      [
        { text: 'OK' }
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
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Sobre o App</Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo e Informações Básicas */}
        <View style={styles.appInfoSection}>
          <View style={styles.logoContainer}>
            <Image 
              source={{ uri: 'https://via.placeholder.com/100x100/3d6dfb/ffffff?text=APP' }}
              style={styles.appLogo}
            />
          </View>
          
          <Text style={styles.appName}>{appInfo.name}</Text>
          <Text style={styles.appVersion}>Versão {appInfo.version}</Text>
          <Text style={styles.releaseDate}>Lançado em {appInfo.releaseDate}</Text>
        </View>

        {/* Descrição do App */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Sobre</Text>
          <Text style={styles.description}>
            {appInfo.name} é um aplicativo moderno e intuitivo desenvolvido para facilitar seu dia a dia. 
            Com uma interface elegante e funcionalidades poderosas, oferecemos a melhor experiência 
            para nossos usuários.
          </Text>
          <Text style={styles.description}>
            Nossa missão é simplificar tarefas complexas e proporcionar uma experiência única 
            através da tecnologia.
          </Text>
        </View>

        {/* Recursos Principais */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recursos Principais</Text>
          
          <View style={styles.featureItem}>
            <Ionicons name="flash-outline" size={24} color="#3d6dfb" />
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Rápido e Eficiente</Text>
              <Text style={styles.featureDescription}>Interface otimizada para máxima performance</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="shield-checkmark-outline" size={24} color="#3d6dfb" />
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Seguro e Confiável</Text>
              <Text style={styles.featureDescription}>Seus dados protegidos com criptografia avançada</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="sync-outline" size={24} color="#3d6dfb" />
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Sincronização em Tempo Real</Text>
              <Text style={styles.featureDescription}>Seus dados sempre atualizados em todos os dispositivos</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="palette-outline" size={24} color="#3d6dfb" />
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Interface Moderna</Text>
              <Text style={styles.featureDescription}>Design intuitivo e experiência de usuário excepcional</Text>
            </View>
          </View>
        </View>

        {/* Ações */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Ações</Text>
          
          <TouchableOpacity style={styles.actionItem} onPress={handleRateApp}>
            <View style={styles.actionLeft}>
              <Ionicons name="star-outline" size={24} color="#666" />
              <Text style={styles.actionText}>Avaliar na Loja</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={handleShareApp}>
            <View style={styles.actionLeft}>
              <Ionicons name="share-outline" size={24} color="#666" />
              <Text style={styles.actionText}>Compartilhar App</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={handleEmailSupport}>
            <View style={styles.actionLeft}>
              <Ionicons name="mail-outline" size={24} color="#666" />
              <Text style={styles.actionText}>Contatar Suporte</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Links Úteis */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Links Úteis</Text>
          
          <TouchableOpacity 
            style={styles.linkItem} 
            onPress={() => handleOpenLink(appInfo.website, 'Website')}
          >
            <View style={styles.linkLeft}>
              <Ionicons name="globe-outline" size={24} color="#3d6dfb" />
              <View style={styles.linkTextContainer}>
                <Text style={styles.linkTitle}>Website Oficial</Text>
                <Text style={styles.linkUrl}>{appInfo.website}</Text>
              </View>
            </View>
            <Ionicons name="open-outline" size={18} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.linkItem} 
            onPress={() => handleOpenLink(appInfo.github, 'GitHub')}
          >
            <View style={styles.linkLeft}>
              <Ionicons name="logo-github" size={24} color="#3d6dfb" />
              <View style={styles.linkTextContainer}>
                <Text style={styles.linkTitle}>Código Fonte</Text>
                <Text style={styles.linkUrl}>GitHub Repository</Text>
              </View>
            </View>
            <Ionicons name="open-outline" size={18} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Informações Técnicas */}
        <View style={styles.sectionContainer}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => setShowTechnicalInfo(!showTechnicalInfo)}
          >
            <Text style={styles.sectionTitle}>Informações Técnicas</Text>
            <Ionicons 
              name={showTechnicalInfo ? "chevron-up-outline" : "chevron-down-outline"} 
              size={20} 
              color="#666" 
            />
          </TouchableOpacity>
          
          {showTechnicalInfo && (
            <View style={styles.technicalInfo}>
              <View style={styles.techItem}>
                <Text style={styles.techLabel}>Versão:</Text>
                <Text style={styles.techValue}>{appInfo.version}</Text>
              </View>
              
              <View style={styles.techItem}>
                <Text style={styles.techLabel}>Build:</Text>
                <Text style={styles.techValue}>{appInfo.buildNumber}</Text>
              </View>
              
              <View style={styles.techItem}>
                <Text style={styles.techLabel}>Plataforma:</Text>
                <Text style={styles.techValue}>{Platform.OS === 'ios' ? 'iOS' : 'Android'}</Text>
              </View>
              
              <View style={styles.techItem}>
                <Text style={styles.techLabel}>Versão do Sistema:</Text>
                <Text style={styles.techValue}>{Platform.Version}</Text>
              </View>
              
              <View style={styles.techItem}>
                <Text style={styles.techLabel}>Desenvolvido com:</Text>
                <Text style={styles.techValue}>React Native</Text>
              </View>
            </View>
          )}
        </View>

        {/* Informações da Empresa */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerTitle}>Desenvolvido por</Text>
          <Text style={styles.companyName}>{appInfo.developer}</Text>
          <Text style={styles.footerText}>© 2025 {appInfo.developer}. Todos os direitos reservados.</Text>
          
          <TouchableOpacity 
            style={styles.emailButton}
            onPress={() => handleOpenLink(`mailto:${appInfo.email}`, 'E-mail')}
          >
            <Ionicons name="mail-outline" size={16} color="#3d6dfb" />
            <Text style={styles.emailText}>{appInfo.email}</Text>
          </TouchableOpacity>
        </View>
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
  appInfoSection: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 30,
  },
  logoContainer: {
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  appLogo: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  appVersion: {
    fontSize: 18,
    color: '#3d6dfb',
    fontWeight: '600',
    marginBottom: 4,
  },
  releaseDate: {
    fontSize: 14,
    color: '#666',
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
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 12,
    textAlign: 'justify',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  featureTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
    fontWeight: '500',
  },
  linkItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  linkLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  linkTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  linkTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  linkUrl: {
    fontSize: 14,
    color: '#3d6dfb',
  },
  technicalInfo: {
    marginTop: 10,
  },
  techItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  techLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  techValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  footerContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  footerTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 12,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginBottom: 16,
  },
  emailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f0f4ff',
    borderRadius: 20,
  },
  emailText: {
    fontSize: 14,
    color: '#3d6dfb',
    marginLeft: 6,
    fontWeight: '500',
  },
});