export const initialState = {
  user: null,
  signOut: false,
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SIGN_OUT: "SIGN_OUT",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.SIGN_OUT:
      return {
        ...state,
        signOut: action.signOut,
      };
    default:
      return state;
  }
};

export default reducer;
