import React, { useEffect } from 'react';

// IMPORTS...
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import StudentView from './studentView/StudentView';
import { studentData, companyDataGet } from '../../../store/action/index';

// SCSS...
import classes from './students.module.scss';


const Students = () => {
  // console.log(id , "PARAMS")
  const dispatch = useDispatch();
  //for Admin
  React.useEffect(() => {
    let type = "student";
    dispatch(companyDataGet(type))
  }, [])
  let { id } = useParams();
  // for company
  useEffect(() => {
    dispatch(studentData(id));
    console.log(id, "USE EFFECT")
  }, [id]);

  let studentDataa = useSelector((state) => state.studentReducer.studentDetail);
  console.log(studentDataa, "STUD")
  // <StudentView key={e.id} {...e.student.data}/>

  return (
    <div className={classes.Student}>
      <Container>
        <Row>
          {studentDataa.length > 0 ? (
            studentDataa.map((e) => <StudentView key={e.studentid} {...e} />)
          ) : (
              <div>No User..!!</div>
            )}
        </Row>
      </Container>
    </div>
  );
};

export default Students;
