import * as actionType from './actionType';
import {
  auth,
  firestore
} from '../../firebase/config';
import firebase from "firebase"

// Current User Logged In.
export const getMemberData = () => {
  if (firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise((resolve) => {
    firebase.auth().onAuthStateChanged((loggedIn) => {
      if (loggedIn) {
        return resolve(
          dispatch({
            type: actionType.GET_USER,
            loggedIn
          }),
          dispatch(currentUser(loggedIn)));
      }
      return () => new Promise(() => resolve());
    });
  });
}


// Current Users Data from Database
export const currentUser = (user) => {
  return async (dispatch) => {
    try {
      let currentUser = await firestore
        .collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => doc.data())
      dispatch({
        type: actionType.CURRENT_USER,
        currentUser,
      })
    }
    catch (error) {
      dispatch({
        type: actionType.ERROR,
        error: true,
        errorMessage: 'No user',
      });
    }
  }
}

// login for student, company & admin 
export const login = (login, type) => {
  return async (dispatch) => {
    try {
      let singin = await auth.signInWithEmailAndPassword(login.email, login.password);
      let user = await firestore
        .collection("users")
        .doc(singin.user.uid)
        .get()
        .then((doc) => doc.data());
      if (user.accountType === "company") {
        dispatch({
          type: actionType.LOGIN_COMPANY,
          user: singin.user.uid,
          error: false,
        })
        localStorage.setItem('USER_TOKEN', singin.user.uid)
      }
      else if (user.accountType === "student") {
        dispatch({
          type: actionType.LOGIN_STUDENT,
          user: singin.user.uid,
          error: false,
        })
        localStorage.setItem('USER_TOKEN', singin.user.uid)
      }
      else {
        dispatch({
          type: actionType.ADMIN_LOGIN,
          user: singin.user.uid,
          error: false,
        })
      }
      localStorage.setItem('USER_TOKEN', singin.user.uid)

    }
    catch (error) {
      dispatch({
        type: actionType.ERROR,
        error: true,
        errorMessage: 'Invalid Credientals',
      })
    }
  }
}
// Registration Completed For Student & Company
export const registration = (email, password, inputData, accountType) => {
  let data = null;
  if (accountType === "company") {
    data = {
      accountType: accountType,
      companyName: inputData.companyName,
      companyType: inputData.companyType,
      companyLocation: inputData.companyLocation,
      companyEmail: inputData.companyEmail,
      companyPassword: inputData.companyPassword
    }
  }
  else if (accountType === "student") {
    data = {
      accountType,
      firstName: inputData.firstName,
      lastName: inputData.lastName,
      email: inputData.email,
      education: inputData.education,
      totalMarks: inputData.totalMarks,
      passingOutYear: inputData.passingOutYear,
      gender: inputData.gender,
      college: inputData.college,
      birthdate: inputData.birthdate,
      password: inputData.password
    }
  }
  return async (dispatch) => {
    try {
      data = data
      const newAccount = await auth.createUserWithEmailAndPassword(email, password);
      await firestore
        .collection("users")
        .doc(newAccount.user.uid)
        .set(data)
        .then((doc) => {
          if (accountType === "company") {
            dispatch({ type: actionType.REGISTER_COMPANY })
          }
          else if (accountType === "student") {
            dispatch({ type: actionType.REGISTER_STUDENT });
          }
        })
        .catch((error) => {
          console.log(error)
        })
      localStorage.setItem('USER_TOKEN', inputData);
    }
    catch (error) {
      console.log(error)
      console.log(error)
      dispatch({
        type: actionType.ERROR,
        error: true,
        errorMessage: 'Failed to register'

      });
    }
  }
}

//Sign Out 
export const singout = () => {
  return (dispatch) => {
    auth.signOut().then(() => {
      dispatch({
        type: actionType.SIGN_OUT,
      });
    });
    localStorage.removeItem('USER_TOKEN');
  };
};
