import React from 'react';
import { Link } from "react-router-dom"
import ListGroup from 'react-bootstrap/ListGroup'

const LeagueListSummary = (props) => {
  console.log(props)
  return (
    <div>
      <ListGroup.Item>
        {/* <Link to={`/leagues/${props.league.id}`}>{props.league.name}</Link> */}
        <Link to={{
          pathname:`/leagues/${props.league.id}`,
          state: { backendDrivers: props.backendDrivers,
          backendConstructors: props.backendConstructors,
        },
        }} className="text-decoration-none"
        >{props.league.name}
        </Link>
      </ListGroup.Item>
    </div>
  );
};

export default LeagueListSummary;