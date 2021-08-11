import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom';

const DriverListSummary = (props) => {
  return (
       <ListGroup.Item>
        <Link to={`/race/${props.raceList.round}`}>{props.raceList.raceName}</Link>
      </ListGroup.Item>
  );
};

export default DriverListSummary;