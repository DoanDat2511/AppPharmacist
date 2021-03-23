import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import moment from "moment"
import {
  uploadImageToStorage,
} from "../utils/helpers";

import { DIR_IMG_PREFIX, DIR_USER_AVATAR ,COLLECTION } from "../utils/constant"

import {EAdmin ,EAccept} from "../types/Authen"

// export  interface IUser {
//     email: string,
//     password: string,
//     gmail: string,
//     id:string,
//     phoneNumber: string,
//     address: string,
//     isAdmin: number,
//     createAt: string,
//     updateAt: string,
//     deleteAt: string,
//     isOnline: boolean,
//     deviceToken : Array<any>,
//     isAccept: number
// }
const handleCheckEmail = async (email: string, password: string, phoneNumber: string) :Promise<boolean>  => {
    var result = true
    const snapShotEmail = await firestore()
        .collection(COLLECTION.User)
        .where("email", "==", email)
        .get()

    const snapShotPhone = await firestore()
        .collection(COLLECTION.User)
        .where("phoneNumber", "==", phoneNumber)
        .get()

    if (!snapShotEmail.empty || !snapShotPhone.empty) {
        result = false
    } else {
        const temple = await auth().createUserWithEmailAndPassword(email, password)
        result = true

    }
    return result


};
const verifyPhoneNumber = async (phone) : Promise<any> => {
    const confirm = await auth()
        .verifyPhoneNumber(phone, 1, true)
    return confirm;
};

const addUserFirestore = async (data: any) => {

    const imgPath =  await uploadImageToStorage(DIR_IMG_PREFIX,data?.imgPath,DIR_USER_AVATAR)

    const result = await firestore().collection(COLLECTION.User).add({
        ...data,
        imgPath,
        isAdmin:EAdmin.NORMAL,
        isAccept:EAccept.WAITTING,
        createAt:moment().format('DD/MM/YYYY, h:mm:ss a'),
        updateAt:"",
        deleteAt:"",
        isOnline: false,
        deviceToken:[]

    })
    if (result && imgPath ) {
        await firestore().collection(COLLECTION.User).doc(result.id).update({
            id: result.id
        })
    }

}
const verifyOtp = async (confirm, otp) => {
    try {
        const credential = await auth.PhoneAuthProvider.credential(
            confirm,
            otp
        );
        const userData = await auth().currentUser.linkWithCredential(credential);
        if (userData?.user) {
            return true
        }

    } catch (error) {
        console.log("Errrrr", error)
    }


};
export { handleCheckEmail, verifyPhoneNumber, verifyOtp ,addUserFirestore };
