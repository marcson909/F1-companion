import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
// pages and components
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import RacePage from './pages/RacePage';
import DriverResultsPage from './pages/DriverResultsPage';
import DriversListPage from './pages/DriversPage';
import DriversDetailPage from './pages/DriversDetailPage';
import TeamPage from './pages/TeamPage';
import TeamDetailPage from './pages/TeamDetailPage';

// context
import UserContext from './contexts/UserContext'

const App = () => {
  const [user, setUser] = useState(null);

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
        <UserContext.Provider value={user} >
        <div>
          <Route path="/" exact render={renderHomePage} />
          <Route exact path="/race/:raceRound" component={RacePage} />
          <Route exact path="race/:raceRound/results/:driverID" component={DriverResultsPage} />
          <Route exact path="/drivers" component={DriversListPage} />
          <Route exact path="/drivers/:driverID" component={DriversDetailPage} />
          <Route exact path="/teams" component={TeamPage} />
          <Route exact path="/teams/:teamID" component={TeamDetailPage} />
          <Route path="/login" exact render={renderLoginPage} />
          <Route path="/signup" exact render={renderSignupPage} />
        </div>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;