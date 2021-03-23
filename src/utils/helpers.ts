import storage from "@react-native-firebase/storage";
import { v4 as uuidv4 } from "uuid";

//interact with firebase storage
export async function uploadImageToStorage(dirPrefix, path, dir) {
  if (path) {
    let imgKey = dirPrefix + dir + uuidv4();
    let reference = await storage().ref(imgKey);

    await reference.putFile(path);
    const downloadUrl = await reference.getDownloadURL();
    return downloadUrl;
  }
}

export const phoneNumberWithCode = (phoneNumber:string, code:string) =>
  phoneNumber[0] === "0"
    ? `+${code + phoneNumber.substr(1, phoneNumber.length)}`
    : `+${code + phoneNumber}`;

    
  export const  validateEmail = (email:string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }