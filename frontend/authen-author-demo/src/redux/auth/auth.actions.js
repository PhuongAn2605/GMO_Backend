import AuthTypes from "./auth.types";

export const loginAction = (userInfo) => ({
    type: AuthTypes.LOGIN,
    payload: userInfo
});

export const signupAction = (userInfo) => ({
    type: AuthTypes.SIGN_UP,
    payload: userInfo
});

export const logoutAction = () => ({
    type: AuthTypes.LOGOUT
})