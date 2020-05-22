import React from 'react';

// IMPORTS..
import { useSelector, useDispatch } from 'react-redux';
import CompanyView from './ComapanyView/CompanyView';
import { Container, Row } from 'react-bootstrap';
import { companyDataGet } from "../../../store/action/index";
// SCSS..
import classes from './company.module.scss';


const Companys = () => {
  let dispatch = useDispatch();

  React.useEffect(() => {
    let type = "company";
    dispatch(companyDataGet(type))
  }, [])
  const company = useSelector((state) => state.companyReducer.companyData);
  console.log(company)
  return (
    <div className={classes.Companys}>
      <Container>
        <Row>
          {company.map((e) => (
            <CompanyView key={e.id} {...e.serverData} />
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Companys;
