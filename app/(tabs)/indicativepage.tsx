import { addIndicate, deleteIndicate, getIndicates, Indicate, initializeDB, updateIndicate } from '@/database';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView, Alert, TouchableOpacity } from 'react-native';

export default function App() {
  const navigation = useNavigation();
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [llg, setLLG] = useState('');
  const [indicates, setIndicates] = useState<Indicate[]>([]);
  const [selectedIndicate, setSelectedIndicate] = useState<number | null>(null);
  const [editingIndicateId,  setEditingIndicateId] = useState<number | null>(null);


  const handleNext = () => {
    (navigation as any).navigate('exitpage');
  };

  const handlePrev = () => {
    (navigation as any).navigate('household_info');
  };
  
  const fetchIndicates = async () => {
    const allIndicates = await getIndicates();
    setIndicates(allIndicates);
  };

  useEffect (() => {
    const setupDatabase = async () => {
      await initializeDB();
      fetchIndicates();
    }
    setupDatabase();
  }, []);

  const handleSubmit = async () => {
    if (
      !province || 
      !district || 
      !llg
    ) {
      Alert.alert('Please fill in all fields');
      return;
    
    } 
      try {
        if (editingIndicateId) {
          await updateIndicate(
            editingIndicateId,
            province,
            district,
            llg
          );
          console.log("Info update successfully")
        } else {
          // Add new indicative information
          const id = await addIndicate(
            province,
            district,
            llg
          );
          console.log("Indicative info create successfully woth ID:", id)
        }
        resetForm();
        fetchIndicates();
      } catch (error) {
        console.error("Error creating or updating  indicative info:", error);
      }
    };

  const handleDelete = async (indicatesId: number) => {
    try  {
      await deleteIndicate(indicatesId);
      console.log("Indicative Info deleted successfully");
      fetchIndicates();
    } catch (error) {
      console.error("Error deleting indicative info:", error);
    }
  };

  const handleUpdateClick = (indicate: Indicate) =>  {
    setProvince(indicate.province)
    setDistrict(indicate.district)
    setLLG(indicate.llg)
    setEditingIndicateId(indicate.id)
  };

  const resetForm = () =>  {
    setProvince('')
    setDistrict('')
    setLLG('')
    setEditingIndicateId(null)
  };

        


  return (
    <ScrollView contentContainerStyle={styles.container}>
              <Image
      source={require('@/assets/images/censuslogo.jpg')}
      style={styles.logo}
    />
      <Text style={styles.title}>INDICATIVE INFORMATION</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Province</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Province"
          value={province}
          onChangeText={setProvince}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>District</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your District"
          value={district}
          onChangeText={setDistrict}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>LLG</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your LLG"
          value={llg}
          onChangeText={setLLG}
        />
      </View>

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

      {/* Table to display records */}
      <View style={styles.tableContainer}>
        {indicates.map((indicate) => (
        <View key={indicate.id} style={styles.tableRow}>   
        <View>
            <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>Province</Text>
                <Text style={styles.tableRowText}>{indicate.province}</Text>
            </View>

            <View  style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>District</Text>
                <Text style={styles.tableRowText}>{indicate.district}</Text>
            </View>

            <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>LLG</Text>
                <Text style={styles.tableRowText}>{indicate.llg}</Text>
            </View>
            
            <View style={styles.actionButtons}>
                <TouchableOpacity
                style={styles.updateButton}
                onPress={() => handleUpdateClick(indicate)}
                >
                <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(indicate.id)}
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
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  logo: {
    width: 400,
    height: 150,
    marginBottom: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: -2,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  formGroup: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
    marginBottom:  20,
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
    marginBottom:  10,

  },
  navText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },


  tableContainer: {
    flexDirection: 'column',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    width: "100%",
  },
  tableHeader: {
      flexDirection: 'row',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      width: 290,
  },
  tableHeaderText: {
      flex: 1,
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      justifyContent: 'space-between',
  },
  tableRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
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
