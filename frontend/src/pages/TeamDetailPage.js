import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router';
// react & bootstrap components
import Container from 'react-bootstrap/Container'
import NavComponent from '../components/NavComponent';
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import CardColumns from 'react-bootstrap/CardColumns'
import Figure from 'react-bootstrap/Figure'
import DriverConstructorList from '../components/DriverConstructorList';


// import FigureImage from 'react-bootstrap/Figure'


// contexts
import ImageContext from '../contexts/ImageContext';
import UserContext from '../contexts/UserContext';
// apis
import FormulaAPI from '../apis/FormulaAPI'

const TeamDetailPage = (props) => {

  const images = useContext(ImageContext)
  const user = useContext(UserContext)

  const location = useLocation();
  const { teamStanding } = location.state
  const [team, setTeam] = useState(null)
 

  useEffect(() => {
    const getTeamInfo = async () => {
      console.log("hey we're at get team info")
      try {
        let teamId = props.match.params.teamId
  
        let teamData = await FormulaAPI.getTeamById(teamId)
        teamData = teamData['MRData']['ConstructorTable']['Constructors'][0]
  
        if (teamData) {
          setTeam( teamData )
        }
      }
      catch (error) {
        console.log(error)
      }
    }
    getTeamInfo();
}, [])


const renderTeamDetailPage = () => {

  if (team === null){
    return <p>Loading...</p>
  }

  // let teamElements = team.map((teamStanding, index) => {
  //   let maxPoints = teamStandings[0].points
  //     return ( 
  //       <ListGroup key={`teamStanding-${index}`}>
  //         <TeamListSummary teamStanding={teamStanding} maxPoints={maxPoints}/>
  //       </ListGroup>
  //     )
  //   })

  let imgLogo = `${images}/${props.match.params.teamId}.jpg`;
  let imgFlag = `${images}/${team.nationality}.png`;


    return (
      <div>
        <NavComponent />
        <Card className="bg-dark text-white">
          <Card.Img src={`${imgLogo}`} alt={`${props.match.params.teamId} logo`} />
            {/* <Card.ImgOverlay className="d-flex flex-column justify-content-end shadow-sm"> */}
            <Card.Body className="d-flex flex-row justify-content-start align-items-center h-auto py-1">
            <Figure className="mt-2">
              <Figure.Image
                width={64}
                height={64}
                src={`${imgFlag}`} 
                alt={`${team.nationality} icon`}
                className="mb-0"
              />
            </Figure>
            <Card.Text className="fs-4 lh-3">
              {`${team.name}`}
              <Card.Text className="fs-6 lh-2">
                {`${team.nationality}`}
              </Card.Text>
            </Card.Text>
            </Card.Body>
        </Card >
        <CardGroup >
          <Card className="bg-dark text-white">
            <Card.Body>
              <Card.Text className="fs-6 lh-1">
                CHAMPIONSHIP
              </Card.Text>
              <Card.Text className="fs-6 lh-1">
                {teamStanding.position}
              </Card.Text>
              <Card.Text className="fs-6 lh-1">
                Position
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="bg-dark text-white">
          <Card.Body>
          <Card.Text className="fs-6 lh-1">
                CURRENTLY
              </Card.Text>
              <Card.Text className="fs-6 lh-1">
                {teamStanding.points}
              </Card.Text>
              <Card.Text className="fs-6 lh-1">
                points
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="bg-dark text-white">
          <Card.Body>
            <Card.Text className="fs-6 lh-1">
              THIS SEASON
            </Card.Text>
            <Card.Text className="fs-6 lh-1">
              {teamStanding.wins}
            </Card.Text>
            <Card.Text className="fs-6 lh-1"> 
              wins
            </Card.Text>
          </Card.Body>
          </Card>
        </CardGroup>
        <CardColumns>
        <Card className="bg-dark text-white">
        <Card.Header>Current Drivers</Card.Header>
        <Card.Body className="pt-0">
          <Card>
            <Card.Text>
              <DriverConstructorList teamId={props.match.params.teamId} className="bg-dark text-white"/>
            </Card.Text>
          </Card>
        </Card.Body>
        </Card>
        </CardColumns>
        
        
      </div>
    )
}


  return (
    <Container>
      { renderTeamDetailPage() }
    </Container>
  );
};

export default TeamDetailPage;