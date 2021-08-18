import React, { useContext, useState, useEffect } from 'react';

import Offcanvas from 'react-bootstrap/Offcanvas'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Figure from 'react-bootstrap/Figure'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

import UserContext from '../contexts/UserContext';
import ImageContext from '../contexts/ImageContext';

const FantasyOffCanvas = ({...props}) => {
  const user = useContext(UserContext)
  const images = useContext(ImageContext)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div>
      <Button variant="primary" onClick={handleShow} className="me-2" size="sm">
      Details
      </Button>
      <Offcanvas show={show} onHide={handleClose} backdrop={false} {...props}>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
          <Offcanvas.Body>
          <Container className="d-flex flex-column align-items-center w-100">
              <Card className="bg-dark text-white ">
                <Card.Img className=""src={`${props.imgLogo}`} alt={`${props.driver.Driver.driverId} logo`} />
                  <Card.Body className="d-flex flex-row justify-content-start align-items-center h-auto py-1">
                  <Figure className="mt-2">
                    <Figure.Image
                      width={64}
                      height={64}
                      src={`${props.imgFlag}`} 
                      alt={`${props.driver.Driver.nationality} icon`}
                      className="mb-0"
                    />
                  </Figure>
                  <Card.Text className="fs-4 lh-3">
                    {`${props.driver.Driver.givenName}`} {`${props.driver.Driver.familyName}`}
                    <Card.Text className="fs-6 lh-2">
                      {`${props.driver.Driver.nationality}`}
                    </Card.Text>
                  </Card.Text>
                  </Card.Body>
              </Card >
              <CardGroup  className="bg-dark text-white w-100 text-center">
                <Card className="bg-dark text-white ">
                  <Card.Body>
                    <Card.Text className="fs-6 lh-1">
                      Position
                    </Card.Text>
                    <Card.Text className="fs-6 lh-1">
                      {props.driver.position}
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card className="bg-dark text-white ">
                <Card.Body>
                <Card.Text className="fs-6 lh-1">
                      Points
                    </Card.Text>
                    <Card.Text className="fs-6 lh-1">
                      {props.driver.points}
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card className="bg-dark text-white ">
                  <Card.Body>
                    <Card.Text className="fs-6 lh-1">
                      Wins
                    </Card.Text>
                    <Card.Text className="fs-6 lh-1">
                      {props.driver.wins}
                    </Card.Text>
                  </Card.Body>
                </Card>
                </CardGroup>
              </Container>
            </Offcanvas.Body>
          </Offcanvas>
      
    </div>
  );
};

export default FantasyOffCanvas;