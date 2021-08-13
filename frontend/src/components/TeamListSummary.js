import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom';

import ProgressBar from 'react-bootstrap/ProgressBar'

const TeamListSummary = (props) => {

  let points = props.teamStanding.points
  const now = points;
  





  console.log(props.teamStanding ,'team list summary props')
  return (


       <ListGroup.Item>
        <Link to={{
          pathname:`/teams/${props.teamStanding.Constructor.constructorId}`,
          state: { teamStanding: props.teamStanding, 
          },
          }} className=" text-decoration-none " >
          <span >
           {props.teamStanding.Constructor.name}
          </span>
          <div className="d-flex flex-row align-items-center justify-content-start">
          <ProgressBar className="w-50 px-1 flex-fill" now={now} 
          label={`${now}%`}
          max={props.maxPoints}
          visuallyHidden
          />
          <span className="flex-fill"> {points} points</span>
          </div>
          </Link>
      </ListGroup.Item>
  );
};

export default TeamListSummary;