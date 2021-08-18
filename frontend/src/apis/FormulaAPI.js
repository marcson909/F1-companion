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

  const getCurrentConstructors = async () => {
    let url = `http://ergast.com/api/f1/2021/constructors.json`
  
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

  const getDriversBackend = async (token) => {
    console.log('trying get backend drivers')
    let url = `${BASE_URL}drivers/`
    return await tryCatchFetch(url, getTokenInit(token))
  }

  const updateDriversBackend = async (driverID,updatedDriverParams, token) => {
    console.log('trying get backend drivers')
    let url = `${BASE_URL}drivers/${driverID}/`
    let init = getTokenInit(token)
    init["method"] = "PUT"
    init["body"] = JSON.stringify(updatedDriverParams)
      return await tryCatchFetch(url, init)
  }

  const getConstructorsBackend = async (token) => {
    console.log('trying get backend constructors')
    let url = `${BASE_URL}constructors/`
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

  const getBackendTeamDrivers = async (token) => {
    console.log('trying get team drivers')
    let url = `${BASE_URL}teamdrivers/`
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
    console.log("test update fantasy team")
    console.log(fantasyTeamID, updatedFantasyTeamParams, token)
    let url = `${BASE_URL}teams/${fantasyTeamID}/`
    let init = getTokenInit(token)
    init["method"] = "PUT"
    init["body"] = JSON.stringify(updatedFantasyTeamParams)
    return await tryCatchFetch(url, init)
  }

  const createCurrentDrivers = async( updatedCurrentDrivers, token) => {
    console.log("test update current drivers")
    console.log(updatedCurrentDrivers, token)
    let url = `${BASE_URL}drivers/`
    let init = getTokenInit(token)
    init["method"] = "POST"
    init["body"] = JSON.stringify(updatedCurrentDrivers)
    return await tryCatchFetch(url, init)
  }

  const deleteCurrentDrivers = async(driverId, token) => {
    console.log("test delete current driver")
    console.log(driverId, token)
    let url = `${BASE_URL}drivers/${driverId}`
    let init = getTokenInit(token)
    init["method"] = "DELETE"
    return await tryCatchFetch(url, init)
  }

  const createCurrentConstructors = async( updatedCurrentConstructors, token) => {
    console.log("test update current constructors")
    console.log(updatedCurrentConstructors, token)
    let url = `${BASE_URL}constructors/`
    let init = getTokenInit(token)
    init["method"] = "POST"
    init["body"] = JSON.stringify(updatedCurrentConstructors)
    return await tryCatchFetch(url, init)
  }

  const deleteCurrentConstructors = async(constructorId, token) => {
    console.log("test delete current driver")
    console.log(constructorId, token)
    let url = `${BASE_URL}constructors/${constructorId}`
    let init = getTokenInit(token)
    init["method"] = "DELETE"
    return await tryCatchFetch(url, init)
  }

  const deleteFantasyTeam = async (fantasyTeamID, token) => {
    let url = `${BASE_URL}teams/${fantasyTeamID}/`
    let init = getTokenInit(token)
    init["method"] = "DELETE"
    return await tryCatchFetch(url, init)
  }

  const createTeamDrivers = async (newTeamDriverParams, token) => {
    let url = `${BASE_URL}teamdrivers/`
    let init = getTokenInit(token)
    init["method"] = "POST"
    init["body"] = JSON.stringify(newTeamDriverParams)
      return await tryCatchFetch(url, init)
    }

 

  const myExport = {
    login,
    signupUser,
    getCurrentSeason,
    getRaceByRound,
    getQualiByRound,
    getCurrentDrivers,
    getCurrentConstructors,
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
    createCurrentDrivers,
    deleteCurrentDrivers,
    deleteCurrentConstructors,
    createCurrentConstructors,
    getDriversBackend,
    getConstructorsBackend,
    createTeamDrivers,
    getBackendTeamDrivers,
    updateDriversBackend,


  }
  
  export default myExport 