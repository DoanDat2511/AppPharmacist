import { IImmutableStore } from "./redux-state";

//App
export const sGetAppStatus = (store: IImmutableStore) =>
  store.appState.get("status");
export const sGetIndicatorState = (store: IImmutableStore) =>
  store.appState.get("loading");
export const sGetLanguage = (store: IImmutableStore) =>
  store.appState.get("language");
export const sGetCredential = (store: IImmutableStore) =>
  store.authenState.get("credential");
