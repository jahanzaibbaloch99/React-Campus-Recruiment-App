import React, { useEffect } from 'react';

// IMPORTS..
import { Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteData, companyDataGet } from '../../../../store/action/index';
import { Link } from 'react-router-dom';

// SCSS..
import classes from './adminHome.module.scss';

const Student = () => {
  const { Column } = Table;
  const dispatch = useDispatch();

  useEffect(() => {
    let type = "student";
    dispatch(companyDataGet(type))
  }, [])

  const student = useSelector((state) => {
    if (state.studentReducer.studentData) {
      let dataSource = [];
      let array = state.studentReducer.studentData ? state.studentReducer.studentData : [];
      if (array.length) {
        array.map((val) => {
          const {
            birthdate,
            college,
            education,
            email,
            firstName,
            gender,
            lastName,
            passingOutYear,
            password,
            totalMarks,
          } = val.serverData;
          let obj = {
            key: val.id,
            firstName,
            lastName,
            email,
            birthdate,
            education,
            totalMarks,
            passingOutYear,
            gender,
          };
          dataSource.push(obj);
          return dataSource;
        });
      }

      return dataSource;
    }

  });
  return (
    <React.Fragment>
      <Table className={classes.table} dataSource={student ? student : []}>
        <Column title="First Name" dataIndex="firstName" key="firstName" />
        <Column title="Last Name" dataIndex="lastName" key="lastName" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Birthdate" dataIndex="birthdate" key="birthdate" />
        <Column title="Education" dataIndex="education" key="education" />
        <Column title="Total Marks" dataIndex="totalMarks" key="totalMarks" />
        <Column title="Total Marks" dataIndex="totalMarks" key="totalMarks" />
        <Column title="Passing Out Year" dataIndex="passingOutYear" key="passingOutYear" />
        <Column title="Gender" dataIndex="gender" key="gender" />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <span>
              <div className="table-action-btn">
                <Link to={`/adminIndex/editstudent/${text.key}`}>
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => dispatch(deleteData(text.key, 'student'))}
                />
              </div>
            </span>
          )}
        />
      </Table>
    </React.Fragment>
  );
};

export default Student;
