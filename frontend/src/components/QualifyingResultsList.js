import React from 'react';
import Table from 'react-bootstrap/Table'

const QualifyingResultsList = (props) => {

  const { qual, round } = props
  // console.log(qual)
  console.log(round)

  const getDriverID = (result) => {
    let driver = result['Driver']
    // console.log(driver)
    return driver
  }

  const filterStatus = (result) => {
    console.log(result.hasOwnProperty(`Q${round}`))
    if (result.hasOwnProperty(`Q${round}`)){
      if (result[`Q${round}`] === ""){
        return "DNF"
      }
      else return result[`Q${round}`]
      
    }
    else if (!result.hasOwnProperty(`Q${round}`)){
      if (result.hasOwnProperty(`Q${round-1}`)){
        if (result[`Q${round-1}`] === ""){
          return "DNF"
        }
        else return result[`Q${round-1}`]
      }
      else if (!result.hasOwnProperty(`Q${round-1}`)){
        if (result[`Q${round-2}`] === ""){
          return "DNF"
        }
        else return result[`Q${round-2}`]
      }
    }
  }

  if (!qual.QualifyingResults){
    return <h3>Check back after qualifying for results</h3>
  }

  let results = qual.QualifyingResults.map((result, index) => {

    let currentDriver = getDriverID(result);
    let status = filterStatus(result)
    // console.log(currentDriver.driverId)
    // console.log(currentDriver)
    if (round === 3 && result.position > 10){
      return (
        <tr key={index} className="text-white-50 bg-dark">
          <td>{result.position}</td>
          <td>{result.number} {currentDriver.code}</td>
          <td>{status}</td>
        </tr>
      )
    }
    else if (round === 2 && result.position > 15){
      return (
        <tr key={index} className="text-white-50 bg-dark">
          <td>{result.position}</td>
          <td>{result.number} {currentDriver.code}</td>
          <td>{status}</td>
        </tr>
      )
    }
    else if (round === 1 && status === "DNF" ){
      return (
        <tr key={index} className="text-white-50 bg-dark">
          <td>{result.position}</td>
          <td>{result.number} {currentDriver.code}</td>
          <td>{status}</td>
        </tr>
      )
    }
    else {
      return (
        <tr key={index}>
          <td>{result.position}</td>
          <td>{result.number} {currentDriver.code}</td>
          <td>{status}</td>
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
          </tr>
        </thead>
        <tbody>
        { results }
        </tbody>
      </Table>
  )
}

export default QualifyingResultsList;