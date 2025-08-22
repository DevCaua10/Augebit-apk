import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Animated,
  Alert,
  Dimensions,
  StatusBar,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([
    { 
      id: '1', 
      text: '👋 Olá! Sou a assistente virtual da TechCorp. Como posso ajudar você hoje?', 
      fromUser: false, 
      time: '10:00',
      type: 'welcome'
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [typingAnimation] = useState(new Animated.Value(0));
  const [agentAvatar] = useState('🤖');
  const [userAvatar] = useState('👤');
  const flatListRef = useRef();

  const quickReplies = [
    { text: " Status do meu pedido", category: "pedido" },
    { text: " Problema com entrega", category: "entrega" },
    { text: "Falar com atendente", category: "humano" },
    { text: " Cancelar pedido",  category: "cancelamento" },
    { text: " Sugestões",  category: "sugestoes" },
    { text: " Contato",  category: "contato" }
  ];

  const predefinedResponses = {
    pedido: [
      "🔍 Verificando o status do seu pedido...",
      "✅ Seu pedido #12345 está confirmado!\n📦 Status: Preparando para envio\n🚚 Previsão: 2-3 dias úteis\n📱 Você receberá atualizações por SMS",
    ],
    entrega: [
      "😔 Lamento saber sobre o problema com a entrega.",
      "📝 Por favor, me informe:\n• Número do pedido\n• Qual foi o problema específico?\n• Endereço de entrega\n\nVou resolver isso rapidamente para você! 💪"
    ],
    humano: [
      "🔄 Conectando você com um atendente humano...",
      "👨‍💼 Você está na fila de atendimento.\n⏱️ Tempo estimado: 3-5 minutos\n\nEnquanto isso, posso tentar ajudar com sua dúvida?"
    ],
    cancelamento: [
      "⚠️ Entendi que deseja cancelar seu pedido.",
      "Para prosseguir com o cancelamento, preciso de:\n• Número do pedido\n• Motivo do cancelamento\n\n💡 Lembre-se: pedidos já enviados não podem ser cancelados, mas você pode recusar na entrega."
    ],
    sugestoes: [
      "💡 Aqui estão algumas dicas úteis:",
      "🎯 Dicas da TechCorp:\n• Use o código TECH10 para 10% de desconto\n• Acompanhe pedidos pelo app\n• Avalie produtos para ganhar pontos\n• Assine nossa newsletter para ofertas exclusivas\n\nQuer saber mais sobre alguma dessas opções? 🤔"
    ],
    contato: [
      "📞 Informações de contato:",
      "📧 Email: suporte@techcorp.com\n📱 WhatsApp: (11) 99999-9999\n☎️ SAC: 0800-123-4567\n⏰ Horário: 8h às 18h (Seg-Sex)\n\n🌐 Também estamos nas redes sociais! 📱"
    ]
  };

  // Animação do indicador de digitação
  useEffect(() => {
    if (isTyping) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(typingAnimation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(typingAnimation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      typingAnimation.setValue(0);
    }
  }, [isTyping]);

  // Auto-scroll para última mensagem
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  // Simula status online/offline
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineStatus(prev => Math.random() > 0.1 ? true : prev);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleQuickReply = (reply) => {
    const userMessage = {
      id: Date.now().toString(),
      text: reply.text,
      fromUser: true,
      time: getCurrentTime(),
      category: reply.category
    };
    
    setMessages(prev => [...prev, userMessage]);
    setShowQuickReplies(false);
    setIsTyping(true);

    // Resposta em duas etapas para maior realismo
    const responses = predefinedResponses[reply.category] || [
      "🤔 Interessante...",
      "📝 Anotei sua solicitação. Em que mais posso ajudar?"
    ];

    // Primeira resposta (mais rápida)
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: responses[0],
          fromUser: false,
          time: getCurrentTime(),
          type: 'thinking'
        }
      ]);
    }, 800 + Math.random() * 500);

   
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          text: responses[1],
          fromUser: false,
          time: getCurrentTime(),
          type: 'detailed'
        }
      ]);
      setIsTyping(false);
      
     
      if (reply.category !== "humano") {
        setTimeout(() => setShowQuickReplies(true), 2000);
      }
    }, 2500 + Math.random() * 1000);
  };

  const handleSend = () => {
    if (input.trim() === '') return;
    
    const userMessage = {
      id: Date.now().toString(),
      text: input,
      fromUser: true,
      time: getCurrentTime()
    };
    
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);
    setShowQuickReplies(false);

    // Resposta inteligente baseada no conteúdo
    setTimeout(() => {
      const response = generateSmartResponse(currentInput);
      
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: response,
          fromUser: false,
          time: getCurrentTime()
        }
      ]);
      setIsTyping(false);
      setTimeout(() => setShowQuickReplies(true), 1500);
    }, 1000 + Math.random() * 1500);
  };

  const generateSmartResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('obrigad') || lowerInput.includes('valeu')) {
      return "😊 Por nada! Fico feliz em ajudar. Há algo mais em que posso ser útil?";
    }
    if (lowerInput.includes('tchau') || lowerInput.includes('até')) {
      return "👋 Até logo! Tenha um ótimo dia. Estou sempre aqui quando precisar! 😊";
    }
    if (lowerInput.includes('preço') || lowerInput.includes('valor') || lowerInput.includes('custo')) {
      return "💰 Para consultar preços específicos, você pode:\n• Acessar nosso site\n• Verificar no app\n• Solicitar orçamento\n\nQue produto te interessa?";
    }
    if (lowerInput.includes('horário') || lowerInput.includes('funciona')) {
      return "🕒 Nossos horários:\n• Loja virtual: 24h\n• Atendimento: 8h às 18h (Seg-Sex)\n• SAC: 8h às 20h (Seg-Sáb)\n\nComo posso ajudar?";
    }
    
    const responses = [
      "🤔 Entendi! Deixe-me processar sua solicitação...",
      "📝 Interessante pergunta! Vou verificar isso para você.",
      "💡 Boa pergunta! Estou analisando sua solicitação.",
      "🔍 Verificando as informações... Um momento, por favor!",
      "✅ Recebi sua mensagem! Vou te dar uma resposta completa."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const clearChat = () => {
    Alert.alert(
      "Limpar Conversa",
      "Tem certeza que deseja limpar todo o histórico do chat?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Limpar", 
          style: "destructive",
          onPress: () => {
            setMessages([{
              id: '1',
              text: '🔄 Chat limpo! Como posso ajudar agora?',
              fromUser: false,
              time: getCurrentTime(),
              type: 'system'
            }]);
            setShowQuickReplies(true);
          }
        }
      ]
    );
  };

  const renderMessage = ({ item, index }) => (
    <Animated.View 
      style={[
        styles.messageContainer,
        item.fromUser ? styles.userContainer : styles.botContainer,
        {
          opacity: 1,
          transform: [{
            translateY: 0
          }]
        }
      ]}
    >
  
      <View style={[
        styles.avatar,
        item.fromUser ? styles.userAvatar : styles.botAvatar
      ]}>
        <Text style={styles.avatarText}>
          {item.fromUser ? userAvatar : agentAvatar}
        </Text>
      </View>

      <View style={[
        styles.messageBubble,
        item.fromUser ? styles.userBubble : styles.botBubble,
        item.type === 'welcome' && styles.welcomeBubble,
        item.type === 'system' && styles.systemBubble
      ]}>
        <Text style={[
          item.fromUser ? styles.userMessageText : styles.botMessageText,
          item.type === 'welcome' && styles.welcomeText
        ]}>
          {item.text}
        </Text>
        <Text style={[
          styles.timeText,
          item.fromUser && styles.userTimeText
        ]}>
          {item.time}
        </Text>
      </View>
    </Animated.View>
  );

  const renderTypingIndicator = () => (
    <View style={[styles.messageContainer, styles.botContainer]}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{agentAvatar}</Text>
      </View>
      <View style={[styles.messageBubble, styles.botBubble, styles.typingBubble]}>
        <View style={styles.typingDotsContainer}>
          {[0, 1, 2].map((i) => (
            <Animated.View
              key={i}
              style={[
                styles.typingDot,
                {
                  opacity: typingAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 1],
                  }),
                  transform: [{
                    scale: typingAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.2],
                    })
                  }]
                }
              ]}
            />
          ))}
        </View>
        <Text style={styles.typingText}>Digitando...</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
 
      <LinearGradient
        colors={['#000', '#000']}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
        <Image
        source={require('../img/logo.png')} 
        style={styles.logo}
      />
          <View style={styles.statusContainer}>
            <View style={[
              styles.statusDot, 
              { backgroundColor: onlineStatus ? '#4CAF50' : '#FF5722' }
            ]} />
            <Text style={styles.statusText}>
              {onlineStatus ? 'Online' : 'Ocupado'}
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={clearChat} style={styles.headerAction}>
          <Text style={styles.clearIcon}>🗑️</Text>
        </TouchableOpacity>
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.chatArea}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        />

        {isTyping && renderTypingIndicator()}

        {/* Respostas Rápidas */}
        {showQuickReplies && (
          <View style={styles.quickRepliesSection}>
            <Text style={styles.quickRepliesTitle}>💬 Respostas rápidas:</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.quickRepliesContainer}
            >
              {quickReplies.map((reply, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.quickReplyButton}
                  onPress={() => handleQuickReply(reply)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    style={styles.quickReplyGradient}
                  >
                    <Text style={styles.quickReplyIcon}>{reply.icon}</Text>
                    <Text style={styles.quickReplyText}>{reply.text}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Área de Input */}
        <View style={styles.inputArea}>
          <View style={styles.inputContainer}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Digite sua mensagem..."
              placeholderTextColor="#999"
              style={styles.input}
              multiline
              maxLength={1000}
              onFocus={() => setShowQuickReplies(false)}
              onBlur={() => !input.trim() && setShowQuickReplies(true)}
            />
            <Text style={styles.charCount}>{input.length}/1000</Text>
          </View>
          
          <TouchableOpacity 
            style={[
              styles.sendButton,
              { opacity: input.trim() === '' ? 0.5 : 1 }
            ]} 
            onPress={handleSend}
            disabled={input.trim() === ''}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={input.trim() === '' ? ['#ccc', '#999'] : ['#4CAF50', '#45a049']}
              style={styles.sendButtonGradient}
            >
              <Text style={styles.sendIcon}>➤</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: Platform.OS === 'ios' ? 12 : 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  backButton: {
    padding: 8,
  },
  logo:{
    marginTop:13,
    height:90,
    width:180,
    marginLeft:10
  },
  backIcon: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom:6,
    MarginRight:20
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.9,
  },
  headerAction: {
    padding: 8,
  },
  clearIcon: {
    fontSize: 20,
  },
  chatArea: {
    flex: 1,
  },
  messagesContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  botContainer: {
    justifyContent: 'flex-start',
  },
  userContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  botAvatar: {
    backgroundColor: '#e3f2fd',
  },
  userAvatar: {
    backgroundColor: '#f3e5f5',
  },
  avatarText: {
    fontSize: 18,
  },
  messageBubble: {
    maxWidth: width * 0.75,
    padding: 12,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  botBubble: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: '#667eea',
    borderBottomRightRadius: 4,
  },
  welcomeBubble: {
    backgroundColor: '#e8f5e8',
    borderColor: '#4CAF50',
    borderWidth: 1,
  },
  systemBubble: {
    backgroundColor: '#fff3e0',
    borderColor: '#FF9800',
    borderWidth: 1,
  },
  botMessageText: {
    color: '#333',
    fontSize: 15,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 20,
  },
  welcomeText: {
    color: '#2e7d32',
    fontWeight: '500',
  },
  timeText: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  userTimeText: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  typingBubble: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
  },
  typingDotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#999',
    marginRight: 3,
  },
  typingText: {
    color: '#666',
    fontSize: 12,
    fontStyle: 'italic',
  },
  quickRepliesSection: {
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  quickRepliesTitle: {
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  quickRepliesContainer: {
    paddingHorizontal: 16,
  },
  quickReplyButton: {
    marginRight: 8,
    borderRadius: 20,
    overflow: 'hidden',
  },
  quickReplyGradient: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  quickReplyIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  quickReplyText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  inputArea: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  inputContainer: {
    flex: 1,
    marginRight: 12,
  },
  input: {
    minHeight: 44,
    maxHeight: 120,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 22,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  charCount: {
    fontSize: 10,
    color: '#999',
    alignSelf: 'flex-end',
    marginTop: 4,
    marginRight: 8,
  },
  sendButton: {
    borderRadius: 22,
    overflow: 'hidden',
  },
  sendButtonGradient: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});