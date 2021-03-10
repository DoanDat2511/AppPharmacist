import { createTypeReducer } from "../redux-type-saga";
import { IImutableAuthenState } from "../redux-state";
import { fromJS } from "immutable";
import {
  getListProductAction,
  getListUser,
  registryAction,
  checkLoginAction,
} from "../action/authen-action";

export function createInitAuthenState(): IImutableAuthenState {
  return fromJS({
    isLogin: {},
    product: [],
    user: [],
    authen: {},
    registry: {},
  });
}
export const setUserLoginReducer = checkLoginAction.done.reducer<
  IImutableAuthenState
>((state, action) => {
  return state.set("isLogin", fromJS(action.payload));
});

export const getListProductReducer = getListProductAction.done.reducer<
  IImutableAuthenState
>((state, action) => {
  return state.set("product", fromJS(action.payload));
});

export const getListUserReducer = getListUser.done.reducer<
  IImutableAuthenState
>((state, action) => {
  return state.set("user", fromJS(action.payload));
});

export const setRegistryReducer = registryAction.done.reducer<
  IImutableAuthenState
>((state, action) => {
  return state.set("registry", fromJS(action.payload));
});
const authenReducer = createTypeReducer<IImutableAuthenState>(
  createInitAuthenState(),
  getListProductReducer,
  getListUserReducer,
  setRegistryReducer,
  setUserLoginReducer
);

export default authenReducer;
