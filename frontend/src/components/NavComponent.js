import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom';

const NavComponent = () => {
  return (
    <Navbar fill className="justify-content-center nav-fill">
        <Nav fill variant="tabs"  className="nav-fill">
          <Nav.Item>
            <Nav.Link eventKey="/"><Link to="/" className="nav-link border-0">Races</Link></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="teams" ><Link to="/teams/" className="nav-link border-0">Teams</Link></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="drivers"><Link  to="/drivers/" className="nav-link border-0">
                Drivers
              </Link></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link disabled eventKey="fantasy" ><Link className="nav-link border-0">
                Fantasy
              </Link></Nav.Link>
            </Nav.Item>
          </Nav>
      </Navbar>
  );
};

export default NavComponent;