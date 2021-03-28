import {
checkCredentialAccount
} from "../action/user-action";
import { fork, call, takeLatest, put, spawn, delay } from "redux-saga/effects";
import Snackbar from "react-native-snackbar";

import { addSpinnerSaga } from "../redux-type-saga";
import { handleCheckEmail, verifyPhoneNumber } from "../../api/userApi";

function* sCheckCridentialAccount(action?: any) {
  try {
    const { email, password, setIsViableOtp } = action.payload;
    const result = yield call(handleCheckEmail, email, password);
    const resultOpt = yield call(verifyPhoneNumber, "+84363877693");
    console.log("result otp ====", resultOpt);
    yield delay(1000);
    if(resultOpt){
      yield put(checkCredentialAccount.done(resultOpt))
    }

  } catch (error) {
    let textError = "";
    switch (error.code) {
      case "auth/invalid-email":
        textError = "인증번호 오류 다시 확인해주세요";
        break;
      case "auth/session-expired":
        textError = "입력가능한 시간이 지났습니다 인증코드를 새로 받아주세요";

        break;
      case "auth/unknown":
        textError =
          "안녕하세요 해당 번호는 이미 다른 sns계정으로 가입되어있습니다, 해당 sns로 로그인하실려면 기존의 계정을 탈퇴해주시기 바랍니다";

        break;
      case "auth/credential-already-in-use":
      case "auth/provider-already-linked":
        textError = error.message;
        break;
      default:
        textError = error.message;
        break;
    }
    Snackbar.show({
      text: textError,
      duration: 10000,
    });
  }
}

function* listener(action?: any) {
  yield takeLatest(
    checkCredentialAccount.type,
    addSpinnerSaga(sCheckCridentialAccount)
  );
}

function* worker(action?: any) {

}

export default function* userSaga(action?: any) {
  yield fork(listener);
  yield spawn(worker);
}
