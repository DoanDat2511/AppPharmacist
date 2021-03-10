import { createTypeSagaAction, createTypeAction } from "../redux-type-saga";

export const initApplicationAction = createTypeSagaAction("INIT_APPLICATION");
export const updateAppLoadingAction = createTypeAction(
  "UPDATE_APP_LOADING_STATE"
);
export const initAppAction = createTypeSagaAction("INIT_APP_ACTION");
export const setLanguageAction = createTypeSagaAction("SET_LANGUAGE_ACTION");
