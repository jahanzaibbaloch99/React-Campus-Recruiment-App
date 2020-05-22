import * as actionType from './actionType';
import { firestore } from '../../firebase/config';


export const deleteData = (Id) => {
  return async (dispatch) => {
    try {
      let usersRef = await firestore.collection("users");
      let vacancyRef = await firestore.collection("vacancy");
      usersRef
        .doc(Id)
        .delete()
        .then((doc) => {
          dispatch({
            type: actionType.DELETE,
            id: Id
          })
        })
      vacancyRef
        .doc()
        .where("userId", '==', Id)
        .delete()
        .then((doc) => {
          dispatch({
            type: actionType.DELET_VACANCY,
            id: Id
          })
        })
    }
    catch (error) {
      console.log(error);
    }
  }
}
// export const delet_user = (user, collec) => {
  // i would need userId of Vacancy to delete specific Vacancy of deleted Company,
  // and would need Id of that company which is userId in Vacancy data,
  // i would also need studentId which would be deleted
//   return async (dispatch) => {
//     try {
//       if (collec === 'company') {
//         const ref = await firestore.collection('comapny_users');
//         const viRef = await firestore.collection('company_vacancy');

//         ref
//           .doc(user)
//           .delete()
//           .then((doc) => {
//             dispatch({ type: actionType.DELET_COMAPNY, id: user });
//           });

//         viRef
//           .where('vacancy.userId', '==', user)
//           .delete()
//           .then((doc) => {
//             dispatch({ type: actionType.DELET_VACANCY, id: user });
//           });
//       }

//       if (collec === 'student') {
//         const ref = await firestore.collection('students_users');

//         ref
//           .doc(user)
//           .delete()
//           .then((doc) => {
//             dispatch({ type: actionType.DELET_USER, id: user });
//           })
//           .catch((error) => console.error('Error removing document: ', error));
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };
