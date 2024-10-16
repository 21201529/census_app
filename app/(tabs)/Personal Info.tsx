import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView, TouchableOpacity, GestureResponderEvent, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from 'expo-router';
import { addPerson, deletePerson, getPersons, initializeDB, Person, updatePerson } from '@/database';

export default function App() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [citizenship, setCitizenship] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [nationality, setNationality] = useState('');
    const [persons, setPersons] = useState<Person[]>([]);
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
    const [editingPersonId, setEditingPersonId] = useState<number | null>(null);

    const navigation = useNavigation();
    
    const handleNext = () => {
        (navigation as any).navigate('household_info');
    }

    const fetchPersons = async () => {
        const allPersons = await getPersons();
        setPersons(allPersons);
    };

    useEffect(() => {
        const setupDatabase = async () => {
        await initializeDB();
        fetchPersons();
        };

        setupDatabase();
    }, []);

    const handleSubmit = async () => {
        if (
        !name || 
        !surname || 
        !middleName || 
        !citizenship || 
        !dob || 
        !gender || 
        !nationality
        ) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
    }

    try {
        if (editingPersonId) {
        // Update existing person
        await updatePerson(
            editingPersonId, 
            name, 
            surname, 
            middleName, 
            citizenship,
            dob, 
            gender, 
            nationality
        );
        console.log("Person updated successfully");
        } else {
        // Add new person
        const id = await addPerson(
            name,
            surname,
            middleName,
            citizenship,
            dob,
            gender,
            nationality
        );
        console.log("Person create successfully with ID:", id);
        }
        resetForm();
        fetchPersons(); // Refresh the list of persons
        } catch (error) {
        console.error("Error creating or updating person:", error);
        }
    };

    const handleDelete = async (personId: number) => {
        try {
        await deletePerson(personId);
        console.log("Person deleted successfully");
        fetchPersons(); // Refresh the list of persons
        } catch (error) {
        console.error("Error deleting person:", error);
        }
    };

    const handleUpdateClick = (person: Person) => {
        setName(person.name);
        setSurname(person.surname);
        setMiddleName(person.middleName);
        setCitizenship(person.citizenship);
        setDob(person.dob);
        setGender(person.gender);
        setNationality(person.nationality);
        setEditingPersonId(person.id)
    };

    const resetForm = () => {
        // Clear the form fields
        setName('');
        setSurname('');
        setMiddleName('');
        setCitizenship('');
        setDob('');
        setGender('');
        setNationality('');
        setEditingPersonId(null);
    };

    return (
        <ScrollView>
            <View style={styles.container}>
            <Image
                source={require('@/assets/images/censuslogo.jpg')}
                style={styles.logo}
            />

                <Text style={styles.title}>PERSONAL DETAILS</Text>

                <View style={styles.formGroup}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                />
                </View>

                <View style={styles.formGroup}>
                <Text style={styles.label}>Middle Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your middle name"
                    value={middleName}
                    onChangeText={setMiddleName}
                />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Surname</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your surname"
                        value={surname}
                        onChangeText={setSurname}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Citizenship</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your citizenship"
                        value={citizenship}
                        onChangeText={setCitizenship}
                    />
                </View>

                <View style={styles.formGroup}>
                <Text style={styles.label}>Date Of Birth</Text>
                <TextInput
                    style={styles.input}
                    placeholder="YYYY-MM-DD"
                    value={dob}
                    onChangeText={setDob}
                />
                </View>

                <View style={styles.formGroup}>
                <Text style={styles.label}>Gender</Text>
                <Picker
                    selectedValue={gender}
                    onValueChange={(itemValue) => setGender(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Select Gender" value="" />
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                    <Picker.Item label="Other" value="other" />
                </Picker>
                </View>

                <View style={styles.formGroup}>
                <Text style={styles.label}>Nationality</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your nationality"
                    value={nationality}
                    onChangeText={setNationality}
                />
                </View>
                    <TouchableOpacity style={styles.navButton} onPress={handleNext}>
                        <Text style={styles.navText}>NEXT</Text>
                    </TouchableOpacity>


                <View style={styles.buttonContainer}>
                    <Button
                        title={selectedPerson ? "Update" : "Submit"}
                        onPress={handleSubmit}
                    />
                </View>
                    


                {/* Table to display records */}
                <View style={styles.tableContainer}>
                    {persons.map((person) => (
                    <View key={person.id} style={styles.tableRow}>   
                    <View>
                        <View style={styles.tableHeader}>
                            <Text style={styles.tableHeaderText}>First Name</Text>
                            <Text style={styles.tableRowText}>{person.name}</Text>
                        </View>

                        <View  style={styles.tableHeader}>
                            <Text style={styles.tableHeaderText}>Middle Name</Text>
                            <Text style={styles.tableRowText}>{person.middleName}</Text>
                        </View>

                        <View style={styles.tableHeader}>
                            <Text style={styles.tableHeaderText}>Last Name</Text>
                            <Text style={styles.tableRowText}>{person.surname}</Text>
                        </View>

                        <View style={styles.tableHeader}>
                            <Text style={styles.tableHeaderText}>Citizenship</Text>
                            <Text style={styles.tableRowText}>{person.citizenship}</Text>
                        </View>

                        <View style={styles.tableHeader}>
                            <Text style={styles.tableHeaderText}>Date of Birth</Text>
                            <Text style={styles.tableRowText}>{person.dob}</Text>
                        </View>

                        <View style={styles.tableHeader}>
                            <Text style={styles.tableHeaderText}>Gender</Text>
                            <Text style={styles.tableRowText}>{person.gender}</Text>
                        </View>

                        <View style={styles.tableHeader}>
                            <Text style={styles.tableHeaderText}>Nationality</Text>
                            <Text style={styles.tableRowText}>{person.nationality}</Text>
                        </View>
                        
                        <View style={styles.actionButtons}>
                            <TouchableOpacity
                            style={styles.updateButton}
                            onPress={() => handleUpdateClick(person)}
                            >
                            <Text style={styles.buttonText}>Update</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleDelete(person.id)}
                            >
                            <Text style={styles.buttonText}>Delete</Text>
                            </TouchableOpacity>
                        
                        </View>

                    </View>
                    </View>
                    ))}
                </View>
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
        justifyContent: 'center',
    },
    navButton :{
        backgroundColor: '#03A9F4', // green color
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        right: -120,
    },
    logo: {
        width: 400,
        height: 150,
        marginBottom: 30,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: -5,
        
    },
    title: {
        fontSize: 30,
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
    picker: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        width: '100%',
        marginTop: 20,
        marginBottom:  20,
    },
    submitButton: {
        backgroundColor: '#000',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 5,
        marginBottom: 20,
    },
    submitText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
    },
    navText: {
        fontSize: 14,
        color: '#FFFFFFFF',
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
