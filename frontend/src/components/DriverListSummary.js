import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom';

import ProgressBar from 'react-bootstrap/ProgressBar'

const DriverListSummary = (props) => {


  let points = props.driverStanding.points
  const now = points;
  
  return (


       <ListGroup.Item >
        <Link
          to={{
            pathname:`/drivers/${props.driverStanding.Driver.driverId}`,
            state: { driverStanding: props.driverStanding, 
            },
            }}
          className=" text-decoration-none ">
          <span >
          {props.driverStanding.Driver.permanentNumber}  {props.driverStanding.Driver.givenName} {props.driverStanding.Driver.familyName}
          </span>
          <div className="d-flex flex-row align-items-center justify-content-start">
          <ProgressBar className="w-50 px-1 flex-fill" 
          now={now} 
          label={`${now}%`}
          max={props.maxPoints}
          visuallyHidden
          />
          <span className="flex-fill"> {points} points
          </span>
          </div>
          </Link>
      </ListGroup.Item>
  );
};

export default DriverListSummary;