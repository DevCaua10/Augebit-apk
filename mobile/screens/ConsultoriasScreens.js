import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  Platform,
  Alert,
  ImageBackground
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ConsultoriaScreen({ navigation }) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const features = [
    'Diagnóstico técnico especializado',
    'Análise de viabilidade de projetos',
    'Consultoria em eficiência energética',
    'Auditoria de processos industriais',
    'Soluções personalizadas',
    'Acompanhamento pós-implementação'
  ];

  const benefits = [
    { icon: '💡', title: 'Inovação', desc: 'Soluções criativas' },
    { icon: '📈', title: 'Crescimento', desc: 'Até 35% de melhoria' },
    { icon: '🏆', title: 'Expertise', desc: '15+ anos experiência' },
    { icon: '👥', title: 'Suporte', desc: 'Equipe dedicada' }
  ];

  const services = [
    { name: 'Diagnóstico', desc: 'Análise completa de processos' },
    { name: 'Viabilidade', desc: 'Estudo técnico-econômico' },
    { name: 'Otimização', desc: 'Melhoria de performance' },
    { name: 'Treinamento', desc: 'Capacitação de equipes' }
  ];

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, {
        backgroundColor: scrollY.interpolate({
          inputRange: [0, 100],
          outputRange: ['#000', '#000'],
          extrapolate: 'clamp',
        })
      }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" paddingBottom={16} />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image
            source={require('../img/logo2.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity
          style={styles.userButton}
          onPress={() => navigation.navigate('Profile')}
          activeOpacity={0.7}
        >
          <Ionicons name="person-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
      <ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>

          <ImageBackground
            source={require('../img/engenheiro.png')}
            style={styles.backgroundImage}
            imageStyle={styles.imageStyle}
          >
            <View style={[styles.heroContainer, { backgroundColor: 'rgba(0, 0, 0, 0.6)' }]}>
              <View style={styles.heroOverlay} />
              <View style={styles.heroContent}>
                <View style={styles.heroIcon}>
                  <Text style={styles.heroIconText}>💡</Text>
                </View>
                <Text style={styles.heroTitle}>Consultoria Especializada</Text>
                <Text style={styles.heroSubtitle}>
                  Expertise técnica para otimizar seus processos e maximizar resultados
                </Text>
              </View>
            </View>
          </ImageBackground>

          <View style={styles.contentContainer}>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Sobre o Serviço</Text>
              <Text style={styles.cardText}>
                Nossa consultoria especializada oferece diagnósticos precisos e soluções personalizadas para otimizar seus processos industriais. Com mais de 15 anos de experiência, nossa equipe identifica oportunidades de melhoria e implementa estratégias eficazes.
              </Text>
            </View>


            <View style={[styles.card, styles.statsCard]}>
              <Text style={[styles.cardTitle, { textAlign: 'center' }]}>Nossos Resultados</Text>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>300+</Text>
                  <Text style={styles.statLabel}>Consultorias</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>95%</Text>
                  <Text style={styles.statLabel}>Aprovação</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>35%</Text>
                  <Text style={styles.statLabel}>Melhoria</Text>
                </View>
              </View>
            </View>


            <View style={{ marginBottom: 24 }}>
              <Text style={styles.sectionTitle}>Nossos Serviços</Text>
              <View style={styles.gridContainer}>
                {services.map((service, index) => (
                  <View key={index} style={styles.techCard}>
                    <Text style={styles.techName}>{service.name}</Text>
                    <Text style={styles.techDesc}>{service.desc}</Text>
                  </View>
                ))}
              </View>
            </View>


            <View style={{ marginBottom: 24 }}>
              <Text style={styles.sectionTitle}>O que oferecemos</Text>
              <View style={styles.featuresContainer}>
                {features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Text style={styles.checkIcon}>✓</Text>
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </View>


            <View style={{ marginBottom: 24 }}>
              <Text style={styles.sectionTitle}>Benefícios</Text>
              <View style={styles.gridContainer}>
                {benefits.map((benefit, index) => (
                  <View key={index} style={styles.benefitCard}>
                    <Text style={styles.benefitIcon}>{benefit.icon}</Text>
                    <Text style={styles.benefitTitle}>{benefit.title}</Text>
                    <Text style={styles.benefitDesc}>{benefit.desc}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={[styles.card, styles.processCard]}>
              <Text style={styles.cardTitle}>Metodologia de Trabalho</Text>
              <View style={styles.processContainer}>
                <View style={styles.processStep}>
                  <View style={styles.processNumber}>
                    <Text style={styles.processNumberText}>1</Text>
                  </View>
                  <View style={styles.processTextContainer}>
                    <Text style={styles.processStepTitle}>Diagnóstico Inicial</Text>
                    <Text style={styles.processStepDesc}>Análise detalhada da situação atual</Text>
                  </View>
                </View>
                <View style={styles.processStep}>
                  <View style={styles.processNumber}>
                    <Text style={styles.processNumberText}>2</Text>
                  </View>
                  <View style={styles.processTextContainer}>
                    <Text style={styles.processStepTitle}>Estratégia Personalizada</Text>
                    <Text style={styles.processStepDesc}>Desenvolvimento de soluções específicas</Text>
                  </View>
                </View>
                <View style={styles.processStep}>
                  <View style={styles.processNumber}>
                    <Text style={styles.processNumberText}>3</Text>
                  </View>
                  <View style={styles.processTextContainer}>
                    <Text style={styles.processStepTitle}>Implementação e Follow-up</Text>
                    <Text style={styles.processStepDesc}>Execução e acompanhamento contínuo</Text>
                  </View>
                </View>
              </View>
            </View>


            <View style={{ marginBottom: 24 }}>
              <Text style={styles.sectionTitle}>Entre em Contato</Text>
              <View style={styles.contactContainer}>
                <View style={styles.contactItem}>

                  <Text style={styles.contactText}>(11) 9999-9999</Text>
                </View>
                <View style={styles.contactItem}>

                  <Text style={styles.contactText}>contato@augebit.com</Text>
                </View>
                <View style={styles.contactItem}>

                  <Text style={styles.contactText}>São Paulo, SP</Text>
                </View>
              </View>
            </View>


            <TouchableOpacity
              style={[styles.ctaButton, { backgroundColor: '#EA580C' }]}
              onPress={() => {
                Alert.alert(
                  "Agendamento Confirmado",
                  "Sua consultoria foi agendada, entraremos em contato o mais rápido possível. Agradecemos pelo contato, até logo!",
                  [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                  ]
                );
              }}
            >
              <Text style={styles.ctaButtonText}>Agendar Consultoria</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  content: {
    paddingTop: Platform.OS === 'android' ? 110 : 110,
  },

  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 19,
    paddingVertical: 15,
    paddingTop: Platform.OS === 'android' ? 50 : 50,
    zIndex: 1000,
  },
  logoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: -1,
  },
  logoImage: {
    width: 140,
    height: 150,
    resizeMode: 'contain',
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
    marginBottom: 16,
  },

  heroContainer: {
    height: 256,
    backgroundColor: '#EA580C',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  heroContent: {
    padding: 20,
    alignItems: 'center',
    zIndex: 1,
  },
  heroIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroIconText: {
    fontSize: 32,
    color: 'white',
  },
  heroTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  cardTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  cardText: {
    color: '#D1D5DB',
    lineHeight: 24,
  },
  statsCard: {
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(147, 51, 234, 0.2)',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#A78BFA',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  techCard: {
    width: '48%',
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  techName: {
    color: '#EA580C',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  techDesc: {
    color: '#9CA3AF',
    fontSize: 12,
    textAlign: 'center',
  },
  featuresContainer: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
  },
  checkIcon: {
    color: '#EA580C',
    fontSize: 20,
    marginRight: 12,
  },
  featureText: {
    color: '#D1D5DB',
    flex: 1,
  },
  benefitCard: {
    width: '48%',
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  benefitIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  benefitTitle: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
    textAlign: 'center',
  },
  benefitDesc: {
    color: '#9CA3AF',
    fontSize: 12,
    textAlign: 'center',
  },
  processCard: {
    backgroundColor: 'rgba(234, 88, 12, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(234, 88, 12, 0.2)',
  },
  processContainer: {
    gap: 16,
  },
  processStep: {
    flexDirection: 'row',
  },
  processNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EA580C',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 4,
  },
  processNumberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  processTextContainer: {
    flex: 1,
  },
  processStepTitle: {
    color: 'white',
    fontWeight: '600',
  },
  processStepDesc: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  contactContainer: {
    gap: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
  },
  contactIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  contactText: {
    color: 'white',
  },
  ctaButton: {
    backgroundColor: '#EA580C',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  ctaButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
});