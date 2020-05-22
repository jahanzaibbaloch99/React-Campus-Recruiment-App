import React, { useEffect, useState } from 'react';

// IMPORTS...
import Routes from './components/Routes/Routes';
import { useHistory } from 'react-router-dom';
import {
  getVacancy,
  collegeData,
  companyDataGet
} from './store/action/index';
import { auth } from './firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './components/Layout/Loader/Loader';

// SCSS...
import './App.scss';

const App = () => {
  const initialState = {
    isLoading: false,
  };
  const [state, setState] = useState(initialState);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  const currentType = useSelector((state) => state.authReducer.userData);

  useEffect(() => {
    // dispatch(vacancys());
    dispatch(getVacancy());
    // dispatch(company_data(type));
    dispatch(collegeData());
  }, [dispatch]);

 
  useEffect(() => {
    setState({
      ...state,
      isLoading: true,
    });

    setState({
      ...state,
      isLoading: false,
    });

  }, [dispatch, currentType, history]);

  return <div className="App">{state.isLoading ? <Loader /> : <Routes />}</div>;
};

export default App;
