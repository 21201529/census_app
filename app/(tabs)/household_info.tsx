// App.js
import { addHouse, deleteHouse, getHouses, House, initializeDB, updateHouse } from '@/database';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function App() {
  const navigation = useNavigation();
  const [address, setAddress] = useState('');
  const [householdMembers, setHouseholdMembers] = useState('');
  const [housingType, setHousingType] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const [houses, setHouses] = useState<House[]>([]);
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
  const [editingHouseId, setEditingHouseId] = useState<number | null>(null);


  const handleNext = () => {
    (navigation as any).navigate('indicativepage');
  };

  const handlePrev = () => {
    (navigation as any).navigate('Personal Info');
  };

  const fetchHouses = async () => {
    const allHouses = await getHouses();
    setHouses(allHouses);
  };

  useEffect (() => {
    const setupDatabase = async () => {
      await initializeDB();
    }
    setupDatabase();
  },[]);

  const [formData, setFormData] = useState({
    address: '',
    householdMembers: '',
    housingType: '',
    extraInfo: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    if (!address || !householdMembers || !housingType) {
      alert('Please fill in all fields');
      return;
    }
    try {
      if (editingHouseId) {
        // Update existing house
        await updateHouse(
          editingHouseId, 
          address, 
          householdMembers, 
          housingType, 
          extraInfo
        );
        console.log('House updated successfully');
      } else {
        // Add new house
        const id = await addHouse(
          address, 
          householdMembers, 
          housingType, 
          extraInfo
        );
        console.log("House added successfully with ID:", id);
      }
      resetForm();
      fetchHouses();
    } catch (error) {
      console.error('Error updating house:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteHouse(id);
      fetchHouses();
    } catch (error) {
      console.error('Error deleting house:', error);
    }
  };

  const handleUpdateClick = (house: House) => {
    setAddress(house.address);
    setHouseholdMembers(house.householdMembers);
    setHousingType(house.housingType);
    setExtraInfo(house.extraInfo);
    setEditingHouseId(house.id);
  };

  const resetForm = () => {
    setAddress('');
    setHouseholdMembers('');
    setHousingType('');
    setExtraInfo('');
    setEditingHouseId(null);
  };





  return (
    <ScrollView contentContainerStyle={styles.container}> 
      <View style={styles.logoContainer}>
        {/* You can replace this with an Image component */}
        <Image source={require('@/assets/images/censuslogo.jpg')} style={styles.logo} />
      </View>

      <Text style={styles.heading}>HOUSEHOLD NUMBER</Text>

      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        placeholderTextColor="#888888"
      />

      <TextInput
        style={styles.input}
        placeholder="Household Members"
        value={householdMembers}
        onChangeText={setHouseholdMembers}
        placeholderTextColor="#888888"
      />

      <TextInput
        style={styles.input}
        placeholder="Housing Type"
        value={housingType}
        onChangeText={setHousingType}
        placeholderTextColor="#888888"
      />

      <TextInput
        style={styles.input}
        placeholder="Extra Information"
        value={extraInfo}
        onChangeText={setExtraInfo}
        placeholderTextColor="#888888"
      />

      <View style={styles.navigationButtons}>
      <TouchableOpacity style={styles.navButton} onPress={handlePrev}>
          <Text style={styles.navText}>PREV</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={handleNext}>
          <Text style={styles.navText}>NEXT</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} />
      </View>


        {/* DISPLAY TABLE */}
        {/* Table to display records */}
        <View style={styles.tableContainer}>
          
          {houses.map((house) => (
          <View key={house.id} style={styles.tableRow}>
          <View>
              <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderText}>Address</Text>
                  <Text style={styles.tableRowText}>{house.address}</Text>
              </View>

              <View  style={styles.tableHeader}>
                  <Text style={styles.tableHeaderText}>Household Member</Text>
                  <Text style={styles.tableRowText}>{house.householdMembers}</Text>
              </View>

              <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderText}>Housing Type</Text>
                  <Text style={styles.tableRowText}>{house.housingType}</Text>
              </View>

              <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderText}>Extra Info.</Text>
                  <Text style={styles.tableRowText}>{house.extraInfo}</Text>
              </View>
              
              <View style={styles.actionButtons}>
                  <TouchableOpacity
                  style={styles.updateButton}
                  onPress={() => handleUpdateClick(house)}
                  >
                  <Text style={styles.buttonText}>Update</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(house.id)}
                  >
                  <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
              
                </View>
              </View>
          </View>
          ))}
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  navigationButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  navButton: {
    backgroundColor: '#03A9F4', // green color
    padding: 10,
    borderRadius: 5,
  },
  navText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  logo: {
    width: 400,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: -5,
    
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  logoSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
  },


  tableContainer: {
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#FFFFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    width: "100%",
    top: 10,
  },
  tableHeader: {
      flexDirection: 'row',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#CDCECDFF',
      alignItems: 'center',
      width: 290,
  },
  tableHeaderText: {
      flex: 1,
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333333',
      alignItems: 'center',
      justifyContent: 'space-between',
  },
  tableRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#DEDEDEFF',
  },
  tableRowText: {
      fontSize: 14,
      color: '#666',
      textAlign: 'center',
  },
  actionButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      
  },
  updateButton: {
      backgroundColor: '#4CAF50',
      padding: 10,
      borderRadius: 5,
      marginRight: 10,
  },
  deleteButton: {
      backgroundColor: '#f44336',
      padding: 10,
      borderRadius: 5,
  },
  buttonText: {
      fontSize: 14,
      color: '#fff',
  },
});
