import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
// pages and components
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import RacePage from './pages/RacePage';
import DriversPage from './pages/DriversPage'
import DriversDetailPage from './pages/DriversDetailPage';
import TeamPage from './pages/TeamPage';
import TeamDetailPage from './pages/TeamDetailPage';
import FantasyMainPage from './pages/FantasyMainPage';
import LeaguePage from './pages/LeaguePage';
import FantasyTeamPage from './pages/FantasyTeamPage';

import FormulaAPI from './apis/FormulaAPI'


// context
import UserContext from './contexts/UserContext'
import ImageContext from './contexts/ImageContext';
import FantasyTeamDriverListView from './components/FantasyTeamDriverListView';

const App = () => {
  const [user, setUser] = useState(null);
  const [currentDrivers, setCurrentDrivers] = useState([]);
  const [currentConstructors, setCurrentConstructors] = useState([]);
  let images = '/images';


   // helper
   const updateUser = (userData) => {
    setUser(userData)
  }

  const getCurrentDrivers = async () => {
    try{
      let currentDriverData = await FormulaAPI.getCurrentDrivers()
      currentDriverData = currentDriverData["MRData"]["DriverTable"]["Drivers"]
      console.log(currentDriverData, "currentDriverData")

      if (currentDriverData) {

        let updatedCurrentDrivers = []
        let updatedDriver = {}
      
        for (let driver of currentDriverData) {
            updatedDriver = {
            driver_ref: driver.driverId,
            number: driver.permanentNumber,
            code: driver.code,
            first_name: driver.givenName,
            last_name: driver.familyName,
            dob: driver.dateOfBirth,
            nationality: driver.nationality,
            url: driver.url
          }
          updatedCurrentDrivers.push(updatedDriver)
        }
        setCurrentDrivers(updatedCurrentDrivers)
      } 
    }
    catch (error) {
      console.log(error)
    }
  }

  const getCurrentConstructors = async () => {
      try {
        let currentConstructorData = await FormulaAPI.getCurrentConstructors()
        currentConstructorData = currentConstructorData["MRData"]["ConstructorTable"]["Constructors"]
  
        console.log(currentConstructorData, "currentConstructorData")
  
        if (currentConstructorData) {
  
          let updatedCurrentConstructors = []
          let updatedConstructor = {}
        
          for (let constructor of currentConstructorData) {
            updatedConstructor = {
              constructor_ref: constructor.constructorId,
              constructor_name: constructor.name,
              nationality: constructor.nationality,
              url: constructor.url
            }
            updatedCurrentConstructors.push(updatedConstructor)
          }
        setCurrentConstructors(updatedCurrentConstructors)
       }
      }
    catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    getCurrentDrivers();
}, [])

useEffect(() => {
  getCurrentConstructors();
}, [])

  // render
  const renderLoginPage = (routeProps) => {
    return <LoginPage {...routeProps} completeLogin={updateUser} />
  }

  const renderSignupPage = (routeProps) => {
    return <SignupPage {...routeProps} />
  }

  const renderHomePage = (routeProps) => {
    return <HomePage {...routeProps} />
  }

  const renderFantasyMainPage = (routeProps) => {
    return <FantasyMainPage {...routeProps} currentDrivers={currentDrivers} currentConstructors={currentConstructors}/>
  }

  return (
    <div className="App">
      <Router>
        <ImageContext.Provider value={images}>
        <UserContext.Provider value={user} >
          <Route path="/" exact render={renderHomePage} />
          <Route exact path="/race/:raceRound" component={RacePage} />
          <Route exact path="/drivers" component={DriversPage} />
          <Route exact path="/drivers/:driverId" component={DriversDetailPage} />
          <Route exact path="/teams" component={TeamPage} />
          <Route exact path="/teams/:teamId" component={TeamDetailPage} />
          <Route path="/login" exact render={renderLoginPage} />
          <Route path="/signup" exact render={renderSignupPage} />
          <Route  path="/leagues" exact render={renderFantasyMainPage} />
          <Route exact path="/leagues/:leagueID" component={LeaguePage} />
          <Route exact path="/fantasy-teams/:ownerID" component={FantasyTeamPage} />
          <Route exact path="/fantasy=teams/:ownerID/driver-list" component={FantasyTeamDriverListView} />
        </UserContext.Provider>
        </ImageContext.Provider>
      </Router>
    </div>
  );
}

export default App;