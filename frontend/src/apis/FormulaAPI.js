const BASE_URL = 'http://localhost:8000/'

const getTokenInit = (token) => {
    return {
        headers: {
          'Content-Type': 'application/json',
          "authorization": `JWT ${token}`
        }
    }
  }
  
  const tryCatchFetch = async (url, init) => {
    try {
        console.log('trying catch fetch')
      let response = await fetch(url, init)
      if (response.ok) {
        console.log("status", response.status)
        if (response.status !== 204) { // 204 doesn't have a message body       
          let data = await response.json()
          return data
        }
        else {
          return { "success": true }
        }
      }
    }
    catch (error) {
      console.error(":ERR:",error)
      return null
    }
  }
  
  const tryCatchFetchUrlOnly = async (url) => {
    try {
      console.log('trying fetch')
    let response = await fetch(url)
    if (response.ok) {
      console.log("status", response.status)
      if (response.status !== 204) { // 204 doesn't have a message body
        let data = await response.json()
        console.log(data)
        return data
      }
      else {
        return { "success": true }
      }
    }
  }
  catch (error) {
    console.error(":ERR:",error)
    return null
  }
  }

  const login = async (userObject) => {
    let url = `${BASE_URL}login/`
    let init = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userObject)
    }
    return await tryCatchFetch(url, init)
  }

  const signupUser = async (userObject) => {
    let url = "http://localhost:8000/login/users/"
    let init = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userObject)
    }
    return await tryCatchFetch(url, init)
  }

  const getCurrentSeason = async () => {
    let url = "http://ergast.com/api/f1/current.json"
  
    return await tryCatchFetchUrlOnly(url)
  }
  
  
  const getRaceByRound = async (round) => {
    let url = `http://ergast.com/api/f1/2021/${round}/results.json`
     
    return await tryCatchFetchUrlOnly(url)
  }

  const getQualiByRound = async (round) => {
    let url = `http://ergast.com/api/f1/2021/${round}/qualifying.json`
  
    return await tryCatchFetchUrlOnly(url)
  }

  const getCurrentDrivers = async () => {
    let url = `http://ergast.com/api/f1/2021/drivers.json`
  
    return await tryCatchFetchUrlOnly(url)
  }

  const getRecentResults = async () => {
    let url = `http://ergast.com/api/f1/current/last/results.json`
  
    return await tryCatchFetchUrlOnly(url)
  }

  const getDriverStandings = async () => {
    console.log('getting driver standings')
    let url = `http://ergast.com/api/f1/current/driverStandings.json`
  
    return await tryCatchFetchUrlOnly(url)
  }

  const getTeamStandings = async () => {
    console.log('getting team standings')
    let url = `http://ergast.com/api/f1/current/constructorStandings.json`
  
    return await tryCatchFetchUrlOnly(url)
  }

  const getTeamStandingsById = async (teamId) => {
    let url = `http://ergast.com/api/f1/constructors/${teamId}/constructorStandings.json`
     
    return await tryCatchFetchUrlOnly(url)
  }

  const getTeamById = async (teamId) => {
    let url = `http://ergast.com/api/f1/constructors/${teamId}.json`
     
    return await tryCatchFetchUrlOnly(url)
  }

  const getDriverById = async (driverId) => {
    let url = `http://ergast.com/api/f1/drivers/${driverId}.json`
     
    return await tryCatchFetchUrlOnly(url)
  }

  const getLeagues = async (token) => {
    console.log('trying get leagues')
    let url = `${BASE_URL}leagues/`
    return await tryCatchFetch(url, getTokenInit(token))
  }

  const getLeagueById = async (leagueID, token) => {
    let url = `${BASE_URL}leagues/${leagueID}/`
    return await tryCatchFetch(url, getTokenInit(token))
  }

  const getUserLeagues = async (token) => {
    console.log('trying get user leagues')
    let url = `${BASE_URL}userleagues/`
    return await tryCatchFetch(url, getTokenInit(token))
  }

  const getFantasyTeams = async(token) => {
    let url = `${BASE_URL}teams/`
    return await tryCatchFetch(url, getTokenInit(token))
  }

  const createFantasyLeague = async(newFantasyLeagueParams, token) => {
    let url = `${BASE_URL}leagues/`
    let init = getTokenInit(token)
    init["method"] = "POST"
    init["body"] = JSON.stringify(newFantasyLeagueParams)
    return await tryCatchFetch(url, init)
  }

  const deleteFantasyLeague = async(fantasyLeagueID, token) => {
    let url = `${BASE_URL}leagues/${fantasyLeagueID}/`
    let init = getTokenInit(token)
    init["method"] = "DELETE"
    return await tryCatchFetch(url,init)
  }

  const createFantasyUserLeague = async(newFantasyUserLeagueParams, token) => {
    let url = `${BASE_URL}userleagues/`
    let init = getTokenInit(token)
    init["method"] = "POST"
    init["body"] = JSON.stringify(newFantasyUserLeagueParams)
    return await tryCatchFetch(url, init)
  }


  const createFantasyTeam = async(newFantasyTeamParams, token) => {
    let url = `${BASE_URL}teams/`
    let init = getTokenInit(token)
    init["method"] = "POST"
    init["body"] = JSON.stringify(newFantasyTeamParams)
    return await tryCatchFetch(url, init)
  }

  const updateFantasyTeam = async(fantasyTeamID, updatedFantasyTeamParams, token) => {
    let url = `${BASE_URL}teams/${fantasyTeamID}/`
    let init = getTokenInit(token)
    init["method"] = "PUT"
    init["body"] = JSON.stringify(updatedFantasyTeamParams)
    return await tryCatchFetch(url, init)
  }

  const deleteFantasyTeam = async (fantasyTeamID, token) => {
    let url = `${BASE_URL}teams/${fantasyTeamID}/`
    let init = getTokenInit(token)
    init["method"] = "DELETE"
    return await tryCatchFetch(url, init)
  }

 

  const myExport = {
    login,
    signupUser,
    getCurrentSeason,
    getRaceByRound,
    getQualiByRound,
    getCurrentDrivers,
    getRecentResults,
    getDriverStandings,
    getTeamStandings,
    getTeamStandingsById,
    getTeamById,
    getDriverById,
    getLeagues,
    getLeagueById,
    getUserLeagues,
    getFantasyTeams,
    createFantasyLeague,
    createFantasyUserLeague,
    deleteFantasyLeague,
    createFantasyTeam,
    updateFantasyTeam,
    deleteFantasyTeam,


  }
  
  export default myExport 