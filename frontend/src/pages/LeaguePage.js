import React, {useContext, useState, useEffect} from "react"

import UserContext from '../contexts/UserContext';

import NavComponent from '../components/NavComponent';
import ListGroup from 'react-bootstrap/ListGroup'
import { useHistory } from "react-router-dom"

import FormulaAPI from '../apis/FormulaAPI'
import FantasyTeamListSummary from "../components/FantasyTeamListSummary";
import Button from "react-bootstrap/esm/Button";


const LeaguePage = (props) => {
  const user = useContext(UserContext);
  const [league, setLeague] = useState(null)
  const [leagues, setLeagues] = useState(null)
  const [teams, setTeams] = useState(null)
  const [userleagues, setUserLeagues] = useState(null)
  console.log(props, "page props")
  let history = useHistory()

  console.log(user.user.username, "league detail user user")

  const getLeague = async () => {
    console.log('at league detail page')
    try {
      let leagueID = props.match.params.leagueID

      let leagueData = await FormulaAPI.getLeagueById(leagueID, user.token)
      console.log(leagueData, 'leagueData')
      if (leagueData) {
        setLeague( leagueData)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const getAllLeagues = async () => {
    try {
      let allLeagueData = await FormulaAPI.getLeagues(user.token)
      console.log(allLeagueData, 'leagueData')
      if (allLeagueData) {
        setLeagues( allLeagueData)
      }
    }
    catch (error) {
      console.log(error)
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

  const getFantasyTeams = async () => {
    console.log("attempting get fantasy teams")
    try {
      let teamData = await FormulaAPI.getFantasyTeams(user.token)
      console.log(teamData, 'teamdata')
      if (teamData) {
        setTeams ( teamData )
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const handleJoinLeague = async () => {
    let leagueID = league.id
    let userID = user.user.id
    let token = user.token
    if (leagueID && userID && token){
      let newUserLeagueParams = {
        user: userID,
        league: leagueID
      }
      let data = await FormulaAPI.createFantasyUserLeague(newUserLeagueParams, token)
      console.log("new user league", data)
      if (data) {
        let newUserLeagues = [...userleagues, data]
        setUserLeagues(newUserLeagues)
      }
      alert("You joined the league!")
    }

  }

  const handleCreateTeam = async () => {
    let leagueID = league.id
    let userID = user.user.id
    let name = user.user.username
    let drivers = []

    let token = user.token
    if (leagueID && userID && name && token){
      let newFantasyTeamParams = {
        name: name,
        owner: userID,
        league: leagueID,
        drivers: drivers
      }
      let data = await FormulaAPI.createFantasyTeam(newFantasyTeamParams, token)
      console.log("new fantasy team", data)
      if (data) {
        let newFantasyTeams = [...teams, data]
        setTeams(newFantasyTeams)
      }
      alert("You created a team!")
    }
  }

  const handleDeleteTeam = async (fantasyTeamID) => {
    try{
      let token = user.token
      if (fantasyTeamID > 0 && token) {
        let result = await FormulaAPI.deleteFantasyTeam(fantasyTeamID, token)
        if (result.success) {
          let newFantasyTeams = teams.filter((team,index) => {
            return team.id !== fantasyTeamID
          })
          setTeams(newFantasyTeams)
        }
      }
    }
    catch {

    }
  }

  const handleDeleteLeague = async () => {
    try{
      let token = user.token
      let fantasyLeagueID = props.match.params.leagueID
      if (fantasyLeagueID > 0 && token) {
        let result = await FormulaAPI.deleteFantasyLeague(fantasyLeagueID, token)
        if (result.success) {
          let newFantasyLeagues = leagues.filter((league,index) => {
            return league.id !== fantasyLeagueID
          })
          setLeagues(newFantasyLeagues)
          alert("League deleted successfully")
          history.push("/leagues")

        }
      }
    }
    catch {

    }
  }


  useEffect(() => {
    if (league == null) {
      getLeague()
    }
  }, [])

  useEffect(() => {
    if (leagues == null) {
      getAllLeagues()
    }
  }, [])

  useEffect(() => {
    if (teams == null) {
      getFantasyTeams()
    }
  }, [])

  useEffect(() => {
    if (userleagues == null) {
      getUserLeagues()
    }
  }, [userleagues])

  let teamCheck = false
  const updateTeamCheck = () => {
    teamCheck = true;
  }

  const renderLeagueTeams = () => {

    if (league == null || teams == null){
      return "loading..."
    }


    let teamElements = teams.map((team, index) => {
      if (team.owner === user.user.id){
        if (team.league === parseInt(props.match.params.leagueID)) {
          updateTeamCheck();
          return (
            <ListGroup key={`fantasyteam-${index}`}>
              <FantasyTeamListSummary team={team} league={league} handleDelete={handleDeleteTeam}/>
            </ListGroup>
          )
        }
      } else {
        if (team.league === parseInt(props.match.params.leagueID)) {
          return (
            <ListGroup key={`fantasyteam-${index}`}>
              <FantasyTeamListSummary team={team} league={league} />
            </ListGroup>
          )
        }
      }
    })

    

    return (
      <div>
        { teamElements }
        {!teamCheck && 
        <Button onClick={handleCreateTeam}>Create Team</Button>
        }
        { !league.members.includes(user.user.id) &&
        <Button onClick={handleJoinLeague}>Join League</Button>
        }
        {league.administrator === user.user.id &&
        <Button onClick={handleDeleteLeague}>Delete League</Button>
        }
      </div>
    )
  }

  return (
    <div>
      <NavComponent />
      <h1>League Detail page</h1>
      { renderLeagueTeams() }
    </div>
  );
};

export default LeaguePage;