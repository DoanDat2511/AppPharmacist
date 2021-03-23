import auth from "@react-native-firebase/auth";
import Snackbar from "react-native-snackbar";

const handleCheckEmail = async (email: string, password: string) => {

    const result = await auth().createUserWithEmailAndPassword(email,password);
    console.log("====== delete",result)
    return result
 
};
  const verifyPhoneNumber = async (phone) => {
      const confirm = await auth()
        .verifyPhoneNumber(phone, 1, true)
        .catch((error) => {
          console.log("==", error.message);
        });
        return confirm;

  };
export { handleCheckEmail, verifyPhoneNumber };