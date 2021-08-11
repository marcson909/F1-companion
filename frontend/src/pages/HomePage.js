import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FormulaAPI from '../apis/FormulaAPI'
import RaceListSummary from '../components/RaceListSummary';
import NavComponent from '../components/NavComponent';

import UserContext from '../contexts/UserContext';
import ListGroup from 'react-bootstrap/ListGroup'

import Container from 'react-bootstrap/Container'


const HomePage = () => {
  const user = useContext(UserContext);

  const [races, setRaces] = useState([]);


  const getSeason = async () => {
    try {
        let racesData = await FormulaAPI.getCurrentSeason()
        racesData = racesData['MRData']['RaceTable']['Races']
        console.log(racesData, 'racesData')
        setRaces( racesData )
      }
    catch  {

    }
  }
  

  useEffect(() => {
      getSeason();
  },[])

   // render
  const renderWelcome = () => {

    if (!user) {
      return (
        <div>
          <NavComponent />
          <Link to="/login"><button>Login</button></Link>
          <Link to="/signup"><button>Signup</button></Link>
        </div>
      )
    }
    if (races == null){
      return null
    }

    let raceElements = races.map((race, index) => {
        return ( 
          <ListGroup key={`race-${index}`}>
            <RaceListSummary raceList={race} />
          </ListGroup>
        )
      })
    
    return (
      <div>
        {/* { renderNavBar() } */}
        <NavComponent />
        <h2>Welcome {user.username}!</h2>
        <h2>Current Race Calendar</h2>
        <ul className="simple-list">
          { raceElements }
        </ul>
      </div>
    )
  }
  console.log(user, 'user at home page')
  return (
    <Container fluid>
      { renderWelcome() }
    </Container>
      

  )
  }

export default HomePage;