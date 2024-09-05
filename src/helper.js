import AsyncStorage from '@react-native-async-storage/async-storage';

//////////////////////////////////////////////////////
export const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // saving error
      console.error(e);
    }
  };

export const storeMultiple = async () => {
    try {
      const values = [
        ['key1', 'value1'],
        ['key2', 'value2'],
        ['key3', 'value3'],
      ];
      await AsyncStorage.multiSet(values);
    } catch (e) {
      // saving error
      console.error(e);
    }
  };


////////////////////////////////////////////////////
export const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value); // Parse the JSON string to an object
      }
      return null;
    } catch (e) {
      // error reading value
      console.error(e);
      return null;
    }
  };

  export const getMultiple = async (data) => {
    try {
      const keys = data;
      const result = await AsyncStorage.multiGet(keys);
      
      result.forEach(([key, value]) => {
        console.log(`Key: ${key}, Value: ${value}`);
      });
    } catch (e) {
      // reading error
      console.error(e);
    }
  };
///////////////////////////////////////////

  export const removeData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      // removing error
      console.error(e);
    }
  };

  export  const mergeData = async (key, value) => {
    try {
      const existingData = await AsyncStorage.getItem(key);
      const parsedExistingData = existingData ? JSON.parse(existingData) : {};
      
      const newData = { ...parsedExistingData, ...value };
      
      await AsyncStorage.setItem(key, JSON.stringify(newData)); // Save the merged data as a string
    } catch (e) {
      console.error('Error merging data:', e);
    }
  };