import {
    Image,
    StyleSheet,
    Platform,
    TouchableOpacity,
    Text,
    View,
    Button,
  } from "react-native";
  import { createStackNavigator } from "@react-navigation/stack";
  import { useNavigation } from "@react-navigation/native";
  import AuthComponent from "@/components/auth/AuthComponent";
  import React from "react";
  
  export default function HomeScreen() {
    const navigation = useNavigation();
  
    const handleDashboard = () => {
      // code to handle the browse action
      (navigation as any).navigate("dashboard");
    };
  
    const handleSignIn = () => {
      (navigation as any).navigate("auth");
    };
  
    const testRoute = () => {
      (navigation as any).navigate("test");
    };
  
    return (
      
      <View style={styles.container}>
        {/* Two Text Messages */}
        <Image style={styles.image1} source={require("@/assets/images/censuslogo.jpg")} />
        <Text style={styles.headerText}>THANK YOU FOR YOUR</Text>
      
        <Image style={styles.image} source={require("@/assets/images/2024-Census-logo.png")} />
        <Text style={styles.subText}>
          PARTICIPATION!
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => handleDashboard()}>
          <Text style={styles.buttonText}>CLOSE</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          
      >
          
        </TouchableOpacity>
        
      </View>
      
    );
  }
  
  // Styling for a modern, attractive layout
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: "#f5f5f5", // Light background for contrast against buttons
    },
    image: {
      width: 350,
      height: 350,
      resizeMode:  "contain",
      marginBottom:  20,
      marginTop: 20,
    },
    image1: {
      width: 340,
      height: 150,
      resizeMode:  "contain",
      marginBottom:  -20,
      top: 30,
  
    },
    headerText: {
      fontSize: 40,
      fontWeight: "bold",
      color: "#333",
      textAlign: "center",
      marginBottom: -20,
      top: 30,
  
    },
    subText: {
      fontSize: 40,
      color: "",
      fontWeight: "bold",
      justifyContent: "flex-end",
      textAlign: "center",
      marginBottom: 5, // Space between text and buttons
      top: -30,
    },
    button: {
      backgroundColor: "#2196F3", // Modern green color
      borderRadius: 12,
      paddingVertical: 15,
      paddingHorizontal: 130,
      marginBottom: 30,
      marginTop: -20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4, // Elevation for Android
    },
    buttonSecondary: {
      backgroundColor: "#2196F3", // Stylish blue for Sign In/Sign Up buttons
      borderRadius: 12,
      paddingVertical: 15,
      paddingHorizontal: 50,
      
      marginTop: 20,
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
  });
  