import { fromJS } from "immutable";

import { createTypeReducer } from "../redux-type-saga";
import { AppStatus, IImmutableAppState } from "../redux-state";
import {
  initApplicationAction,
  updateAppLoadingAction,
  setLanguageAction,
} from "../action/app-action";
import { ELanguage } from "../../common/interface";
// function return fromJS tra ve IImmutableAppState
export function createInitAppState(): IImmutableAppState {
  return fromJS({
    status: AppStatus.Unload,
    displayIndicator: false,
    language: ELanguage.English,
    loading: false,
  });
}

export const initApplicationReducer = initApplicationAction.done.reducer<
  IImmutableAppState
>((state, action) => {
  return state.set("status", action.payload);
});

export const setIndicatorReducer = updateAppLoadingAction.reducer<
  IImmutableAppState
>((state, action) => {
  return state.set("loading", !!action.payload);
});

export const setLanguageReducer = setLanguageAction.done.reducer<
  IImmutableAppState
>((state, action) => {
  return state.set("language", action.payload);
});

const appReducer = createTypeReducer<IImmutableAppState>(
  createInitAppState(),
  initApplicationReducer,
  setIndicatorReducer,
  setLanguageReducer
);

export default appReducer;
