import React, { useContext, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import Offcanvas from 'react-bootstrap/Offcanvas'

import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'

import Figure from 'react-bootstrap/Figure'

import UserContext from '../contexts/UserContext';
import ImageContext from '../contexts/ImageContext';

import FormulaAPI from '../apis/FormulaAPI'
import ListGroup from 'react-bootstrap/ListGroup'
import FantasyOffCanvas from './FantasyOffCanvas';


const FantasyTeamDriverListView = (props) => {
  console.log(props)
  const { backendDrivers } = props

  const MODE_TYPE = {
    VIEW: 1,
    UPDATE: 2,
  }

  const [selected, setSelected] = useState([])
  const [fantasyDrivers, setFantasyDrivers] = useState([])
  const [userFantasyTeam, setUserFantasyTeam] = useState(null)
  const [teamDrivers, setTeamDrivers] = useState(null)
  const [value, setValue] = useState(0)

  const [mode, setMode] = useState(MODE_TYPE.VIEW)

  const changeMode = (newMode) => {
    setMode(newMode)
  }

  const onChangeHandler = id => () => {               // pass index/identify params
    if (selected.includes(id)){
      setSelected(selected.filter(x => x !== id))
      setFantasyDrivers(fantasyDrivers.filter(x => x !== id))
      console.log(fantasyDrivers.filter(x => x !== id))
    } else {
      setSelected([...selected, id]);
      setFantasyDrivers([...fantasyDrivers,id])
      console.log(fantasyDrivers, id)
    }                           
  };

  // const handleDriver = id => () => {
  //   if (!selected.includes(id)) {
  //     setSelected([...selected, id]); 
  //   }                            
  // }


  const { driverStandings, recentResults, fantasyTeam, league} = props

  const user = useContext(UserContext)
  const images = useContext(ImageContext)

  useEffect(() => {
    if (!fantasyDrivers){
      setFantasyDrivers(fantasyTeam.drivers)
    }
  }, [])

  useEffect(() => {
    const getTeamDrivers = async () => {
      try {
        let teamDriverData = await FormulaAPI.getBackendTeamDrivers(user.token)
        console.log(teamDriverData, "teamDriverData")
        if (teamDriverData) {
          setTeamDrivers( teamDriverData)
        }
      }
      catch (error) {
        console.log(error)
      }
    }
    if (!teamDrivers) {
      getTeamDrivers()
    }
  }, [])

  const forceUpdate = () => {
    return () => setValue(value => value + 1);
  }

  const updateTeam = async () => {
    try {
    let inputName = document.getElementById("team-name")
    let token = user.token
    let fantasyTeamID = fantasyTeam.id

    let updatedFantasyTeam = {
      name: inputName.value,
      owner: user.user.id,
      league: league.id
    }

    let data = await FormulaAPI.updateFantasyTeam(fantasyTeamID, updatedFantasyTeam, token)
    console.log(data, "DATA")
    if (data) {
      setUserFantasyTeam(data)
      changeMode(MODE_TYPE.VIEW)
      forceUpdate();
      updateDriver(data);
    }
    }
    catch {

    }
  }

  const updateDriver = async (data) => {
    try{
      let fantasyTeamID = fantasyTeam.id
      let tempTeamData = data
      console.log(tempTeamData)
      let tempDrivers = []
      for (let i = 0; i < fantasyDrivers.length; i++){
        tempDrivers.push(driverStandings[fantasyDrivers[i]]["Driver"])
      }
      console.log(tempDrivers, "TEMP DRIVERS")
      let results = backendDrivers.filter(o1 => tempDrivers.some(o2 => o1.driver_ref === o2.driverId));
      console.log(results, "search result driver arrays")
      for (let result of results) {
        let updatedResult = {
        driver_ref: result.driver_ref,
        number: result.number,
        code: result.code,
        first_name: result.first_name,
        last_name: result.last_name,
        dob: result.dob,
        nationality: result.nationality,
        url: result.url,
        team: [...result.team,fantasyTeamID]
        }
        let driverID = result.id
        console.log(result)
        console.log(updatedResult)
        let data = await FormulaAPI.updateDriversBackend(driverID, updatedResult, user.token)
        if (data){
          console.log(data)
        }
      }
    } 
    catch (error){

    }
  }

  const renderDriverList = () => {
    
    let driverElements = driverStandings.map((driver, index) => {
      

        // let currentDriver = driver["Driver"].driverId
        // if (fantasyTeam.drivers.includes(currentDriver)){
        //   // console.log("handle driver should have just fired off")
        //   handleDriver(index)
        // }


      let imgLogo = `${images}/${driver.Driver.driverId}.jpeg`;
      let imgFlag = `${images}/${driver.Driver.nationality}.png`;
      return(
        <ListGroup.Item className="w-100" >
          <Container className="d-flex flex-row align-items-center justify-content-end">
                <FantasyOffCanvas key={index} driver={driver} imgLogo={imgLogo} imgFlag={imgFlag}/>
                <ToggleButton
                  className="mx-1"
                  
                  id={`toggle-check-${index}`}
                  type="checkbox"
                  variant="outline-primary"
                  checked={selected.includes(index)}
                  onChange={onChangeHandler(index)}
                  value={index}
                  size="sm">
                Checked
                </ToggleButton>
          </Container>
          <Container>
              <Container>
                <Container className="d-flex flew-row">
                  <Container>
                  {driver.Driver.givenName} {driver.Driver.familyName}
                  </Container>
                </Container>
                <Container className="d-flex flew-row justify-content-between">
                    <div>
                    {`${driver.Constructors[0].name}`}
                    </div>
                    <div>
                    {`${driver.points} points`}
                    </div>
                    <div>
                    {`${driver.wins} wins`}
                    </div>
                </Container>
              </Container>
            </Container>
          </ListGroup.Item>
        
      )
    })
    return (
      <Container>
        <ToggleButtonGroup type="checkbox" defaultValue={[]} className="mb-2" vertical={true}>
        { driverElements }
        </ToggleButtonGroup>
      </Container>
    )
  }



  // console.log(fantasyDrivers, "fantasyDrivers state")
  return (
    <div>
      {
        mode === MODE_TYPE.VIEW &&
        <h3>{fantasyTeam.name}</h3>

      }
      {
        mode === MODE_TYPE.UPDATE &&
        <div>
        <h3>Team name: </h3>
        <input id="team-name" placeholder="name" defaultValue={fantasyTeam.name}/>
        </div>
      }
     
      { renderDriverList() }
      {
        mode === MODE_TYPE.VIEW &&
        <Button onClick={() => changeMode(MODE_TYPE.UPDATE)}>Update</Button>
      }
      {
        mode === MODE_TYPE.UPDATE &&
        <div>
        <Button onClick={updateTeam}>Save</Button>
        <Button onClick={() => changeMode(MODE_TYPE.VIEW)}>Cancel</Button>
        </div>
      }
      
    </div>
  );
};

export default FantasyTeamDriverListView;