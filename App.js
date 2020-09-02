import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Animated, Keyboard } from 'react-native';

export default function App() {
  
  const [offset] = useState(new Animated.ValueXY({x: 0, y: 90}))
  const [opacidade] = useState(new Animated.Value(0))
  const [logo] = useState(new Animated.ValueXY({x: 130, y: 155}))

  useEffect(()=>{
    KeyboardDidShowListener = Keyboard.addListener('keyboardDidShow', KeyboardDidShow)
    KeyboardDidHideListener = Keyboard.addListener('keyboardDidHide', KeyboardDidHide)

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 10,
        bounciness: 30,
      }),
      Animated.timing(opacidade, {
        toValue: 2,
        duration: 0.6,
      })
    ]).start();
  }, [])

  function KeyboardDidShow(){
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 55,
        duration: 100,
      }),

    Animated.timing(logo.y, {
      toValue: 65,
      duration: 100,
    })
    ]).start();
  }

  function KeyboardDidHide(){
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 130,
        duration: 200,
      }),

    Animated.timing(logo.y, {
      toValue: 155,
      duration: 200,
    })
    ]).start();
  }

  return (
    <KeyboardAvoidingView style={styles.background} behavior="padding">
      <View style={styles.logo}>
        <Animated.Image style={{width: logo.x, height: logo.y}} source={require('./src/assets/logo.png')}/>
      </View>
      <Animated.View style={[styles.container, {opacity: opacidade, transform: [{translateY: offset.y}]}]}>
        <TextInput placeholder="E-mail" keyboardType="email-address" autoCorrect="false" onChangeText={()=>{}} style={styles.input}></TextInput>
        <TextInput placeholder="Senha" secureTextEntry keyboardType="visible-password" autoCorrect="false" onChangeText={()=>{}} style={styles.input}></TextInput>
        <TouchableOpacity style={styles.botoes}>
          <Text style={styles.textsubmit}>Acessar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botoesregistrar}>
          <Text style={styles.textregistrar}>Criar Conta</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#191919',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    flex: 1,
    justifyContent: 'center',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },

  input: {
    backgroundColor: '#fff',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 16,
    borderRadius: 7,
    padding: 10,
  },

  botoes: {
    backgroundColor: '#35aaff',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },

  textsubmit: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  botoesregistrar: {
    marginTop: 10,
  },

  textregistrar: {
    color: '#fff',
  },
});
