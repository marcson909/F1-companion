import React from 'react';
import { Link } from "react-router-dom"
import ListGroup from 'react-bootstrap/ListGroup'
import Button from "react-bootstrap/esm/Button";
import { useLocation } from 'react-router';

const FantasyTeamListSummary = (props) => {
  console.log(props, 'props team list summary')
  const location = useLocation();
  const {backendDrivers, backendConstructors} = location.state
  return (
    <div>
      <ListGroup.Item>
      <Link to={{
        pathname:`/fantasy-teams/${props.team.owner}`,
        state: {
          team: props.team,
          league: props.league,
          backendDrivers: backendDrivers,
          backendConstructors: backendConstructors,
        },
        }}className=" text-decoration-none "
      >
        <span> {props.team.name} </span>
      </Link>
      {props.handleDelete &&
        <Button onClick={() => props.handleDelete(props.team.id)}>Delete Team</Button>
      }
      </ListGroup.Item>
      
    </div>
  );
};

export default FantasyTeamListSummary;