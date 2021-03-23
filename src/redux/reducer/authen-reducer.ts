import { createTypeReducer } from "../redux-type-saga";
import { IImutableAuthenState } from "../redux-state";
import { fromJS } from "immutable";
import {
  checkCredentialAccount,
  checkLogin
} from "../action/authen-action";

export function createInitAuthenState(): IImutableAuthenState {
  return fromJS({
    credential:{},
    userInfo:{}
  });
}
export const setCredential = checkCredentialAccount.done.reducer<
         IImutableAuthenState
       >((state, action) => {
         return state.set("credential", fromJS(action.payload));
       });

export const setUserInfo = checkLogin.done.reducer<
  IImutableAuthenState
>((state, action) => {
  return state.set("userInfo", fromJS(action.payload));
});

const authenReducer = createTypeReducer<IImutableAuthenState>(
  createInitAuthenState(),
  setCredential,
  setUserInfo
);

export default authenReducer;
