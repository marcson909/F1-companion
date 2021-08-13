import React, { useContext, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import NavComponent from '../components/NavComponent';
import UserContext from '../contexts/UserContext';
import ListGroup from 'react-bootstrap/ListGroup'
import TeamListSummary from '../components/TeamListSummary';

import FormulaAPI from '../apis/FormulaAPI'

const TeamPage = () => {
  const user = useContext(UserContext);
  const [teamStandings, setTeamStandings] = useState([]);

  useEffect(() => {
    const getTeamStandings = async () => {
      try {
          let teamStandingData = await FormulaAPI.getTeamStandings();
          teamStandingData = teamStandingData['MRData']['StandingsTable']['StandingsLists'][0]['ConstructorStandings']
          console.log(teamStandingData, 'teamData')
          setTeamStandings( teamStandingData )
        }
      catch  {
  
      }
    }
    getTeamStandings();

  }, [])




  const renderTeamPage = () => {

    if (teamStandings === null){
      return <p>Loading...</p>
    }

    let teamElements = teamStandings.map((teamStanding, index) => {
      let maxPoints = teamStandings[0].points
        return ( 
          <ListGroup key={`teamStanding-${index}`}>
            <TeamListSummary teamStanding={teamStanding} maxPoints={maxPoints}/>
          </ListGroup>
        )
      })
      return (
        <div>
          <NavComponent />
          { teamElements }
        </div>
      )


  }


  return (
    <Container>
      
      { renderTeamPage() }
    </Container>
  );
};

export default TeamPage;