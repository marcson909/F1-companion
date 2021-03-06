import React, { useContext, useState, useEffect } from 'react';
// import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import NavComponent from '../components/NavComponent';
import UserContext from '../contexts/UserContext';
import ListGroup from 'react-bootstrap/ListGroup'
import DriverListSummary from '../components/DriverListSummary';

import FormulaAPI from '../apis/FormulaAPI'

const DriversPage = () => {
  const user = useContext(UserContext);
  // const [drivers, setDrivers] = useState([]);
  const [driverStandings, setDriverStandings] = useState([]);

  // useEffect(() => {
  //   const getDrivers = async () => {
  //     try {
  //         let driverData = await FormulaAPI.getCurrentDrivers()
  //         driverData = driverData['MRData']['DriverTable']['Drivers']
  //         console.log(driverData, 'driverData')
  //         setDrivers( driverData )
  //       }
  //     catch  {
  
  //     }
  //   }
  //   getDrivers();

  // }, [])

  useEffect(() => {
    const getDriverStandings = async () => {
      try {
          let driverStandingData = await FormulaAPI.getDriverStandings();
          driverStandingData = driverStandingData['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings']
          console.log(driverStandingData, 'driverData')
          setDriverStandings( driverStandingData )
        }
      catch  {
  
      }
    }
    getDriverStandings();

  }, [])




  const renderDriverPage = () => {

    if (driverStandings === null){
      return <p>Loading...</p>
    }

    let driverElements = driverStandings.map((driverStanding, index) => {
      let maxPoints = driverStandings[0].points
        return ( 
          <ListGroup key={`driverStanding-${index}`}>
            <DriverListSummary driverStanding={driverStanding} maxPoints={maxPoints}/>
          </ListGroup>
        )
      })
      return (
        <div>
          <NavComponent />
          { driverElements }
        </div>
      )


  }


  return (
    <Container>
      
      { renderDriverPage() }
    </Container>
  );
};

export default DriversPage;