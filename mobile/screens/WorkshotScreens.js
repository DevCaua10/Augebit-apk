import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Animated, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Se estiver usando Expo
import { Ionicons } from '@expo/vector-icons';

export default function WorkflowScreen({ navigation }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress] = useState(new Animated.Value(0));
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  const steps = [
    { 
      name: 'Aberto', 
      icon: '📋',
      description: 'Pedido criado e aguardando análise',
      color: '#ff6b6b'
    },
    { 
      name: 'Em Análise', 
      icon: '🔍',
      description: 'Sendo avaliado pela equipe',
      color: '#4ecdc4'
    },
    { 
      name: 'Em Execução', 
      icon: '⚙️',
      description: 'Desenvolvimento em andamento',
      color: '#45b7d1'
    },
    { 
      name: 'Concluído', 
      icon: '✅',
      description: 'Pedido finalizado com sucesso',
      color: '#96ceb4'
    }
  ];

  const projectInfo = {
    id: '#1234',
    name: 'Projeto Alpho',
    client: 'TechCorp Solutions',
    priority: 'Alta',
    estimatedTime: '2-3 dias úteis',
    assignee: 'João Silva'
  };

  useEffect(() => {
    // Animação da barra de progresso
    Animated.timing(progress, {
      toValue: (currentStep + 1) / steps.length,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [currentStep]);

  useEffect(() => {
    // Simula atualização automática do workflow
    const interval = setInterval(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prevStep => prevStep + 1);
        setLastUpdated(new Date());
      }
    }, 10000); // 10 segundos para demonstração

    return () => clearInterval(interval);
  }, [currentStep]);

  const handleApprove = () => {
    Alert.alert(
      "Confirmar Aprovação",
      "Tem certeza que deseja aprovar este pedido?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Aprovar", 
          style: "default",
          onPress: () => {
            if (currentStep < steps.length - 1) {
              setCurrentStep(currentStep + 1);
              setLastUpdated(new Date());
            }
          }
        }
      ]
    );
  };

  const handleRequestRevision = () => {
    Alert.alert(
      "Solicitar Revisão",
      "Deseja adicionar comentários sobre as alterações necessárias?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Solicitar", style: "destructive" }
      ]
    );
  };

  const formatTime = (date) => {
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = () => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'];
    return colors[currentStep] || '#888';
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header com gradiente */}
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.header}
          >
            <Text style={styles.title}>Workflow de Aprovação</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{steps[currentStep].name}</Text>
            </View>
          </LinearGradient>


          <View style={styles.projectCard}>
            <View style={styles.projectHeader}>
              <Text style={styles.projectTitle}>{projectInfo.name}</Text>
              <View style={[styles.priorityBadge, { backgroundColor: getStatusColor() }]}>
                <Text style={styles.priorityText}>Prioridade {projectInfo.priority}</Text>
              </View>
            </View>
            
            <View style={styles.projectDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Pedido:</Text>
                <Text style={styles.detailValue}>{projectInfo.id}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Cliente:</Text>
                <Text style={styles.detailValue}>{projectInfo.client}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Responsável:</Text>
                <Text style={styles.detailValue}>{projectInfo.assignee}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Prazo estimado:</Text>
                <Text style={styles.detailValue}>{projectInfo.estimatedTime}</Text>
              </View>
            </View>
          </View>

          {/* Barra de Progresso */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressTitle}>Progresso do Pedido</Text>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBg}>
                <Animated.View
                  style={[
                    styles.progressBarFill,
                    {
                      width: progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%'],
                      }),
                      backgroundColor: getStatusColor(),
                    },
                  ]}
                />
              </View>
              <Text style={styles.progressPercentage}>
                {Math.round(((currentStep + 1) / steps.length) * 100)}%
              </Text>
            </View>
          </View>

          {/* Steps do Workflow */}
          <View style={styles.stepsContainer}>
            <Text style={styles.stepsTitle}>Etapas do Processo</Text>
            {steps.map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <View style={styles.stepLeft}>
                  <View
                    style={[
                      styles.stepCircle,
                      {
                        backgroundColor: index <= currentStep ? step.color : '#444',
                        borderColor: index === currentStep ? step.color : '#666',
                        borderWidth: index === currentStep ? 3 : 1,
                      },
                    ]}
                  >
                    {index <= currentStep ? (
                      <Text style={styles.stepIcon}>{step.icon}</Text>
                    ) : (
                      <View style={styles.stepNumber}>
                        <Text style={styles.stepNumberText}>{index + 1}</Text>
                      </View>
                    )}
                  </View>
                  {index < steps.length - 1 && (
                    <View
                      style={[
                        styles.stepLine,
                        { backgroundColor: index < currentStep ? step.color : '#444' },
                      ]}
                    />
                  )}
                </View>
                <View style={styles.stepContent}>
                  <Text
                    style={[
                      styles.stepName,
                      { color: index <= currentStep ? '#fff' : '#888' },
                    ]}
                  >
                    {step.name}
                  </Text>
                  <Text style={styles.stepDescription}>{step.description}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Informações de Atualização */}
          <View style={styles.updateInfo}>
            <Text style={styles.updateText}>
              🕒 Última atualização: {formatTime(lastUpdated)}
            </Text>
          </View>

          {/* Botões de Ação */}
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.approveButton, { opacity: currentStep === steps.length - 1 ? 0.5 : 1 }]}
              onPress={handleApprove}
              disabled={currentStep === steps.length - 1}
            >
              <Text style={styles.buttonText}>
                {currentStep === steps.length - 1 ? '✓ Aprovado' : '👍 Aprovar'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.revisionButton}
              onPress={handleRequestRevision}
            >
              <Text style={styles.buttonText}>📝 Solicitar Revisão</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Menu Inferior */}
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
         style={[styles.navItem, styles.activeNavItem]}
          onPress={() => navigation.navigate('Work')}
          activeOpacity={0.7}
        >
          <Ionicons name="briefcase-outline" size={24} color="#7c3aed" />
          <Text style={[styles.navText, styles.activeNavText]}>Projetos</Text>
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
    backgroundColor: '#0f1419',
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    paddingBottom: 100,
  },
  header: {
    padding: 24,
    paddingTop: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statusBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  projectCard: {
    backgroundColor: '#1a2332',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  projectTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  projectDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    color: '#888',
    fontSize: 14,
  },
  detailValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  progressContainer: {
    margin: 20,
    marginTop: 0,
  },
  progressTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: '#2a3441',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressPercentage: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    minWidth: 40,
  },
  stepsContainer: {
    margin: 20,
    marginTop: 0,
  },
  stepsTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepLeft: {
    alignItems: 'center',
    marginRight: 16,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepIcon: {
    fontSize: 18,
  },
  stepNumber: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepLine: {
    width: 2,
    height: 30,
    marginTop: 4,
  },
  stepContent: {
    flex: 1,
    paddingTop: 4,
  },
  stepName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  stepDescription: {
    color: '#888',
    fontSize: 13,
    lineHeight: 18,
  },
  updateInfo: {
    margin: 20,
    marginTop: 0,
    padding: 12,
    backgroundColor: '#1a2332',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4ecdc4',
  },
  updateText: {
    color: '#ccc',
    fontSize: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    margin: 20,
    gap: 12,
  },
  approveButton: {
    flex: 1,
    backgroundColor: '#4caf50',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
  },
  revisionButton: {
    flex: 1,
    backgroundColor: '#ff9800',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
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