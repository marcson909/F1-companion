import React, { useContext, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import CardColumns from 'react-bootstrap/CardColumns'
import FantasyTeamPage from '../pages/FantasyTeamPage';

import UserContext from '../contexts/UserContext';
import FormulaAPI from '../apis/FormulaAPI'
import CardHeader from 'react-bootstrap/esm/CardHeader';

const FantasyTeamCardView = (props) => {
  const { recentResults, driverStandings, fantasyTeam, league } = props

  const user = useContext(UserContext)
  const [userTeam, setUserTeam] = useState(null)

  // const [key, setKey] = useState('team');
  console.log(fantasyTeam, "fantasy team")
  console.log(recentResults, "recentResults")

   const handleRemoveDriver = (driver) => {
     console.log(driver, "fantasy team driver being clicked")
     console.log(props.fantasyTeam.drivers, "fantasy team drivers")

    props.fantasyTeam.drivers.splice(props.fantasyTeam.drivers.indexOf(driver), 1);

    setUserTeam(props.fantasyTeam)
  }


    console.log("renderFantasyTeamCardView is firing now")
    console.log(props.fantasyTeam.drivers, "fantasy team drivers")

    if (!fantasyTeam.drivers){
      return (
        <Card >
            <Card.Body>
              <Card.Text>
                ADD DRIVER
              </Card.Text>
              <Card.Text>
                TEST TEST TEST
              </Card.Text>
            </Card.Body>
          </Card>
      )
    }

    // let driverCards = props.fantasyTeam.drivers.map((driver, index) => {

    //   console.log(props.fantasyTeam.drivers, "fantasy team drivers")
    //   console.log(driver, "driver")

    //   if (driver === null){
    //     return (
    //       <Card >
    //         <Card.Body>
    //           <Card.Text>
    //             ADD DRIVER
    //           </Card.Text>
    //         </Card.Body>
    //       </Card>
    //     )
    //   } 
    //   else {
    //   return (
    //         <Card className="bg-dark text-white" key={index}>
    //           <Card.Header>

    //           </Card.Header>
    //           <Card.Body>
    //             <Container>
    //               <button onClick={handleRemoveDriver(driver)}></button>
    //               <Card>

    //               </Card>
    //             </Container>
                
    //             <Card>
                  
    //             </Card>
    //             <Card>
                  
    //             </Card>
    //             <Card>
                  
    //             </Card>
    //             <Card>
                  
    //             </Card>
    //           </Card.Body>
    //         </Card>
    //   )
    //   }
    // })

    // return (
    //   <CardGroup>
    //     { driverCards }
    //   </CardGroup>
    // )

    return (
      <CardGroup>
        <Card >
          <Card.Text>
            TEST TEST TEST
          </Card.Text>
        </Card>
      </CardGroup>
    )
}

export default FantasyTeamCardView;