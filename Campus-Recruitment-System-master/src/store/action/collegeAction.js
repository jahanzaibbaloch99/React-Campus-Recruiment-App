import * as actionType from './actionType';
import { firestore } from '../../firebase/config';

export const collegeData = () => {
  return async (dispatch) => {
    try {
      await firestore
        .collection("colleges")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            let data = doc.data()
            let colleges = {
              id: data.id,
              college: data.college_name
            }
            dispatch({ type: actionType.COLLEGES_DATA, colleges });
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
// export const collegeData = () => {
//   return async (dispatch) => {
//     await firestore
//       .collection('colleges')
//       .get()
//       .then((snapshot) => {
//         snapshot.forEach((doc) => {
//           const colleges = {
//             id: doc.id,
//             ...doc.data(),
//           };
//           dispatch({ type: actionType.COLLEGES_DATA, colleges });
//         });
//       })
//       .catch((error) => {
//         console.log('Error getting document:', error);
//       });
//   };
// };
//drop down on registration
// student can be shown on college data where college id be passed