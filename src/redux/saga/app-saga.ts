import { fork, put,call, takeLatest } from "redux-saga/effects";

import authenSaga from "./authen-saga"
import { initAppAction } from "../action/app-action";
import { Screens } from "../../NavigationConfig";
import { setI18n } from "../../utils/app-utils";
import { setLanguageAction } from "../action/app-action";

function* sgInitApplication(action?) {
  try {
    const { navigation } = action?.payload;
    // if(result && result.token){
    //   yield put(checkLoginAction.done(result))
    //   navigation.navigate(Screens.DrawerStack);
    //   return
    // }
    navigation.navigate(Screens.Login)
  } catch (error) {
    console.log('sgInitApplication error',error)
  }
}

function* sgSelectLanguage(action?) {
  try {
    yield setI18n(action.payload);
    yield put(setLanguageAction.done(action.payload));
  } catch (error) {
    console.log("sgSelectLanguage error", error);
  }
}

function* listener(action?: any) {
  yield takeLatest(initAppAction.type, sgInitApplication);
  yield takeLatest(setLanguageAction.type, sgSelectLanguage);
}

function* worker(action?: any) {
  yield fork(authenSaga)

}

export default function* appSaga(action?: any) {
  yield fork(listener);
  yield fork(worker);
}
