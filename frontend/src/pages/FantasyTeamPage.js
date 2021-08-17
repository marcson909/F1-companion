import React, { useContext, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import NavComponent from '../components/NavComponent';
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import CardColumns from 'react-bootstrap/CardColumns'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Button from 'react-bootstrap/Button'

import { Link, Switch, Route } from 'react-router-dom';

import FantasyTeamCardView from '../components/FantasyTeamCardView';

import { useLocation } from 'react-router';

import UserContext from '../contexts/UserContext';
import ImageContext from '../contexts/ImageContext';
// apis
import FormulaAPI from '../apis/FormulaAPI'
import FantasyTeamDriverListView from '../components/FantasyTeamDriverListView';

const FantasyTeamPage = (props) => {
  console.log(props)

  const MODE_TYPE = {
    VIEW: 1,
    UPDATE: 2,
  }

  const location = useLocation();
  const { team, league } = location.state;

  const user = useContext(UserContext)
  const images = useContext(ImageContext)


  const [mode, setMode] = useState(MODE_TYPE.VIEW)
  const [recentResults, setRecentResults] = useState(null)
  const [driverStandings, setDriverStandings] = useState(null)

  const [key, setKey] = useState("team");

  console.log(team,league)
  console.log(typeof team.drivers, "drivers type check")

  let imgLogo = `${images}/${props.match.params.driverId}.jpeg`;

  const changeMode = (newMode) => {
    setMode(newMode)
  }

  useEffect(() => {
    const getRecentResults = async () => {
      try {
          let recentResultData = await FormulaAPI.getRecentResults();
          recentResultData = recentResultData['MRData']['RaceTable']['Races'][0]['Results']
          console.log(recentResultData, 'recent standing data')
          setRecentResults( recentResultData )
        }
      catch  {
  
      }
    }
    getRecentResults();

  }, [])

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

  // const updateFantasyTeam = async () => {

  // }


//   const handleRemoveDriver = (driver) => {
//     console.log(driver, "fantasy team driver being clicked")
//     console.log(team.drivers, "fantasy team drivers")

//    team.drivers.splice(team.drivers.indexOf(driver), 1);

//   console.log(team)
//  }

  const renderFantasyTeamPage = () => {
    if (!team){
      return <p>Loading...</p>
    }
    console.log(user.user.id, team.owner, "user id and team owner check")
    // IF LOGGED IN USER IS TEAM OWNER
    if (user.user.id === team.owner){

      // IF MODE IS UPDATE
      if (mode === MODE_TYPE.UPDATE) {
        // IF NO DRIVERS IN TEAM
        if (!team.drivers.length){
          
        }
        return (
          <Container>
            <Container>
              <h1 className="nonbreak">Team Name: </h1>
              <input id="team-name" placeholder="team name" defaultValue={team.name}/>
            </Container>
                <Tabs 
                id="tabs"
                defaultactiveKey="team"
                className="mb-3 nav-fill">
                  <Tab 
                  eventKey="team" 
                  title="Team" >
                    <CardGroup>
                    
  
                    </CardGroup>
                  </Tab>
                  <Tab eventKey="allDrivers" title="Driver List">
                    <FantasyTeamDriverListView recentResults={recentResults}
                    fantasyTeam={team}
                    league={league} />
                    <Button onClick={() => changeMode(MODE_TYPE.UPDATE)}>Update</Button>
                  </Tab>
                </Tabs>
          </Container>
        )} 
        // IF USER IS OWNER BUT MODE IS NOT UPDATE
        else {
          // IF DRIVERS ARRAY IS NOT FALSEY
        if (team.drivers.length){
          const teamDrivers = team.drivers.map((driver, index) => {
            return (
              <Card key={index}>
                <Card.Body>
                  <Card.Text>
                    {driver.first_name} {driver.last_name}
                  </Card.Text>
                </Card.Body>
              </Card>
            )
          })
          return (
            <Container>
                <Container>
                  <h1 > {team.name}</h1>
                </Container>
                    <Tabs 
                    id="tabs" 
                    defaultactiveKey="team" // 
                    className="mb-3 nav-fill">
                      <Tab 
                      eventKey="team" 
                      title="Team" >
                        <CardGroup>
                            { teamDrivers }
                            <Button onClick={() => changeMode(MODE_TYPE.UPDATE)}>Update</Button>
                        </CardGroup>
                      </Tab>
                      <Tab eventKey="allDrivers" title="Driver List">
                        <FantasyTeamDriverListView recentResults={recentResults}
                        fantasyTeam={team}
                        league={league} />
                        <Button onClick={() => changeMode(MODE_TYPE.UPDATE)}>Update</Button>
                      </Tab>
                    </Tabs>
              </Container>
          )
        }
        // NO LENGTH IN DRIVERS ARRAY
        else {
          return (
            <Container>
                <Container>
                  <h1 > {team.name}</h1>
                </Container>
                    <Tabs 
                    id="tabs" 
                    defaultactiveKey="team" // 
                    className="mb-3 nav-fill">
                      <Tab 
                      eventKey="team" 
                      title="Team" >
                        <CardGroup>
                          <Card >
                              <Card.Body>
                                <Link>Create Team</Link>
                              </Card.Body>
                              <Button onClick={() => changeMode(MODE_TYPE.UPDATE)}>Update</Button>
                            </Card>
                        </CardGroup>
                      </Tab>
                      <Tab eventKey="allDrivers" title="Driver List">
                        <FantasyTeamDriverListView recentResults={recentResults}
                        fantasyTeam={team}
                        league={league} />
                        <Button onClick={() => changeMode(MODE_TYPE.UPDATE)}>Update</Button>
                      </Tab>
                    </Tabs>
              </Container>
          )
        }
      }
    }
    else {
      if (!team.drivers.length) {
        return (
          <Container>
            <h1>This team's owner hasn't set up their team yet</h1>
          </Container>
        )
      }
      else {
        let teamCards = team.drivers.map((driver, index) => {
          let imgLogo = `${images}/${driver.driver_ref}.jpeg`;
          return (
            <Card>
              <Card.Img className=""src={`${imgLogo}`} alt={`${driver.first_name} ${driver.last_name} logo`} />
            </Card>
          )
        })
  
        return (
          <Container>
            <CardGroup>
              { teamCards }
            </CardGroup>
          </Container>
  
        )
      }
    }
    }

   


  return (
    <Container>
      <NavComponent />
      <h1>Fantasy Team detail page</h1>
      { renderFantasyTeamPage() }
    </Container>
  );
};

export default FantasyTeamPage;