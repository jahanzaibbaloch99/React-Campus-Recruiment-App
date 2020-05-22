import React from 'react';

// IMPORTS...
import { Link, useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUniversity } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { singout } from '../../../../store/action/index';

// SCSS...
import classes from '../header.module.scss';

const Toolbar = () => {
  let displayName;
  const user = useSelector((state) => state.authReducer.user); // auth userChange
  const currentUser = useSelector((state) => state.authReducer.currentUser); // company , admin , student
  const company = useSelector((state) => state.authReducer.company);
  const student = useSelector((state) => state.authReducer.student);
  const admin = useSelector((state) => state.authReducer.admin);
  console.log(company, "COMPANY");
  console.log(student, "STUDENT");
  console.log(admin, "ADMIN")
  console.log(currentUser, "currentuser");
  console.log(user, "user ")
  const dispatch = useDispatch();
  const history = useHistory();
  const signOut = () => {
    history.push('/login');
    return dispatch(singout());
  };

  if (company && company.inputData) displayName = company.inputData.companyName;

  if (student && student.inputData) displayName = `${student.inputData.firstName}  ${student.inputData.lastName}`;


  let LinkItems = null
  if (student === false && admin === false) {
    let Name = currentUser.companyName
    LinkItems = <Link to="/ComapnyVacancy">{Name}</Link>
  }
  else if (company === false && admin === false) {
    let Name = currentUser.firstName
    LinkItems = <Link to={`/profile/${user.uid}`}>{Name}</Link>
  }
  else if (company === false && student === false) {
    LinkItems = <Link to="/adminindex" className={classes.applyBtn}>Admin</Link>
  }
  let login = (
    <React.Fragment>
      <li>
        <Link to="/register" className={classes.applyBtn}>
          Register
        </Link>
      </li>
      <li>
        <Link to="/login" className={classes.applyBtn}>
          Login
        </Link>
      </li>
    </React.Fragment>
  )
  if (currentUser !== false) {
    login = (<li>
      <div onClick={signOut} className={classes.applyBtn}>
        Logout
        </div>
    </li>
    )
  }
  return (
    <div className={classes.Toolbar}>
      <Container className={classes.toolbarContainer}>
        <Row className={classes.toolbarRow}>
          <Col md={6} className={classes.toolbarCol}>
            <div className={classes.toolbarLeft}>
              <div className={classes.welcomeMessage}>
                <FontAwesomeIcon icon={faUniversity} />
                <span>Welcome to CR System</span>
              </div>
            </div>
          </Col>
          <Col md={6} className={classes.toolbarCol}>
            <div className={classes.toolbarRight}>
              <div className={classes.toolbarShareIcon}>
                <ul>
                  <li>
                    {LinkItems}
                  </li>
                  {login}
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </Container >
    </div >
  );
};

export default Toolbar;
