import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
// pages and components
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import RacePage from './pages/RacePage';
// import DriverResultsPage from './pages/DriverResultsPage';
// import DriversListPage from './pages/DriversPage';
import DriversPage from './pages/DriversPage'
import DriversDetailPage from './pages/DriversDetailPage';
import TeamPage from './pages/TeamPage';
import TeamDetailPage from './pages/TeamDetailPage';
import FantasyMainPage from './pages/FantasyMainPage';
import LeaguePage from './pages/LeaguePage';
import FantasyTeamPage from './pages/FantasyTeamPage';

// context
import UserContext from './contexts/UserContext'
import ImageContext from './contexts/ImageContext';
import FantasyTeamDriverListView from './components/FantasyTeamDriverListView';

const App = () => {
  const [user, setUser] = useState(null);
  let images = '/images'


   // helper
   const updateUser = (userData) => {

    setUser(userData)
  }

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


  return (
    <div className="App">
      <Router>
        <ImageContext.Provider value={images}>
        <UserContext.Provider value={user} >
          <Route path="/" exact render={renderHomePage} />
          <Route exact path="/race/:raceRound" component={RacePage} />
          {/* <Route exact path="/race/:raceRound/:driverId" component={DriverResultsPage} /> */}
          <Route exact path="/drivers" component={DriversPage} />
          <Route exact path="/drivers/:driverId" component={DriversDetailPage} />
          <Route exact path="/teams" component={TeamPage} />
          <Route exact path="/teams/:teamId" component={TeamDetailPage} />
          <Route path="/login" exact render={renderLoginPage} />
          <Route path="/signup" exact render={renderSignupPage} />
          <Route exact path="/leagues" component={FantasyMainPage} />
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