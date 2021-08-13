import React, { useContext, useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container'
import UserContext from '../contexts/UserContext';
import ListGroup from 'react-bootstrap/ListGroup'
import DriverListSummary from '../components/DriverListSummary';

import FormulaAPI from '../apis/FormulaAPI'

const DriverConstructorList = (props) => {
  const user = useContext(UserContext);
  const driverTeam = props.teamId;
  const [driverStandings, setDriverStandings] = useState([]);

  useEffect(() => {
    const getDriverStandings = async () => {
      try {
          let driverStandingData = await FormulaAPI.getDriverStandings();
          driverStandingData = driverStandingData['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings']
          setDriverStandings( driverStandingData )
        }
      catch  {
      }
    }
    getDriverStandings();
  }, [])




  const renderTeamDrivers = () => {

    if (driverStandings === null){
      return <p>Loading...</p>
    }

    let driverElements = driverStandings.map((driverStanding, index) => {

      let maxPoints = driverStandings[0].points
      if ( driverStanding.Constructors[0].constructorId !== driverTeam ){
          return null
        }
        return ( 
          <ListGroup key={`driverStanding-${index}`}>
            <DriverListSummary driverStanding={driverStanding} maxPoints={maxPoints} className="bg-dark text-white" />
          </ListGroup>
          )
      })
      return (
        <div>
          { driverElements }
        </div>
      )


  }

  return (
    <Container className="p-0 m-0">    
      { renderTeamDrivers() }
    </Container>
  );
};

export default DriverConstructorList;