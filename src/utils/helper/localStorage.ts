import AsyncStorage from '@react-native-async-storage/async-storage';

// Sets a string value for given key.
export const storeData = async (key: string, value: unknown): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log('storeData error', error);
  }
};

// Gets a string value for given key.
export const getData = async <T = unknown>(key: string): Promise<T | null> => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data != null ? (JSON.parse(data) as T) : null;
  } catch (error) {
    console.log('getData error', error);
    return null;
  }
};
