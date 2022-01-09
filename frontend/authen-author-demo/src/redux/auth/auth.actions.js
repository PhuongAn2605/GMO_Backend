import AuthTypes from "./auth.types";

export const loginAction = (userId, token, expirationDate, email) => ({
    type: AuthTypes.LOGIN,
    payload: {
        userId,
        token,
        expirationDate,
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

export const setEmailAction = (email) => ({
    type: AuthTypes.SET_EMAIL,
    payload: email
})

export const setAvatar = (avatar) => ({
    type: AuthTypes.SET_AVATAR,
    payload: avatar
});
