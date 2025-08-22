import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  Platform,
  ImageBackground,
  Animated,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const socialIcons = [
  { icon: require('../img/twitter.png'), name: 'Twitter', url: 'https://twitter.com' },
  { icon: require('../img/facebook.png'), name: 'Facebook', url: 'https://facebook.com' },
  { icon: require('../img/instagram.png'), name: 'Instagram', url: 'https://instagram.com' },
  { icon: require('../img/linkedin.png'), name: 'LinkedIn', url: 'https://linkedin.com' },
  { icon: require('../img/whatsapp.png'), name: 'WhatsApp', url: 'https://wa.me' },
];

const services = [
  {
    id: 1,
    title: 'Gerenciamento de Empreendimentos',
    description: 'Supervisão e execução total, garantindo resultados dentro do prazo e custo.',
    image: require('../img/empreendimento.jpg'),
    color: '#007bff'
  },
  {
    id: 2,
    title: 'Automação Industrial',
    description: 'Soluções inteligentes para otimizar processos industriais e aumentar a eficiência.',
    image: require('../img/automacao.jpg'),
    color: '#28a745'
  },
  {
    id: 3,
    title: 'Consultoria Tecnológica',
    description: 'Análise especializada para implementação de novas tecnologias em seu negócio.',
    image: require('../img/engenheiro.png'),
    color: '#dc3545'
  }
];

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [currentService, setCurrentService] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scrollViewRef = useRef(null);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleServiceScroll = (event) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const currentIndex = Math.round(contentOffset.x / layoutMeasurement.width);
    setCurrentService(currentIndex);
  };

  const scrollToServices = () => {
    if (scrollViewRef.current) {
      const scrollPosition = Platform.select({
        ios: height * 0.55,
        android: height * 0.6
      });
      
      scrollViewRef.current.scrollTo({
        y: scrollPosition,
        animated: true
      });
    }
  };

  const renderServiceCard = ({ item, index }) => (
    <View style={[styles.serviceCard, { borderTopColor: item.color }]}>
      <Image source={item.image} style={styles.serviceImage} />
      <View style={styles.serviceContent}>
        <Text style={styles.serviceTitle}>{item.title}</Text>
        <Text style={styles.serviceDescription}>{item.description}</Text>
        <TouchableOpacity
          style={[styles.serviceButton, { backgroundColor: item.color }]}
          onPress={() => {
            
            switch (item.id) {
              case 1:
                navigation.navigate('gerenciamento');
                break;
              case 2:
                navigation.navigate('automacao');
                break;
              case 3:
                navigation.navigate('consultoria');
                break;
              default:
                break;
            }
          }}
        >
          <Text style={styles.serviceButtonText}>Saiba Mais</Text>
          <Ionicons name="arrow-forward" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
  

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1a1a1a" barStyle="light-content" />

      <Animated.View style={[styles.header, {
        backgroundColor: scrollY.interpolate({
          inputRange: [0, 100],
          outputRange: ['#000', '#000'],
          extrapolate: 'clamp',
        })
      }]}>
        <View style={styles.logoContainer}>
          <View style={styles.logoTextContainer}>
            <Image
              source={require('../img/logo.png')}
              style={styles.logoImage}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.userButton}
          onPress={() => navigation.navigate('Profile')}
          activeOpacity={0.7}
        >
          <Ionicons name="person-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      <Animated.ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <Animated.View
          style={[
            styles.heroContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <ImageBackground
            source={require('../img/fundo1.png')}
            style={styles.heroBackground}
            imageStyle={styles.heroBackgroundImage}
          >
            <View style={styles.heroOverlay}>
              <Text style={styles.heroTitle}>
                Serviços Integrados em{'\n'}
                <Text style={styles.heroHighlight}>Engenharia e Tecnologia</Text>
              </Text>
              <Text style={styles.heroSubtitle}>
                Transformamos ideias em soluções inteligentes para maximizar o sucesso de seu projeto.
              </Text>
              <TouchableOpacity style={styles.heroButton} onPress={scrollToServices}>
                <Text style={styles.heroButtonText}>Conheça Nossos Serviços</Text>
                <Ionicons name="rocket-outline" size={20} color="#fff" style={{ marginLeft: 8 }} />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </Animated.View>

        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>Nossos Serviços</Text>
          <FlatList
            data={services}
            renderItem={renderServiceCard}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleServiceScroll}
            contentContainerStyle={styles.servicesContainer}
          />

          <View style={styles.dotsContainer}>
            {services.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentService && styles.activeDot
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.techSection}>
          <View style={styles.sectionTitleContainer}>
            <View style={styles.line} />
            <Text style={styles.sectionTitleText}>Nossos Projetos</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.techGrid}>
            <TouchableOpacity style={[styles.techItem, styles.techItem1]} activeOpacity={0.8}>
              <Ionicons name="construct" size={32} color="#fff" style={styles.techIcon} />
              <Text style={styles.techText}>Manutenção</Text>
              <Text style={styles.techSubtext}>Preventiva e Corretiva</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.techItem, styles.techItem2]} activeOpacity={0.8}>
              <Ionicons name="analytics" size={32} color="#fff" style={styles.techIcon} />
              <Text style={styles.techText}>Otimização</Text>
              <Text style={styles.techSubtext}>Processos Eficientes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.techItem, styles.techItem3]} activeOpacity={0.8}>
              <Ionicons name="hardware-chip" size={32} color="#fff" style={styles.techIcon} />
              <Text style={styles.techText}>Automação</Text>
              <Text style={styles.techSubtext}>Tecnologia Avançada</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsHeader}>
            <Text style={styles.statsTitle}>Nossos Números</Text>
            <Text style={styles.statsSubtitle}>Resultados que comprovam nossa excelência</Text>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>+150</Text>
              <Text style={styles.statLabel}>Projetos Entregues</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>98%</Text>
              <Text style={styles.statLabel}>Satisfação do Cliente</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>10+</Text>
              <Text style={styles.statLabel}>Anos de Experiência</Text>
            </View>
          </View>
        </View>

        <View style={styles.featuredContainer}>
          <Image
            source={require('../img/difusor.png')}
            style={styles.featuredImage}
          />

          <View style={styles.featuredOverlay}>
            <Text style={styles.featuredTitle}>Projeto em Destaque</Text>
            <Text style={styles.featuredDescription}>
              Sistema de automação completo implementado com sucesso,
              resultando em 40% de aumento na eficiência operacional.
            </Text>
          </View>
        </View>

        <View style={styles.missionContainer}>
          <View style={styles.missionContent}>
            <Text style={styles.missionTitle}>Nossa Missão</Text>
            <Text style={styles.missionText}>
              Transformamos ideias em soluções inteligentes nas áreas de automação,
              engenharia e tecnologia, sempre buscando a excelência e inovação.
            </Text>
          </View>
          <View style={styles.logoContainer2}>
            <View style={styles.logoCircle2}>
              <Text style={styles.logoText2}>A</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.contactTitle}>Entre em Contato</Text>

          <View style={styles.contactGrid}>
            <TouchableOpacity style={styles.contactItem} activeOpacity={0.7}>
              <Ionicons name="call-outline" size={20} color="#7c3aed" />
              <Text style={styles.contactText}>(11) 9999-9999</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactItem} activeOpacity={0.7}>
              <Ionicons name="mail-outline" size={20} color="#7c3aed" />
              <Text style={styles.contactText}>contato@augebit.com</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactItem} activeOpacity={0.7}>
              <Ionicons name="location-outline" size={20} color="#7c3aed" />
              <Text style={styles.contactText}>São Paulo, SP</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.socialTitle}>Nossas Redes Sociais</Text>
          <View style={styles.socialContainer}>
            {socialIcons.map((social, index) => (
              <TouchableOpacity key={index} style={styles.socialButton} activeOpacity={0.7}>
                <Image source={social.icon} style={styles.socialImage} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.footerContainerCopy}>
          <ImageBackground
            source={require('../img/fundo2.png')}
            style={styles.imageBackgroundCopy}
            imageStyle={styles.imageStyleCopy}
          >
            <Text style={styles.textCopy}>
              Copyright © 2024 Augebit - Todos os direitos reservados
            </Text>
          </ImageBackground>
        </View>
      </Animated.ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Chat')}
        activeOpacity={0.8}
      >
        <Ionicons name="chatbubble-outline" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navItem, styles.activeNavItem]}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.7}
        >
          <Ionicons name="home" size={24} color="#7c3aed" />
          <Text style={[styles.navText, styles.activeNavText]}>Início</Text>
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
          style={styles.navItem}
          onPress={() => navigation.navigate('Pedidos')}
          activeOpacity={0.7}
        >
          <Ionicons name="document-text-outline" size={24} color="#666" />
          <Text style={styles.navText}>Pedidos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: Platform.OS === 'android' ? 50 : 50,
    zIndex: 1000,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    height: '1000%', // Altura 100% do container pai
    resizeMode: 'contain',
    marginBottom:16,
    marginLeft:14,
  },
  logoTextContainer: {
    flexDirection: 'column',
  },
  logoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoSubtext: {
    color: '#aaa',
    fontSize: 12,
  },
  userButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(124, 58, 237, 0.2)',
    borderWidth: 1,
    borderColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:15,
  },
  heroContainer: {
    height: height * 0.6,
    marginTop: Platform.OS === 'android' ? 80 : 80,
  },
  heroBackground: {
    flex: 1,
    width: '100%',
  },
  heroBackgroundImage: {
    resizeMode: 'cover',
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
  },
  heroHighlight: {
    color: '#7c3aed',
    fontSize:26
    
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 24,
    marginBottom: 24,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7c3aed',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  heroButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  servicesSection: {
    marginVertical: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  servicesContainer: {
    paddingHorizontal: 10,
  },
  serviceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginHorizontal: 10,
    width: width - 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    borderTopWidth: 4,
    overflow: 'hidden',
  },
  serviceImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  serviceContent: {
    padding: 20,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  serviceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  serviceButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#444',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#7c3aed',
    width: 24,
  },
  techSection: {
    marginVertical: 20,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#7c3aed',
    marginHorizontal: 10,
  },
  sectionTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  techGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  techItem: {
    flex: 1,
    margin: 6,
    paddingVertical: 24,
    paddingHorizontal: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  techItem1: { backgroundColor: '#a06ff9' },
  techItem2: { backgroundColor: '#7c3aed' },
  techItem3: { backgroundColor: '#4e2db8' },
  techIcon: {
    marginBottom: 8,
  },
  techText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  techSubtext: {
    color: '#ddd',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  statsContainer: {
    marginHorizontal: 20,
    marginVertical: 30,
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.2)',
  },
  statsHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statsSubtitle: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#7c3aed',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#ddd',
    textAlign: 'center',
  },
  featuredContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  featuredImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  featuredOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    padding: 20,
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: 14,
    color: '#ddd',
    lineHeight: 20,
    marginBottom: 16,
  },
  featuredButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#7c3aed',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  featuredButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  missionContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#222',
    flexDirection: 'row',
    alignItems: 'center',
  },
  missionContent: {
    flex: 1,
    marginRight: 16,
  },
  missionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  missionText: {
    color: '#ddd',
    fontSize: 14,
    lineHeight: 20,
  },
  logoContainer2: {
    backgroundColor: '#1e1e1e',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoCircle2: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText2: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  footer: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  contactTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  contactGrid: {
    marginBottom: 24,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  contactText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
  },
  socialTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  socialButton: {
    marginHorizontal: 8,
    marginBottom: 8,
    padding: 12,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
  },
  socialImage: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  footerContainerCopy: {
    width: '100%',
    height: 80,
    marginBottom: 20,
  },
  imageBackgroundCopy: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyleCopy: {
    resizeMode: 'cover',
  },
  textCopy: {
    color: 'white',
    fontSize: 13,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
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