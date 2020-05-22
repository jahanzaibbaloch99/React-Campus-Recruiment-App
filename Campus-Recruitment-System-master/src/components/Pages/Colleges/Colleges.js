import React, { useEffect } from 'react';

// IMPORTS...
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import CollegesView from './CollegesView/CollegesView';
import { data_reset ,companyDataGet} from '../../../store/action/index';

// SCSS...
import './colleges.scss';

const Colleges = () => {
  const dispatch = useDispatch();
  const collageData = useSelector((state) => state && state.colleges && state.colleges.colleges);
  console.log(collageData)
  useEffect(() => {
    dispatch(data_reset());
  }, [dispatch]);

  return (
    <div className="Colleges">
      <Container>
        <Row>
          {collageData.map((collage) => (
            <CollegesView key={collage.id} {...collage} />
          ))}
        </Row>
      </Container>
    </div>
  );
};
export default Colleges;
