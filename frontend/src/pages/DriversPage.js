import React, { useContext } from 'react';
// import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import NavComponent from '../components/NavComponent';
import UserContext from '../contexts/UserContext';

const DriversPage = (props) => {
  const user = useContext(UserContext);
  console.log(user, 'user at driver page')
  return (
    <Container>
      
      <NavComponent />
      List of drivers here
    </Container>
  );
};

export default DriversPage;