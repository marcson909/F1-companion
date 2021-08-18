import React, {useContext, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/esm/Button";

import UserContext from '../contexts/UserContext';

import NavComponent from '../components/NavComponent';
import ListGroup from 'react-bootstrap/ListGroup'

import LeagueListSummary from '../components/LeagueListSummary';
import FormulaAPI from '../apis/FormulaAPI'

const FantasyMainPage = (props) => {
  const user = useContext(UserContext);
  console.log(user)
  console.log(props)

  const [leagues, setLeagues] = useState(null)
  const [userleagues, setUserLeagues] = useState(null)
  const [currentFantasyDrivers, setCurrentFantasyDrivers] = useState([])
  const [currentFantasyConstructors, setCurrentFantasyConstructors] = useState([])


  const objectsEqual = (o1, o2) =>
    Object.keys(o1).length === Object.keys(o2).length 
        && Object.keys(o1).every(p => o1[p] === o2[p]);

  const arraysEqual = (a1, a2) => 
  a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]));


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

  const handleBackendDrivers = async () =>{
    try{
      let token = user.token
      if (token) {
        let backendDriverData = await FormulaAPI.getDriversBackend(token)
        if (backendDriverData.length > 0) {
          console.log(backendDriverData, "NOT NULL BACKEND DRIVER DATA")
          setCurrentFantasyDrivers(backendDriverData)
        } else {
          updateCurrentBackendDrivers();
        }
      }
    }
    catch {
    }
  }

  const handleBackendConstructors = async () =>{
    try{
      let token = user.token
      if (token) {
        let backendConstructorData = await FormulaAPI.getConstructorsBackend(token)

        console.log(backendConstructorData, "BACKEND CONSTRUCTOR DATA")
        if (backendConstructorData.length > 0){
          setCurrentFantasyConstructors(backendConstructorData)
        } else {
          updateCurrentBackendConstructors();
        }
      }
    }
    catch {

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

  const updateCurrentBackendDrivers = async () => {
    try {
      if (currentFantasyDrivers.length < 1 ){
        console.log(currentFantasyDrivers, "THERE SHOULD BE NO CURRENT BACKEND DRIVERS IF THIS FIRES")
        for (let driver of props.currentDrivers){
          console.log(driver, "DRIVER OF PROPS CURRENT DRIVERS")
          let data = await FormulaAPI.createCurrentDrivers(driver, user.token)
            if (data) {
              console.log(data)
            }
        }

      } else {
        for (let driver of currentFantasyDrivers){
          let data = await FormulaAPI.deleteCurrentDrivers(driver.id, user.token)
          if (data) {
            console.log(data)
          }
          }
          for (let driver of props.currentDrivers){
            console.log(driver, "DRIVER OF PROPS CURRENT DRIVERS")
            let data = await FormulaAPI.createCurrentDrivers(driver, user.token)
              if (data) {
                console.log(data)
              }
          }     
        }
        setCurrentFantasyDrivers(props.currentDrivers)
      }
    catch (error) {
      console.log(error)
    }
  }

  const updateCurrentBackendConstructors = async () => {
    try {
      if (currentFantasyConstructors.length < 1 ){
        console.log(currentFantasyConstructors, "THERE SHOULD BE NO CURRENT BACKEND CONSTRUCTORS IF THIS FIRES")
        for (let constructor of props.currentConstructors){
          console.log(constructor, "CONSTRUCTOR OF PROPS CURRENT CONSTRUCTORS")
          let data = await FormulaAPI.createCurrentConstructors(constructor, user.token)
            if (data) {
              console.log(data)
            }
        }

      } else {
        for (let constructor of currentFantasyConstructors){
          let data = await FormulaAPI.deleteCurrentConstructors(constructor.id, user.token)
          if (data) {
            console.log(data)
          }
          }
          for (let constructor of props.currentConstructors){
            console.log(constructor, "CONSTRUCTOR OF PROPS CURRENT CONSTRUCTORS")
            let data = await FormulaAPI.createCurrentConstructors(constructor, user.token)
              if (data) {
                console.log(data)
              }
          }     
        }
        setCurrentFantasyConstructors(props.currentConstructors)
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
  handleBackendDrivers();
}, [])

useEffect(() => {
  handleBackendConstructors();
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
            <LeagueListSummary league={league} backendDrivers={currentFantasyDrivers} backendConstructors={currentFantasyConstructors}/>
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