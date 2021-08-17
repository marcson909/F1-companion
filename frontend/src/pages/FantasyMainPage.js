import React, {useContext, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/esm/Button";

import UserContext from '../contexts/UserContext';

import NavComponent from '../components/NavComponent';
import ListGroup from 'react-bootstrap/ListGroup'

import LeagueListSummary from '../components/LeagueListSummary';
import FormulaAPI from '../apis/FormulaAPI'

const FantasyMainPage = () => {
  const user = useContext(UserContext);
  console.log(user)

  const [leagues, setLeagues] = useState(null)
  const [userleagues, setUserLeagues] = useState(null)

  const getLeaguesList = async () => {
    try {
      // console.log(user,'fantasy page')
      let token = user.token
      console.log(token,'token')
      if (token) {
        let leaguesData = await FormulaAPI.getLeagues(token)
        console.log(leaguesData, 'leaguesData')
        setLeagues( leaguesData )
 
      }
    }
    catch  {

    }
  }

  const getUserLeagues = async () => {
    try {
      let userLeagueData = await FormulaAPI.getUserLeagues(user.token)
      console.log(userLeagueData, "userLeagueData")
      if (userLeagueData) {
        setUserLeagues( userLeagueData)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const handleCreateLeague = async () => {
    let nameInput = document.getElementById("new-league=name")
    let publicInput = document.getElementById("public-league")
    let token = user.token
    let userID = user.user.id

    if (nameInput && publicInput && userID && token){
      let newFantasyLeagueParams = {
        name: nameInput.value,
        is_public: publicInput.checked,
        administrator: userID,
        duration: 1
      }
      let data = await FormulaAPI.createFantasyLeague(newFantasyLeagueParams, token)
      console.log("new fantasy league", data)
      if (data) {
        let newFantasyLeagues = [...leagues, data]
        setLeagues(newFantasyLeagues)
    
      }
      alert("You created a league!")
      handleJoinLeague(data)
    }
  }

  const handleJoinLeague = async (data) => {
    let userID = user.user.id
    let leagueID = data.id
    let token = user.token
    if (leagueID && userID && token){
      let newUserLeagueParams = {
        user: userID,
        league: leagueID
      }
      let data = await FormulaAPI.createFantasyUserLeague(newUserLeagueParams, token)
      if (data) {
        let newUserLeagues = [...userleagues, data]
        setUserLeagues(newUserLeagues)
      }
  }}

  useEffect(() => {
    getLeaguesList();
}, [])

useEffect(() => {
  if (userleagues == null) {
    getUserLeagues()
  }
}, [userleagues])

// render fantasy home page
const renderFantasyPage = () => {
  if (!user) {
    return (
      <div>
        <NavComponent />
        <Link to="/login"><button>Login</button></Link>
        <Link to="/signup"><button>Signup</button></Link>
      </div>
    )
  }
  if (leagues == null){
    return null
  }
  console.log(leagues)
  let leagueElements = leagues.map((league, index) => {
      return (
          <ListGroup key={`league-${index}`}>
            <LeagueListSummary league={league} />
          </ListGroup>

        
      )
    })

  return (
    <div>
        <NavComponent />
        <h1>This is the fantasy Home Page</h1>
        <h2>Public leagues:</h2>
        { leagueElements }
        <hr />
        <input id="new-league=name" placeholder="new league name"/>
        <input id="public-league" type="checkbox" label="Public League" />
        <Button onClick={handleCreateLeague}>Create New League</Button>
    </div>
  )
}

  return (
    <div>
      
      { renderFantasyPage() }
      <p> There should be tabs for public leagues and joined leagues</p>
    </div>
  );
};

export default FantasyMainPage;