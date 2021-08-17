import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router';
// react & bootstrap components
import Container from 'react-bootstrap/Container'
import NavComponent from '../components/NavComponent';
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import CardColumns from 'react-bootstrap/CardColumns'
import Figure from 'react-bootstrap/Figure'
import DriverTeamList from '../components/DriverTeamList';


// import FigureImage from 'react-bootstrap/Figure'


// contexts
import ImageContext from '../contexts/ImageContext';
import UserContext from '../contexts/UserContext';
// apis
import FormulaAPI from '../apis/FormulaAPI'

const DriversDetailPage = (props) => {

  const images = useContext(ImageContext)
  const user = useContext(UserContext)

  const location = useLocation();
  const { driverStanding } = location.state
  console.log(driverStanding, 'location state')


const renderDriverDetailPage = () => {

  if (driverStanding === null){
    return <p>Loading...</p>
  }

  console.log(driverStanding, 'driver standing on drivers detail page')
  let driver = driverStanding.Driver
  let driverTeam = driverStanding.Constructors[0]
  console.log(driverTeam, 'driverTeam console')
  let imgLogo = `${images}/${props.match.params.driverId}.jpeg`;
  let imgFlag = `${images}/${driver.nationality}.png`;


    return (
      <div>
        <NavComponent />
        <Container className="d-flex flex-column align-items-center">
        <Card className="bg-dark text-white h-50 w-50">
          <Card.Img className=""src={`${imgLogo}`} alt={`${props.match.params.driverId} logo`} />
            <Card.Body className="d-flex flex-row justify-content-start align-items-center h-auto py-1">
            <Figure className="mt-2">
              <Figure.Image
                width={64}
                height={64}
                src={`${imgFlag}`} 
                alt={`${driver.nationality} icon`}
                className="mb-0"
              />
            </Figure>
            <Card.Text className="fs-4 lh-3">
              {`${driver.givenName}`} {`${driver.familyName}`}
              <Card.Text className="fs-6 lh-2">
                {`${driver.nationality}`}
              </Card.Text>
            </Card.Text>
            </Card.Body>
        </Card >
        <CardGroup  className="bg-dark text-white h-50 w-50">
          <Card className="bg-dark text-white h-50 w-50">
            <Card.Body>
              <Card.Text className="fs-6 lh-1">
                CHAMPIONSHIP
              </Card.Text>
              <Card.Text className="fs-6 lh-1">
                {driverStanding.position}
              </Card.Text>
              <Card.Text className="fs-6 lh-1">
                Position
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="bg-dark text-white h-50 w-50">
          <Card.Body>
          <Card.Text className="fs-6 lh-1">
                CURRENTLY
              </Card.Text>
              <Card.Text className="fs-6 lh-1">
                {driverStanding.points}
              </Card.Text>
              <Card.Text className="fs-6 lh-1">
                points
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="bg-dark text-white h-50 w-50">
          <Card.Body>
            <Card.Text className="fs-6 lh-1">
              THIS SEASON
            </Card.Text>
            <Card.Text className="fs-6 lh-1">
              {driverStanding.wins}
            </Card.Text>
            <Card.Text className="fs-6 lh-1"> 
              wins
            </Card.Text>
          </Card.Body>
          </Card>
        </CardGroup>
        {/* <CardColumns> */}
          <Card className="bg-dark text-white h-50 w-50">
            <Card.Header>Current Team</Card.Header>
            <Card.Body className="pt-0">
              <Card className="bg-dark text-white" fluid>
                <Card.Text>
                  <DriverTeamList 
                  teamId={driverTeam.constructorId}
                  standings={driverStanding}
                  className="bg-dark text-white"/>
                </Card.Text>
              </Card>
            </Card.Body>
            </Card>
          {/* </CardColumns> */}
        </Container>
        
      </div>
    )
}


  return (
    <Container>
      { renderDriverDetailPage() }
    </Container>
  );
};

export default DriversDetailPage;