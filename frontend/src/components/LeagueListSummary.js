import React from 'react';
import { Link } from "react-router-dom"
import ListGroup from 'react-bootstrap/ListGroup'

const LeagueListSummary = (props) => {
  console.log(props)
  return (
    <div>
      <ListGroup.Item>
        <Link to={`/leagues/${props.league.id}`}>{props.league.name}</Link>
      </ListGroup.Item>
    </div>
  );
};

export default LeagueListSummary;