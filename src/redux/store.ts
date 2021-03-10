import { createStore, applyMiddleware, compose } from "redux";
import { combineReducers } from "redux-immutable";
import { Record } from "immutable";
import createSagaMiddleware from "redux-saga";
import { IStore } from "./redux-state";
import rootSaga from "./saga/root-saga";
import logger from "redux-logger";
import {
  createTypeReduxInitialState,
  typePendingReducerSet,
} from "./redux-type-saga";
import appReducer, { createInitAppState } from "./reducer/app-reducer";
import authenReducer, { createInitAuthenState } from "./reducer/authen-reducer";

// init
export const InitialState = Record<IStore>({
  ...createTypeReduxInitialState(),
  appState: createInitAppState(),
  authenState: createInitAuthenState(),

})();

export const rootReducer = combineReducers(
  {
    ...typePendingReducerSet,
    appState: appReducer,
    authenState: authenReducer,
  },
  InitialState
);

const sagaMiddleware = createSagaMiddleware();
declare const window;
let composeEnhancers;
if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
export const configureStore = (initialStateMap = InitialState) => {
  const initialState = Record<IStore>({
    ...createTypeReduxInitialState(),
    appState: initialStateMap.appState || createInitAppState(),
    authenState: initialStateMap.authenState || createInitAuthenState(),
  })();
  return createStore(
    rootReducer,
    initialState,
    __DEV__
      ? composeEnhancers(applyMiddleware(sagaMiddleware, logger))
      : applyMiddleware(sagaMiddleware, logger)
  );
};

export const store = configureStore();
sagaMiddleware.run(rootSaga);
