import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom';

const NavComponent = () => {
  return (
    <Navbar className="justify-content-center nav-fill">
        <Nav justify variant="tabs" defaultActiveKey="/" className="nav-fill">
          <Nav.Item>
            <Nav.Link><Link to="/" >Races</Link></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="teams" ><Link to="/teams/">Teams</Link></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="drivers"><Link  to="/drivers/">
                Drivers
              </Link></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link disabled eventKey="fantasy" ><Link>
                Fantasy
              </Link></Nav.Link>
            </Nav.Item>
          </Nav>
      </Navbar>
  );
};

export default NavComponent;