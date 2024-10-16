import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('census');

export interface Person {
  id: number;
  name: string;
  surname: string;
  middleName: string;
  citizenship: string;
  dob: string;
  gender: string;
  nationality: string;
}

export interface House {
  id: number;
  address: string;
  householdMembers: string;
  housingType: string;
  extraInfo: string;
}

export interface Indicate {
  id: number;
  province: string;
  district: string;
  llg: string;
}

export const initializeDB = async () => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS person (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      surname TEXT NOT NULL,
      middleName TEXT NOT NULL,
      citizenship TEXT NOT NULL,
      dob TEXT NOT NULL,
      gender TEXT NOT NULL,
      nationality TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS house (
      id INTEGER PRIMARY KEY NOT NULL,
      address TEXT NOT NULL,
      householdMembers TEXT NOT NULL,
      housingType TEXT NOT NULL,
      extraInfo TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS indicate (
      id INTEGER PRIMARY KEY NOT NULL,
      province TEXT NOT NULL,
      district TEXT NOT NULL,
      llg TEXT NOT NULL
    )
  `);
};

// PERSONAL INFO

export const addPerson = async (
  name: string, 
  surname: string, 
  middleName: string, 
  citizenship: string, 
  dob: string, 
  gender: string, 
  nationality: string
) => {
  try {
    const result = await db.runAsync(
      'INSERT INTO person (name, surname, middleName, citizenship, dob, gender, nationality) VALUES (?, ?, ?, ?, ?, ?, ?)', 
      name, 
      surname, 
      middleName, 
      citizenship, 
      dob, 
      gender, 
      nationality
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error adding person:", error);
  }
};

export const updatePerson = async (
  id: number, 
  name: string, 
  surname: string, 
  middleName: string, 
  citizenship: string, 
  dob: string, 
  gender: string, 
  nationality: string
) => {
  try {
    await db.runAsync(
      'UPDATE person SET name = ?, surname = ?, middleName = ?, citizenship = ?, dob = ?, gender = ?, nationality = ? WHERE id = ?', 
      name, 
      surname, 
      middleName, 
      citizenship, 
      dob, 
      gender, 
      nationality, 
      id
    );
  } catch (error) {
    console.error("Error updating person:", error);
  }
};

export const deletePerson = async (id: number) => { 
  try {
    await db.runAsync(`DELETE FROM person WHERE id = ?`, id);
  } catch (error) {
    console.error("Error deleting person:", error);
  }
};

export const getPersons = async () => {
  try {
    const allRows = await db.getAllAsync('SELECT * FROM person') as Person[];
    return allRows;
  } catch (error) {
    console.error("Error getting persons:", error);
    return [];
  }
}

// HOUSEHOLD INFO
export const addHouse = async (address: string, householdMembers: string, housingType: string, extraInfo: string) => {
  try {
    const result = await db.runAsync(
      'INSERT INTO house (address, householdMembers, housingType, extraInfo) VALUES (?, ?, ?, ?)', 
      address, 
      householdMembers, 
      housingType, 
      extraInfo
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error adding house:", error);
  }
};

export const updateHouse = async (id: number, address: string, householdMembers: string, housingType: string, extraInfo: string) => {
  try {
    await db.runAsync(
      'UPDATE house SET address = ?, householdMembers = ?, housingType = ?, extraInfo = ? WHERE id = ?', 
      address, 
      householdMembers, 
      housingType, 
      extraInfo, 
      id
    );
  } catch (error) {
    console.error("Error updating house:", error);
  }
};

export const deleteHouse = async (id: number) => {
  try {
    await db.runAsync(`DELETE FROM house WHERE id = ?`, id);
  } catch (error) {
    console.error("Error deleting house:", error);
  }
};

export const getHouses = async () => {
  try {
    const allRows = await db.getAllAsync('SELECT * FROM house') as House[];
    return allRows;
  } catch (error) {
    console.error("Error getting houses:", error);
    return [];
  }
};

// INDICATIVE INFO
export const addIndicate = async (province: string, district: string, llg: string) => {
  try {
    const result = await db.runAsync(
      'INSERT INTO indicate (province, district, llg) VALUES (?, ?, ?)', 
      province, 
      district, 
      llg
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error adding indicate:", error);
  }
};

export const updateIndicate = async (id: number, province: string, district: string, llg: string) => {
  try {
    await db.runAsync(
      'UPDATE indicate SET province = ?, district = ?, llg = ? WHERE id = ?', 
      province, 
      district, 
      llg, 
      id
    );
  } catch (error) {
    console.error("Error updating indicate:", error);
  }
};

export const deleteIndicate = async (id: number) => {
  try {
    await db.runAsync(`DELETE FROM indicate WHERE id = ?`, id);
  } catch (error) {
    console.error("Error deleting indicate:", error);
  }
};

export const getIndicates = async () => {
  try {
    const allRows = await db.getAllAsync('SELECT * FROM indicate') as Indicate[];
    return allRows;
  } catch (error) {
    console.error("Error getting indicates:", error);
    return [];
  }
};