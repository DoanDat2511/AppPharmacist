import { fork, take, cancel, select, cancelled } from "redux-saga/effects";
import appSaga from "./app-saga";

export default function* rootSaga() {
  try {
    yield fork(appSaga);
  } catch (error) {
    // Handle error
  }
}
