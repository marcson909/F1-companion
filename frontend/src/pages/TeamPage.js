import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container'

import UserContext from '../contexts/UserContext';
import NavComponent from '../components/NavComponent';

const TeamPage = (props) => {
  const user = useContext(UserContext);
  console.log(user, 'user at teampage')
  return (
    <Container fluid>
      <NavComponent />
      List of Teams here
    </Container>
  );
};

export default TeamPage;