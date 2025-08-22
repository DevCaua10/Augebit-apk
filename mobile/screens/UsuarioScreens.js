import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Switch
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserProfileScreen({ navigation, onLogout }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [notificacoes, setNotificacoes] = useState(true);
  const [modoEscuro, setModoEscuro] = useState(false);
  const [nomeError, setNomeError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [profileInitial, setProfileInitial] = useState('');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const savedUserData = await AsyncStorage.getItem('userData');
      console.log('Dados salvos:', savedUserData);

      if (savedUserData) {
        const userData = JSON.parse(savedUserData);
        setNome(userData.nome || '');
        setEmail(userData.email || '');
        
        // Definir a inicial do nome para o placeholder
        if (userData.nome) {
          setProfileInitial(userData.nome.charAt(0).toUpperCase());
        }

        const savedNotifications = await AsyncStorage.getItem('notificationsEnabled');
        const savedDarkMode = await AsyncStorage.getItem('darkModeEnabled');

        setNotificacoes(savedNotifications !== null ? JSON.parse(savedNotifications) : true);
        setModoEscuro(savedDarkMode !== null ? JSON.parse(savedDarkMode) : false);

        await loadAdditionalUserData(userData.id, userData.token);
      } else {
        Alert.alert(
          'Sessão Expirada',
          'Faça login novamente',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Login')
            }
          ]
        );
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados do usuário');
    } finally {
      setLoading(false);
    }
  };

  const loadAdditionalUserData = async (userId, token) => {
    try {
      const response = await fetch(`http://10.136.23.74:4000/api/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        const additionalData = await response.json();
        if (additionalData.sucesso) {
          setTelefone(additionalData.telefone || '');
          setEndereco(additionalData.endereco || '');
        }
      }
    } catch (error) {
      console.log('Erro ao carregar dados adicionais:', error);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let isValid = true;

    setNomeError('');
    setEmailError('');

    if (!nome.trim()) {
      setNomeError('Nome é obrigatório');
      isValid = false;
    } else if (nome.trim().length < 2) {
      setNomeError('Nome deve ter pelo menos 2 caracteres');
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError('E-mail é obrigatório');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('E-mail inválido');
      isValid = false;
    }

    return isValid;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setSaving(true);

    try {
      const savedUserData = await AsyncStorage.getItem('userData');
      const userData = savedUserData ? JSON.parse(savedUserData) : {};

      const updatedData = {
        nome: nome.trim(),
        email: email.trim(),
        telefone: telefone.trim(),
        endereco: endereco.trim(),
      };

      const response = await fetch(`http://10.136.23.74:4000/api/user/${userData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData.token}`
        },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();

      if (!result.sucesso) {
        throw new Error(result.erro || 'Erro ao salvar dados');
      }

      const newUserData = {
        ...userData,
        nome: updatedData.nome,
        email: updatedData.email,
        lastUpdate: new Date().toISOString()
      };

      await AsyncStorage.setItem('userData', JSON.stringify(newUserData));

      // Atualizar a inicial se o nome foi alterado
      if (updatedData.nome) {
        setProfileInitial(updatedData.nome.charAt(0).toUpperCase());
      }

      Alert.alert('Sucesso', 'Dados salvos com sucesso!');
      setIsEditing(false);

    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleNotifications = async (value) => {
    setNotificacoes(value);
    await AsyncStorage.setItem('notificationsEnabled', JSON.stringify(value));
  };

  const handleToggleDarkMode = async (value) => {
    setModoEscuro(value);
    await AsyncStorage.setItem('darkModeEnabled', JSON.stringify(value));
  };

  const handlePrivacyPolicy = () => {
    navigation.navigate('Privacy');
  };

  const handleTermsOfService = () => {
    navigation.navigate('Termos');
  };

  const handleSupport = () => {
    navigation.navigate('Help');
  };

  const handleAbout = () => {
    navigation.navigate('SobreApp');
  };

  const handleLogoutPress = async () => {
    Alert.alert(
      'Logout',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            try {
              if (onLogout) {
                onLogout();
              } else {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                });
              }
            } catch (error) {
              console.error('Erro ao fazer logout:', error);
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3d6dfb" />
        <Text style={styles.loadingText}>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogoutPress}
          >
            <Ionicons name="log-out-outline" size={24} color="#fff" />
          </TouchableOpacity>

          <View style={styles.profileImageContainer}>
            {profileInitial ? (
              <View style={styles.profileInitialContainer}>
                <Text style={styles.profileInitialText}>{profileInitial}</Text>
              </View>
            ) : (
              <Image
                source={{ uri: 'https://via.placeholder.com/120x120/3d6dfb/ffffff?text=U' }}
                style={styles.profileImage}
              />
            )}
            <TouchableOpacity style={styles.cameraButton}>
              <Ionicons name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.welcomeText}>Meu Perfil</Text>
          <Text style={styles.subtitleText}>Gerencie suas informações</Text>
        </View>

        {/* Formulário */}
        <View style={styles.formContainer}>
          {/* Campo Nome */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nome Completo</Text>
            <View style={[styles.inputWrapper, nomeError ? styles.inputError : null]}>
              <Ionicons
                name="person-outline"
                size={20}
                color={nomeError ? "#e74c3c" : "#666"}
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                placeholder="Seu nome completo"
                placeholderTextColor="#999"
                onChangeText={(text) => {
                  setNome(text);
                  if (nomeError) setNomeError('');
                }}
                value={nome}
                editable={isEditing}
              />
            </View>
            {nomeError ? <Text style={styles.errorText}>{nomeError}</Text> : null}
          </View>

          {/* Campo E-mail */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>E-mail</Text>
            <View style={[styles.inputWrapper, emailError ? styles.inputError : null]}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={emailError ? "#e74c3c" : "#666"}
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                placeholder="seu@email.com"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(text) => {
                  setEmail(text);
                  if (emailError) setEmailError('');
                }}
                value={email}
                editable={isEditing}
              />
            </View>
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          </View>

          {/* Campo Telefone */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Telefone</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="call-outline"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                placeholder="(11) 99999-9999"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                onChangeText={setTelefone}
                value={telefone}
                editable={isEditing}
              />
            </View>
          </View>

          {/* Campo Endereço */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Endereço</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="location-outline"
                size={20}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                placeholder="Seu endereço"
                placeholderTextColor="#999"
                onChangeText={setEndereco}
                value={endereco}
                editable={isEditing}
                multiline
              />
            </View>
          </View>

          {/* Botões de Edição */}
          <View style={styles.buttonContainer}>
            {!isEditing ? (
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setIsEditing(true)}
              >
                <Ionicons name="create-outline" size={20} color="#fff" />
                <Text style={styles.buttonText}>Editar Perfil</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.editButtonsRow}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    setIsEditing(false);
                    loadUserData();
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.saveButton, saving && styles.buttonDisabled]}
                  onPress={handleSave}
                  disabled={saving}
                >
                  {saving ? (
                    <ActivityIndicator color="#fff" size="small" />
                  ) : (
                    <>
                      <Ionicons name="checkmark-outline" size={20} color="#fff" />
                      <Text style={styles.buttonText}>Salvar</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </View>


          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Configurações</Text>

    
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Ionicons name="notifications-outline" size={24} color="#666" />
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>Notificações</Text>
                  <Text style={styles.settingSubtitle}>Receber notificações push</Text>
                </View>
              </View>
              <Switch
                value={notificacoes}
                onValueChange={handleToggleNotifications}
                trackColor={{ false: '#e1e5e9', true: '#3d6dfb' }}
                thumbColor={notificacoes ? '#fff' : '#999'}
              />
            </View>
          </View>


          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Informações Legais</Text>

            <TouchableOpacity style={styles.menuItem} onPress={handlePrivacyPolicy}>
              <View style={styles.menuItemLeft}>
                <Ionicons name="shield-checkmark-outline" size={24} color="#666" />
                <Text style={styles.menuItemText}>Política de Privacidade</Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={20} color="#999" />
            </TouchableOpacity>

  
            <TouchableOpacity style={styles.menuItem} onPress={handleTermsOfService}>
              <View style={styles.menuItemLeft}>
                <Ionicons name="document-text-outline" size={24} color="#666" />
                <Text style={styles.menuItemText}>Termos de Uso</Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={20} color="#999" />
            </TouchableOpacity>
          </View>


          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Suporte</Text>


            <TouchableOpacity style={styles.menuItem} onPress={handleSupport}>
              <View style={styles.menuItemLeft}>
                <Ionicons name="help-circle-outline" size={24} color="#666" />
                <Text style={styles.menuItemText}>Central de Ajuda</Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={20} color="#999" />
            </TouchableOpacity>

 
            <TouchableOpacity style={styles.menuItem} onPress={handleAbout}>
              <View style={styles.menuItemLeft}>
                <Ionicons name="information-circle-outline" size={24} color="#666" />
                <Text style={styles.menuItemText}>Sobre o App</Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={20} color="#999" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 30,
    padding: 8,
    zIndex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    backgroundColor: '#1a1a2e',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 40,
    paddingHorizontal: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoutButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    right: 30,
    padding: 8,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
  },
  profileInitialContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#3d6dfb',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  profileInitialText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3d6dfb',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: '#bbb',
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    padding: 30,
    paddingTop: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e1e5e9',
    borderRadius: 12,
    paddingHorizontal: 15,
    minHeight: 55,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputError: {
    borderColor: '#e74c3c',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 12,
  },
  inputDisabled: {
    color: '#666',
    backgroundColor: 'transparent',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 14,
    marginTop: 5,
    marginLeft: 5,
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 40,
  },
  editButton: {
    width: '100%',
    height: 55,
    backgroundColor: '#3d6dfb',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3d6dfb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  editButtonsRow: {
    flexDirection: 'row',
    gap: 15,
  },
  cancelButton: {
    flex: 1,
    height: 55,
    backgroundColor: '#6c757d',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    flex: 1,
    height: 55,
    backgroundColor: '#28a745',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#28a745',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonDisabled: {
    backgroundColor: '#999',
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
    fontWeight: '500',
  },
});