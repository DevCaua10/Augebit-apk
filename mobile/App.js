import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

/* — Telas — */
import LoginScreen       from './screens/LoginScreen';
import HomeScreen        from './screens/HomeScreens';
import PedidosScreen     from './screens/PedidosScreen';
import ChatScreen        from './screens/ChatScreens';
import WorkflowScreen    from './screens/WorkshotScreens';
import ProfileScreen     from './screens/UsuarioScreens';
import RelatoriosScreen  from './screens/RelatoriosScreen';
import HelpScreen        from './screens/HelpScreen';
import PrivacyScreen     from './screens/PrivacyScreen';
import SobreApp          from './screens/SobreApp';
import TermsOfUseScreen  from './screens/TermosUso';
import AutomacaoScreen   from './screens/AutomacaoScreens';
import ConsultoriaScreen from './screens/ConsultoriasScreens';
import GerenciamentoScreen from './screens/GerenciamentoScreens';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

 
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 4000);
    return () => clearTimeout(timer);
  }, []);

 
  const handleLogout = () => setIsLoggedIn(false);


  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <Video
          source={require('./video/augebit1.mp4')}
          style={styles.video}
          resizeMode="contain"
          shouldPlay
          isLooping={false}
        />
      </View>
    );
  }

 
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
        
          <Stack.Screen name="Login">
            {(props) => (
              <LoginScreen {...props} onLoginSuccess={() => setIsLoggedIn(true)} />
            )}
          </Stack.Screen>
        ) : (
         
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Pedidos" component={PedidosScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Work" component={WorkflowScreen} />

          
            <Stack.Screen name="automacao" component={AutomacaoScreen} />
            <Stack.Screen name="gerenciamento" component={GerenciamentoScreen} />
            <Stack.Screen name="consultoria" component={ConsultoriaScreen} />

    
            <Stack.Screen name="Profile">
              {(props) => <ProfileScreen {...props} onLogout={handleLogout} />}
            </Stack.Screen>

     
            <Stack.Screen name="SobreApp" component={SobreApp} />
            <Stack.Screen name="Relatorios" component={RelatoriosScreen} />
            <Stack.Screen name="Help" component={HelpScreen} />
            <Stack.Screen name="Privacy" component={PrivacyScreen} />
            <Stack.Screen name="Termos" component={TermsOfUseScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  splashContainer:{flex:1,backgroundColor:'#F2F2F2',justifyContent:'center',alignItems:'center'},
  video:{width:'100%',height:'100%'}
});
