import {
  checkCredentialAccount,
  checkVerifyOtp,
  resendOtp,
  checkLoginAction,
  logoutAction
} from "../action/authen-action";
import { fork, call, takeLatest, put, delay } from "redux-saga/effects";
import Snackbar from "react-native-snackbar";
import {
  handleCheckEmail,
  verifyPhoneNumber,
  verifyOtp,
  addUserFirestore,
  checkLoginApi,
  changeStatusOnline,
  logoutApi
} from "../../api/authen-api";
import {remove, set} from "../../utils/storage"
import {USER_INFOR} from "../../utils/constant"
import { addSpinnerSaga } from "../redux-type-saga";


function* sCheckCridentialAccount(action?: any) {
  try {
    const { data, setIsViableOtp } = action.payload;
    console.log("==== data", data)
    const results = yield call(handleCheckEmail, data.email, data.password, data.phoneNumber);
    if (results) {
      const resultOpt = yield call(verifyPhoneNumber, data.phoneNumber);
        setIsViableOtp(true);
      if (resultOpt) {
      
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

function* sCheckLogin(action?: any){
  const {email, password ,navigation} = action.payload
  try {
    const result = yield  call(checkLoginApi,email,password)
    if(result && result.isAccept === 1){
      yield call(changeStatusOnline,true,result.id)
      yield put(checkLoginAction.done(result))
      yield set(USER_INFOR,result)
      yield navigation.navigate("Tabbar",{screen:"Home"});
    }
  } catch (err) {
      Snackbar.show({
        text: err.message,
        duration: 2000,
      });
  }
}

function* sLogout (action?:any){
    const {id , navigation} = action.payload
    console.log("payload ,",id)

    try {
      if(id){
          yield navigation.navigate("Login");
         yield call(remove, USER_INFOR);
         yield put(checkLoginAction.done({}));
           yield call(changeStatusOnline, false, id);
       
         yield call(logoutApi);
      }
    
     
    } catch (err) {
        Snackbar.show({
          text: err.message,
          duration: 2000,
        });
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
   yield takeLatest(checkLoginAction.type, addSpinnerSaga(sCheckLogin));
   yield takeLatest(logoutAction.type, sLogout);
}

function* worker(action?: any) { }
export default function* authenSaga(action?: any) {
  yield fork(listener);
  yield fork(worker);
}
