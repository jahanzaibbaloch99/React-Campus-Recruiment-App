import * as actionType from './actionType';
import { firestore } from '../../firebase/config';

// Getting Vacancy from DB
export const getVacancy = () => {
  return async (dispatch) => {
    try {
      await firestore.collection("vacancy").get().then((res) => {
        res.forEach((doc) => {
          const data = {
            id: doc.id,
            vacancy: doc.data()
          };
          dispatch({
            type: actionType.GET_VACANCY,
            data
          });
        })
      });
    }

    catch (err) {
      dispatch({
        type: actionType.ERROR,
        err
      });
    };
  };
};
/// get notification usman function
export const getNotifacations = (companyId) => async (dispatch) => {
  await firestore
    .collection('notifications')
    .where('userId', '==', companyId)
    .onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach((change) => {
        if (change.type === 'added') {
          dispatch({
            type: actionType.GET_NOTIFICATION,
            notification: {
              notId: change.doc.id,
              data: change.doc.data(),
            },
          });
        }
      });
    });
};


// Company User Data;
// Student Data Method Same;
export const companyDataGet = (type) => {
  return async (dispatch) => {
    try {
      await firestore.collection("users")
        .where("accountType", '==', type)
        .get()
        .then((querySnapshot) => {
          console.log(querySnapshot, "DATA")
          querySnapshot.forEach((doc => {
            let data = {
              id: doc.id,
              serverData: doc.data()
            }
            if (type === "company") {
              dispatch({
                type: actionType.COMPANY_DATA,
                data,
              });
            }
            else if (type === "student") {
              dispatch({
                type: actionType.STUDENTS_DATA,
                data,
              });
            }
          }))
        })
    }
    catch (error) {
      dispatch({
        type: actionType.ERROR,
        error
      })
    }
  }
}

// Post Vacancy To DB
export const postVacancy = (vacancy) => {
  return async (dispatch) => {
    try {
      await firestore.collection("vacancy").add(vacancy).then((res) => {
        const data = {
          id: res.id,
          vacancy
        };
        dispatch({
          type: actionType.VACANCY_DATA_POST,
          data
        })
      })
    }
    catch (error) {
      dispatch({
        type: actionType.ERROR,
        error
      })
    }
  }
}



export const vacancyNotification = (notification) => async (dispatch) => {
  await firestore
    .collection('notifications')
    .add({
      ...notification,
    })
    .then((doc) =>
      dispatch({
        type: actionType.NOTIFICATION,
      })
    );
};


export const updateVisited = (visitedId) => async (dispatch) => {
  await firestore
    .collection('notifications')
    .doc(visitedId)
    .update({ visited: true })
    .then(() => {
      dispatch({ type: actionType.UPDATE_VISITED, visitedId });
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
};
