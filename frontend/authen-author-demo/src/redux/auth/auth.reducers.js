import AuthTypes from "./auth.types";
import { login } from "./auth.utils";

const INITIAL_STATE = {
  isLoggedIn: false,
  userId: null,
  token: null,
  email: null,
  avatar: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthTypes.SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };

    case AuthTypes.LOGIN:
      const { userId, token, expirationDate, email } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        token: token,
        userId: userId,
        tokenExpirationDate: login(userId, token, expirationDate, email),
      };

    case AuthTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        tokenExpirationDate: null,
        userId: null,
      };

    case AuthTypes.SET_AVATAR:
      console.log(action.payload);
      return {
        ...state,
        avatar: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
