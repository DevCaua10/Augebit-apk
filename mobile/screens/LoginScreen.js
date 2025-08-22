import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation, onLoginSuccess }) {
  const [email, setEmail]   = useState('');
  const [senha, setSenha]   = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // ————————————————————————————————
  // Botão Entrar → Home
  // ————————————————————————————————
  const handleLogin = () => {
    /* 1) manter validação em memória
       — se NÃO quiser validar, troque todo
       este if por: navigation.navigate('Home');
    */
    if (email.trim() === 'sousa@gmail.com' && senha === '123456') {
      if (typeof onLoginSuccess === 'function') {
        onLoginSuccess();           // avisa App.js
      } else {
        navigation.navigate('Home'); // fallback
      }
    } else {
      Alert.alert('Erro', 'E‑mail ou senha incorretos');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" translucent />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* — Cabeçalho / logo — */}
        <View style={styles.header}>
          <Image
            source={require('../img/logo2.png')}
            resizeMode="contain"
            style={{ height: 130, marginTop: 40, marginBottom: 20 }}
          />
          <Text style={styles.welcomeText}>Bem‑vindo de volta!</Text>
          <Text style={styles.subtitleText}>Entre na sua conta</Text>
        </View>

        {/* — Formulário — */}
        <View style={styles.formContainer}>
          {/* E‑mail */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>E‑mail</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Digite seu e‑mail"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={setEmail}
                value={email}
              />
            </View>
          </View>

          {/* Senha */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Digite sua senha"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                onChangeText={setSenha}
                value={senha}
              />
              <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Botão Entrar */}
          <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Entrar</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" style={styles.buttonIcon} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:'#f8f9fa'},
  scrollContainer:{flexGrow:1},
  header:{backgroundColor:'#1a1a2e',paddingTop:29,paddingBottom:20,paddingHorizontal:30,
          borderBottomLeftRadius:30,borderBottomRightRadius:30},
  welcomeText:{fontSize:28,color:'#fff',textAlign:'center',marginTop:5,marginBottom:8},
  subtitleText:{fontSize:14,color:'#bbb',textAlign:'center',marginBottom:15},
  formContainer:{flex:1,padding:30,paddingTop:40},
  inputContainer:{marginBottom:20},
  label:{fontSize:16,color:'#333',marginBottom:8,fontWeight:'600'},
  inputWrapper:{flexDirection:'row',alignItems:'center',backgroundColor:'#fff',
                borderWidth:2,borderColor:'#e1e5e9',borderRadius:12,paddingHorizontal:15,height:55},
  inputIcon:{marginRight:12},
  input:{flex:1,fontSize:16,color:'#333'},
  eyeIcon:{padding:5},
  button:{width:'100%',height:55,backgroundColor:'#3d6dfb',borderRadius:12,
          flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:10},
  buttonText:{color:'#fff',fontSize:18,fontWeight:'bold',marginRight:8},
  buttonIcon:{marginLeft:5},
});
