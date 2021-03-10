import { createTypeSagaAction } from "../redux-type-saga";

export const getListProductAction = createTypeSagaAction(
  "GET_LIST_PRODUCT_ACTION"
);
export const getListUser = createTypeSagaAction("GET_LIST_USER");
export const checkLoginAction = createTypeSagaAction("CHECK_LOGIN_ACTION");
export const registryAction = createTypeSagaAction("REGISTRY_ACTION");
export const logoutAction = createTypeSagaAction("LOGOUT_ACTION");
export const forgetPasswordAction = createTypeSagaAction(
  "FORGET_PASSWORD_ACTION"
);
