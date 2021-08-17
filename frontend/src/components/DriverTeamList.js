import React, { useContext, useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container'
import UserContext from '../contexts/UserContext';
import ListGroup from 'react-bootstrap/ListGroup'
import TeamListSummary from './TeamListSummary';

import FormulaAPI from '../apis/FormulaAPI'

const DriverTeamList = (props) => {
  const user = useContext(UserContext);
  const team = props.teamId;
  const standings = props.standings
  const [teamStandings, setTeamStandings] = useState([]);

  console.log(props, 'props driver team list')

  useEffect(() => {
    const getTeamStandings = async () => {
      try {
          let teamStandingData = await FormulaAPI.getTeamStandings();
          teamStandingData = teamStandingData['MRData']['StandingsTable']['StandingsLists'][0]['ConstructorStandings']
          setTeamStandings( teamStandingData )
        }
      catch  {
      }
    }
    getTeamStandings();
  }, [])

  const renderDriverTeams = () => {

    if (teamStandings === null){
      return <p>Loading...</p>
    }

    let teamElements = teamStandings.map((teamStanding, index) => {
      console.log(teamStanding,'teamstanding')
      let maxPoints = teamStandings[0].points
      if ( teamStanding.Constructor.constructorId !== team ){
          return null
        }
        return ( 
          <ListGroup key={`teamStanding-${index}`}>
            <TeamListSummary teamStanding={teamStanding} maxPoints={maxPoints} className="bg-dark text-white" />
          </ListGroup>
          )
      })
      return (
        <div>
          { teamElements }
        </div>
      )


  }

  return (
    <Container className="p-0 m-0">    
      { renderDriverTeams() }
    </Container>
  );
};

export default DriverTeamList;