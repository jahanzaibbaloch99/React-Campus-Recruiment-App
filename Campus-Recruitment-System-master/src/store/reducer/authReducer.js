import * as actionType from '../action/actionType';
// All Complete //
const initialState = {
  currentUser: false,
  admin: false,
  myUser: false,
  student: false,
  company: false,
  user: false,
  error: false,
  errorMessage: '',
  isLoading: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_USER:
      console.log(action, "GETUSER")
      return {
        ...state,
        user: action.loggedIn,
      }
    case actionType.CURRENT_USER:
      console.log(action, " CURRENT USER")
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case actionType.ADMIN_LOGIN:
      console.log(action.user, " ADMIN LOGIN")
      return {
        ...state,
        admin: action.user,
        errorMessage: '',
        myUser: action.user,
        admin: action.user,
      };
    case actionType.LOGIN_STUDENT:
      console.log(action.user, "USER STUDENT")
      return {
        ...state,
        error: action.error,
        student: action.user,
        myUser: action.user,
        errorMessage: '',
      };
    case actionType.LOGIN_COMPANY:
      console.log(action.user, " ACTION COM{PANYT")
      return {
        ...state,
        error: action.error,
        errorMessage: '',
        myUser: action.user,
        company: action.user,
      };
    case actionType.REGISTER_COMPANY:
      return {
        ...state,
      };
    case actionType.REGISTER_STUDENT:
      return {
        ...state,
      };
    case actionType.ERROR:
      return {
        ...state,
        error: action.error,
        errorMessage: action.errorMessage,
      };
    case actionType.SIGN_OUT:
      return {
        ...state,
        currentUser: false,
        admin: false,
        myUser: false,
        student: false,
        company: false,
        user: false,
        error: false,
        errorMessage: '',
      };
    default:
      return {
        ...state,
      };
  }
};

export default auth;
