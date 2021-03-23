import {
  checkCredentialAccount,
  checkVerifyOtp,
  resendOtp,
  checkLogin
} from "../action/authen-action";
import { fork, call, takeLatest, put, delay } from "redux-saga/effects";
import Snackbar from "react-native-snackbar";
import {
  handleCheckEmail,
  verifyPhoneNumber,
  verifyOtp,
  addUserFirestore,
} from "../../api/authen-api";

import { addSpinnerSaga } from "../redux-type-saga";


function* sCheckCridentialAccount(action?: any) {
  try {
    const { data, setIsViableOtp } = action.payload;
    console.log("==== data", data)
    const results = yield call(handleCheckEmail, data.email, data.password, data.phoneNumber);
    if (results) {
      const resultOpt = yield call(verifyPhoneNumber, data.phoneNumber);
      
      if (resultOpt) {
        setIsViableOtp(true);

         yield delay(2000);
        yield put(checkCredentialAccount.done(resultOpt));
       
      }
    } else {
      throw new Error("Số điện thoại hoặc email đã đã được sử dụng");
    }
  } catch (error) {
    let textError = "";
  
    Snackbar.show({
      text: error.message,
      duration: 2000,
    });
  }
}

function* sCheckVerifyOtp(action?: any) {
  const { confirm, data, otp, setIsLoading, navigation } = action.payload;
  try {
    const result = yield call(verifyOtp, confirm, otp);
    if (result) {
      yield call(addUserFirestore, data);
      yield Snackbar.show({
         text: "Đăng ký thành công vui lòng chờ admin phê duyệt !",
         duration: 5000,
         action:{
           text:"Ok",
           onPress:()=>{
              navigation.navigate("Login")
           }
         }
       });
      
    }
  
    setIsLoading(false);
  } catch (error) {
    setIsLoading(false);
    Snackbar.show({
      text: error.message,
      duration: 2000,
    });
  }
}
function* sResendOtp(action?: any) {
  const { phoneNumber } = action.payload
  try {
    const result = yield call(
      verifyPhoneNumber,
      phoneNumber
    );

    if (result) {
      yield put(checkCredentialAccount.done(result));
    }
  } catch (error) {
    Snackbar.show({
      text: error.message,
      duration: 2000,
    });
  }

}

function * sCheckLogin(action?: any){
  try {
    
  } catch (error) {
    
  }
}

function* listener(action?: any) {
  yield takeLatest(
    checkCredentialAccount.type,
    addSpinnerSaga(sCheckCridentialAccount)
  );
  yield takeLatest(
    checkVerifyOtp.type,
    sCheckVerifyOtp
  );
  yield takeLatest(
    resendOtp.type,
    addSpinnerSaga(sResendOtp)
  );
   yield takeLatest(checkLogin.type, addSpinnerSaga(sCheckLogin));
}

function* worker(action?: any) { }
export default function* authenSaga(action?: any) {
  yield fork(listener);
  yield fork(worker);
}
