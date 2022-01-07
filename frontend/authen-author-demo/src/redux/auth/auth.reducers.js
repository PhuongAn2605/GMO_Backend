import AuthTypes from "./auth.types";

const INITIAL_STATE = {
  currentUser: {},
  isLoggedIn: false,
  userId: null,
  token: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthTypes.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
      };

    case AuthTypes.SIGN_UP:
      const { name, email, password } = action.payload;
      return {
        ...state,
        currentUser: {
            name,
            email,
            password
        },
        isLoggedIn: true,
      };

    case AuthTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
      };

    default:
      return state;
  }
};

export default authReducer;
