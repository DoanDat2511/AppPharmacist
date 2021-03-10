import {
  checkLoginAction,
  getListProductAction,
  getListUser,
  registryAction,
  logoutAction,
  forgetPasswordAction,
} from "../action/authen-action";
import { fork, call, takeLatest, put, delay } from "redux-saga/effects";
import Snackbar from "react-native-snackbar";

import { set, remove } from "../../utils/storage";
import { addSpinnerSaga } from "../redux-type-saga";

function* sgCheckLoginUser(action?) {
  try {
    // const { username, password, navigation } = action.payload;
    // const result = yield call(loginCtr, username, password);
    // console.log("result", result);
    // if (result.token && result) {
    //   yield set(authen_login_storerage, result);
    //   yield put(checkLoginAction.done(result));
    //   navigation.navigate("DrawerStack");
    //   return;
    // }
    // throw new Error(result.message);
  } catch (err) {
    Snackbar.show({ text: err.message, duration: Snackbar.LENGTH_LONG });
    console.log("sgCheckLoginUser error", err);
  }
}
function* sgGeListProduct(action?) {
  try {
    yield put(
      getListProductAction.done([
        {
          name: "da dfasd asfd",
        },
      ])
    );
  } catch (error) {
    console.log("sgGetHistory error", error);
  }
}
function* sgGetListUser(action?) {
  // const dataResult = yield call(getAllListUser);
  try {
    // yield put(getListUser.done(dataResult));
  } catch (error) {
    console.log("error sgGetListUser", error);
  }
}

function* sgRegistry(action?) {
  const { body, dataParamer, navigation } = action.payload;
  try {
    // const result = yield call(resgitry, body, dataParamer);
    // console.log("result", result);
    // if (result.status === 200) {
    //   yield put(registryAction.done(result));
    //   Snackbar.show({ text: result.message, duration: Snackbar.LENGTH_LONG });
    //   navigation.goBack();
    // }
  } catch (error) {
    Snackbar.show({ text: error, duration: Snackbar.LENGTH_LONG });
  }
}

function* sgLogout(action?) {
  try {
    const { token, navigation, onCloseDrawer } = action.payload;
    // const result = yield call(logout, token);
    // if (!result) {
    //   yield navigation.navigate("Login");
    //   yield onCloseDrawer();
    //   return;
    // }
  } catch (err) {
    console.log("sgLogout error", err);
  }
}

function* sgForgetPassword(action?) {
  // try {
  //   const { email } = action.payload;
  //   const result = yield call(forgetPassword, email);
  //   console.log('resut saga',result)
  //   if (result.status===200) {
  //     // alert('than cong')
  //     Snackbar.show({text: result?.message, duration: Snackbar.LENGTH_LONG })
  //   }
  // } catch (err) {
  //   Snackbar.show({text: err.message, duration: Snackbar.LENGTH_LONG })

  //   console.log("sgForgetPassword error", err);
  // }
}

function* listener(action?: any) {
  yield takeLatest(checkLoginAction.type, addSpinnerSaga(sgCheckLoginUser));
  yield takeLatest(getListProductAction.type, sgGeListProduct);
  yield takeLatest(getListUser.type, sgGetListUser);
  yield takeLatest(registryAction.type, addSpinnerSaga(sgRegistry));
  yield takeLatest(logoutAction.type, sgLogout);
  yield takeLatest(forgetPasswordAction.type, addSpinnerSaga(sgForgetPassword));
}

function* worker(action?: any) {}
export default function* authenSaga(action?: any) {
  yield fork(listener);
  yield fork(worker);
}
