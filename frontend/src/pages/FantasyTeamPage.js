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

  const location = useLocation();
  const { team, league, backendDrivers, backendConstructors } = location.state;

  const user = useContext(UserContext)
  const images = useContext(ImageContext)

  const [recentResults, setRecentResults] = useState([])
  const [driverStandings, setDriverStandings] = useState([])

  console.log(team,league, backendDrivers, backendConstructors)


  let imgLogo = `${images}/${props.match.params.driverId}.jpeg`;


  useEffect(() => {
    const getRecentResults = async () => {
      try {
          let recentResultData = await FormulaAPI.getRecentResults();
          recentResultData = recentResultData['MRData']['RaceTable']['Races'][0]['Results']
          // console.log(recentResultData, 'recent standing data')
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
          // console.log(driverStandingData, 'driverData')
          setDriverStandings( driverStandingData )
        }
      catch  {
  
      }
    }
    getDriverStandings();

  }, [])

  const renderFantasyTeamPage = () => {
    if (!team){
      return <p>Loading...</p>
    }

    console.log(driverStandings, "DRIVER STANDINGS STATE CHECK")
    // IF LOGGED IN USER IS TEAM OWNER
    if (user.user.id === team.owner){
          // IF DRIVERS ARRAY IS POPULATED
        if (team.drivers){
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
                    <Tabs 
                    id="tabs" 
                    defaultactiveKey="team" // 
                    className="mb-3 nav-fill">
                      <Tab 
                      eventKey="team" 
                      title="Team" >
                        <CardGroup>
                            { teamDrivers }
                        </CardGroup>
                      </Tab>
                      <Tab eventKey="allDrivers" title="Driver List">
                        <FantasyTeamDriverListView 
                        recentResults={recentResults}
                        driverStandings={driverStandings}
                        fantasyTeam={team}
                        league={league} backendDrivers={backendDrivers} backendConstructors={backendConstructors}/>
                      </Tab>
                    </Tabs>
              </Container>
          )
        }
        // USER IS OWNER BUT NOT DRIVERS
        else {
          return (
            <Container>
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
                                <Card.Text>
                                  No Drivers Found, Update your Team from the Driver List Tab
                                </Card.Text>
                              </Card.Body>
                            </Card>
                        </CardGroup>
                      </Tab>
                      <Tab eventKey="allDrivers" title="Driver List">
                        <FantasyTeamDriverListView recentResults={recentResults}
                        driverStandings={driverStandings}
                        fantasyTeam={team}
                        league={league} backendDrivers={backendDrivers} backendConstructors={backendConstructors}/>
                      </Tab>
                    </Tabs>
              </Container>
          )
        }
      }
    else {
      if (!team.drivers) {
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
      { renderFantasyTeamPage() }
    </Container>
  );
};

export default FantasyTeamPage;