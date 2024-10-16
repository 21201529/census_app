import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, Alert, ScrollView, TouchableOpacity } from 'react-native';

import { request } from 'express';
import { useNavigation } from 'expo-router';
export default function App() {
  const navigation = useNavigation();
  // Form state
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  

  // Form submission handler
  const handleSignUp = () => {
    (navigation as any).navigate('Personal Info');
  };

  function promptAsync() {
    throw new Error('Function not implemented.');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('@/assets/images/censuslogo.jpg')} style={styles.logo} />

      <Text style={styles.formTitle}>LOG IN</Text>

      {/* Input fields */}
      <View style={styles.inputRow}>
  
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={() => handleSignUp()}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
      
      {/* <Button title="Sign Up" onPress={handleSignUp} /> */}

      {/* Google Sign Up Button */}

  
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  logo: {
    width: 400,
    height: 150,
    marginBottom: 90,
    marginTop: -90,
    resizeMode: 'contain',
    padding: 30,
  },
  button: {
    backgroundColor: "#4CAF50", // Modern green color
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginBottom: -10,
    top: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Elevation for Android
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  formTitle: {
    fontSize: 50,
    marginBottom: 20,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: -40,
    
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    width: '100%',
  },
  inputHalf: {
    width: '50%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  
});
