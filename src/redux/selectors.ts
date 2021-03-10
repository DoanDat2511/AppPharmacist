import { IImmutableStore } from "./redux-state";

//App
export const sGetAppStatus = (store: IImmutableStore) =>
  store.appState.get("status");
export const sGetIndicatorState = (store: IImmutableStore) =>
  store.appState.get("loading");
export const sGetLanguage = (store: IImmutableStore) =>
  store.appState.get("language");
export const sGetIsLogin = (store: IImmutableStore) =>
  store.authenState.get("isLogin");

export const sGetListProduct = (store: IImmutableStore) =>
  store.authenState.get("product");

export const sGetListUser = (store: IImmutableStore) =>
  store.authenState.get("user");

export const sGetRegistry = (store: IImmutableStore) =>
  store.authenState.get("registry");

