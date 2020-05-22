import * as actionType from './actionType';
import { firestore } from '../../firebase/config';
import { useStore } from 'react-redux';



export const updateAccount = (data, id) => {
  return async (dispatch) => {
    try {
      let accountRef = await firestore.collection("user");
      accountRef
        .doc(id)
        .update({ data })
        .then(() => {
          let updatedData = {
            id,
            data
          };
          dispatch({ type: actionType.UPDATED, updatedData });
        });
    }
    catch (error) {
      // dispatch({ type: actionType.COMPANY_UPDATED, updatedData }) company and user Updated
    }
  }
}

export const updateDataGet = (id) => {
  return async (dispatch) => {
    try {
      await firestore
        .collection("users")
        .doc(id)
        .get()
        .then((doc) => {
          let shouldUpdate = {
            id: id,
            data: doc.data()
          };
          dispatch({ type: actionType.SHOULD_UPDATE, shouldUpdate })
        })
    }
    catch (error) {
      dispatch({
        type: actionType.ERROR, error
      })
    }
  }
}