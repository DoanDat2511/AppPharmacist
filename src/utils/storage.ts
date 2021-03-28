import AsyncStorage from "@react-native-community/async-storage";

export const set = async (key: string, data: any) => {
  try {
    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonData);
  } catch (err) {
    console.log("error set store",err)
  }
};

export const get = async (key: string) => {
  try {
    const jsonData = await AsyncStorage.getItem(key);
    return JSON.parse(jsonData);
  } catch (error) {}
};

export const remove = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    return null;
  }
};
