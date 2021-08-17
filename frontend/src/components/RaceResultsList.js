import React from 'react';
import Table from 'react-bootstrap/Table'

const RaceResultsList = (props) => {
  const { race } = props
 
  const getDriverID = (result) => {
    let driver = result['Driver']
    return driver
  }

  const filterStatus = (result) => {
    if (result.status === "Finished"){
      return result['Time'].time
    } else {
      return result.status
    }
  }


  if (!race.Results){
    return <h3>Check back after the race for results</h3>
  }

  let results = race.Results.map((result, index) => {

    let currentDriver = getDriverID(result);
    let status = filterStatus(result)
    
    // const handleClick = () =>{
    //   console.log(props)
    //   let driverId = currentDriver.driverId
    //   history.push(`/race/${race.round}/${driverId}`);
    // }


    if (result.status !== "Finished"){
      return (
        // removed onClick for now
        <tr key={index} className="text-white-50 bg-dark">
          <td>{result.position}</td>
          <td>{result.number} {currentDriver.code}</td>
          <td>{status}</td>
          <td>{result.points}</td>
        </tr>
      )
    } else {
      return (
        // removed onClick for now
        <tr key={index} >
          <td>{result.position}</td>
          <td>{result.number} {currentDriver.code}</td>
          <td>{status}</td>
          <td>{result.points}</td>
        </tr>
    )
    }
      
  })

  return (
      <Table bordered hover>
      <thead>
          <tr>
            <th>Position</th>
            <th>Driver</th>
            <th>Result</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
        { results }
        </tbody>
      </Table>
  )
}

export default RaceResultsList;