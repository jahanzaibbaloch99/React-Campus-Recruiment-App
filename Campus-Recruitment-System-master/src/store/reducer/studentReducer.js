import * as actionType from '../action/actionType';

const initialState = {
  studentData: [],
  studentDetail: [],
  singleData: false,
  collegeName: '',
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.STUDENTS_DATA: // completed
      console.log(action.data, " NEW DATA")
      return {
        ...state,
        studentData: [...state.studentData, action.data],
      };
    case actionType.STUDENT_DATA: // completed
      console.log(action, "NEW DATA 1")
      return {
        ...state,
        studentDetail: [...state.studentData, action.myData],
      };
    case actionType.DELETE: // completed
      const newData = state.studentData.filter((data) => data.id !== action.id);
      return {
        ...state,
        studentData: [...newData],
      };
    case actionType.SHOULD_UPDATE:
      return {
        ...state,
        singleData: action.shouldUpdate,
      };
    case actionType.UPDATED:
      const index = state.studentData.findIndex((data) => data.id === action.updatedData.id);
      const arr = [...state.studentData];
      arr[index] = action.updatedData;
      return {
        ...state,
        studentData: [...arr],
        singleData: action.updatedData,
      };
    case actionType.DATA_RESET:
      return {
        ...state,
        studentData: [],
      };
    case actionType.SINGLE_DATA:
      return {
        ...state,
        singleData: action.data,
      };
    case actionType.SINGLE_STUDENT_UPDATED:
      return {
        ...state,
        singleData: action.data,
      };
    case actionType.COLLEGE_NAME:
      return {
        ...state,
        collegeName: action.collegeName,
      };
    default:
      return {
        ...state,
      };
  }

};

export default studentReducer;
