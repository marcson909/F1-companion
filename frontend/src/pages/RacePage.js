import { useEffect, useState, useContext } from "react"
// api
import FormulaAPI from '../apis/FormulaAPI'
// contexts
import UserContext from "../contexts/UserContext"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Button from "react-bootstrap/Button"
import Offcanvas from 'react-bootstrap/Offcanvas'

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import googleKey from '../hidden'

import NavComponent from "../components/NavComponent"
import RaceResultsList from "../components/RaceResultsList"
import QualifyingResultsList from "../components/QualifyingResultsList"


const RacePage = (props) => {

    const [race, setRace] = useState(null)
    const [qual, setQual] = useState(null)
    const user = useContext(UserContext)
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


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

  //  Google Maps API implementation
  const MapContainer = () => {  
      const mapStyles = {        
        height: "100%",
        width: "100%"};
      
      const defaultCenter = {
        lat: parseFloat(race.Circuit.Location.lat), lng: parseFloat(race.Circuit.Location.long)
      }
      return (
         <LoadScript
           googleMapsApiKey={googleKey}>
            <GoogleMap
              mapContainerStyle={mapStyles}
              mapTypeId="satellite"
              zoom={15}
              center={defaultCenter}>
              <Marker position={defaultCenter}/>
              </GoogleMap>
          </LoadScript>
      )
    }
 
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
        <Button variant="primary" onClick={handleShow}>
        {race.Circuit.circuitName}
      </Button>
      <Offcanvas show={show} onHide={handleClose} backdrop={false}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{race.Circuit.circuitName}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body id="map">
        {MapContainer()}
        </Offcanvas.Body>
      </Offcanvas>
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