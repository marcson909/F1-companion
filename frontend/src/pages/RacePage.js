import { useEffect, useState, useContext } from "react"
// api
import FormulaAPI from '../apis/FormulaAPI'
// contexts
import UserContext from "../contexts/UserContext"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import NavComponent from "../components/NavComponent"
import RaceResultsList from "../components/RaceResultsList"
import QualifyingResultsList from "../components/QualifyingResultsList"


const RacePage = (props) => {

    const [race, setRace] = useState(null)
    const [qual, setQual] = useState(null)
    const user = useContext(UserContext)


  useEffect(() => {
      const getRaceInfo = async () => {
        console.log("hey we're at get race info")
        try {
          let raceRound = props.match.params.raceRound
    
          let raceData = await FormulaAPI.getRaceByRound(raceRound)
          raceData = raceData['MRData']['RaceTable']['Races'][0]
    
          if (raceData) {
            setRace( raceData )
          }
        }
        catch (error) {
          console.log(error)
        }
      }
      getRaceInfo();
  }, [])

  useEffect(() => {
      const getQualiInfo = async () => {
        console.log("hey we're at get race info")
        try {
          let raceRound = props.match.params.raceRound
    
          let qualiData = await FormulaAPI.getQualiByRound(raceRound)
          qualiData = qualiData['MRData']['RaceTable']['Races'][0]
    
          if (qualiData) {
            setQual( qualiData )
          }
        }
        catch (error) {
          console.log(error)
        }
      }
    getQualiInfo();
  }, [])

   // const renderRaceCircuit = () => {
  //   console.log(race)
  //   let circuit = race.Circuit.map((item, index) => {
      
  //     return (
  //       <li key={`task-${index}`}>
  //         <Link to={`/todo/${list.id}/tasks/${task.id}`}>{task.task_name}</Link>
  //       </li>
  //     )
  //   })

    // console.log(raceItems)

  //   return (
  //     <ul className="simple-list">
  //       {/* { taskElements } */}
  //       Race Items Go Here
  //     </ul>
  //   )
  // }

 
  const renderRaceList = () => {
    if (!race || !qual) {
      return <p>Loading...</p>
    }

    return (
      <div>
        <NavComponent />
        <h1>{race.raceName}</h1>
        <h3>Round: {race.round}</h3>
        <h3>{race.date}</h3>
        <h3>{race.time}</h3>
        <div>
          <Tabs defaultActiveKey="race" id="tabs" className="mb-3 nav-fill">
            <Tab eventKey="race" title="Race" >
              <RaceResultsList race={race}/>
            </Tab>
            <Tab eventKey="q3" title="Q3">
              <QualifyingResultsList qual={qual} round={3}/>
            </Tab>
            <Tab eventKey="q2" title="Q2">
              <QualifyingResultsList qual={qual} round={2}/>
            </Tab>
            <Tab eventKey="q1" title="Q1">
            <QualifyingResultsList qual={qual} round={1}/>
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }

  console.log(race)
  return (
    <div>
      { renderRaceList() }
    </div>
  )
}

export default RacePage; 