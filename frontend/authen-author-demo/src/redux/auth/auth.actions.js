import AuthTypes from "./auth.types";

export const loginAction = (userId, token, email) => ({
    type: AuthTypes.LOGIN,
    payload: {
        userId,
        token,
        email
    }
});

export const signupAction = (userInfo) => ({
    type: AuthTypes.SIGN_UP,
    payload: userInfo
});

export const logoutAction = () => ({
    type: AuthTypes.LOGOUT
});

export const setAvatar = (avatar) => ({
    type: AuthTypes.SET_AVATAR,
    payload: avatar
});
