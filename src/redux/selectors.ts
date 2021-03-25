import { IImmutableStore } from "./redux-state";
import { store } from "./store";

//App
export const sGetAppStatus = (store: IImmutableStore) =>
  store.appState.get("status");
export const sGetIndicatorState = (store: IImmutableStore) =>
  store.appState.get("loading");
export const sGetLanguage = (store: IImmutableStore) =>
  store.appState.get("language");
// authen
export const sGetCredential = (store: IImmutableStore) =>
  store.authenState.get("credential");
export const SGetUserInfor = (store: IImmutableStore) =>
  store.authenState.get("userInfo");
