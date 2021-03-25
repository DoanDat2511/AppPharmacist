import { createTypeSagaAction ,createTypeAction } from "../redux-type-saga";

export const resendOtp = createTypeAction("RE_SEND_OTP");

export const checkCredentialAccount = createTypeSagaAction(
  "CHECK_CREDENTIAL_ACCOUNT"
);

export const checkVerifyOtp = createTypeSagaAction("CHECK_VERIFY_OTP")


export const checkLoginAction = createTypeSagaAction("CHECK_LOGIN_ACTION")

export const logoutAction = createTypeSagaAction("LOGOUT_ACTION")