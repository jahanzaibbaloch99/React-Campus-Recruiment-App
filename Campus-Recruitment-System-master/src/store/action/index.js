export {
  singout,
  registration,
  getMemberData,
  currentUser,
  login,
} from './authAction';

export {
  postVacancy,
  getVacancy,
  vacancyNotification,
  getNotifacations,
  updateVisited,
  companyDataGet
} from './company';

export { collegeData } from './collegeAction';

export {
  studentData,
  // this need to be done
  data_reset,
  singleUser,
  singleCollege,
} from './student';

export { deleteData } from './deleteUser';

export {
  updateAccount,
  updateDataGet,
  // company_updated,
  // student_updated
} from './updateUser';
