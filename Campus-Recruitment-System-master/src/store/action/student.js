import * as actionType from './actionType';
import { firestore } from '../../firebase/config';
import firebase from "firebase"


// studentData of Particular College to Company Page 
export const studentData = (Id) => {
  console.log(Id, "ACTION NEW ")
  return async (dispatch) => {
    try {
      console.log(Id, " ID")
      firestore
        .collection("users")
        .where("college", '==', Id)
        .get()
        .then((querySnapshot) => {
          // debugger;
          querySnapshot.forEach((doc) => {
            console.log(doc.data())
            let myData = doc.data();
            myData.studentId = doc.id
            dispatch({
              type: actionType.STUDENT_DATA,
              myData
            })
          })
        })
    }
    catch (error) {
      dispatch({
        type: actionType.ERROR,
        err: error
      })
    }
  }
}


// export const student_data = (collegeId) => {
//   return async (dispatch) => {
//     await firestore
//       .collection('students_users')
//       .where('data.college', '==', collegeId)
//       .get()
//       .then((snapshot) => {
//         snapshot.docs.forEach((doc) => {
//           const data = {
//             id: doc.id,
//             student: doc.data(),
//           };

//           dispatch({
//             type: actionType.STUDENT_DATA,
//             data,
//           });
//         });
//       })
//       .catch((error) => {
//         console.log('Error getting document:', error);
//       });
//   };
// };

// export const single_Data = (studentId) => {
//   return async (dispatch) => {
//     await firestore
//       .collection('students_users')
//       .doc(studentId)
//       .get()
//       .then((doc) => {
//         const data = {
//           id: doc.id,
//           ...doc.data(),
//         };

//         dispatch({ type: actionType.SINGLE_DATA, data });
//       })
//       .catch((err) => console.log(err));
//   };
// };

// Single Student Data Of Any College

export const singleUser = (Id) => {
  return async (dispatch) => {
    try {
      await firestore
        .collection("users")
        .doc(Id)
        .get()
        .then((doc) => {
          const data = {
            id: doc.id,
            ...doc.data(),
          }
          dispatch({ type: actionType.SINGLE_DATA, data });
        })
    }
    catch (error) {
      dispatch({
        type: actionType.ERROR,
        err: error
      })
    }
  }
}

// GET Single College Name Data with ID
export const singleCollege = (collegeId) => {
  return async (dispatch) => {
    try {
      await firestore
        .collection("colleges")
        .doc(collegeId)
        .get()
        .then((doc) => {
          let college = doc.data().collegeName;
          dispatch({
            type: actionType.COLLEGE_NAME, college
          })
        })
    }
    catch (error) {
      dispatch({
        type: actionType.ERROR,
        err: error
      })
    }
  }
}

// export const college_data = (collegeId) => {
//   return async (dispatch) => {
//     await firestore
//       .collection('colleges')
//       .doc(collegeId)
//       .get()
//       .then((doc) => {
//         dispatch({ type: actionType.COLLEGE_NAME, collegeName: doc.data().collegeName });
//       })
//       .catch((err) => console.log(err));
//   };
// };

export const data_reset = (payload) => {
  return {
    type: actionType.DATA_RESET,
  };
};
