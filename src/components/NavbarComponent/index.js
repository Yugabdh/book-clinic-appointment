import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import logoBlack from '../../assets/img/png/tooth-black.png';
import logoWhite from '../../assets/img/png/tooth-white.png';

const NavbarComponent = () => {
  const [scrollNav, setScrollNav] = useState(false);

  const changeNav = () => {
      if (window.scrollY >= 80) {
          setScrollNav(true);
      } else {
          setScrollNav(false);
      }
  }

  useEffect(() => {
      window.addEventListener('scroll', changeNav);
  }, []);

  return (
    <Navbar bg="light" variant="light" expand="lg" fixed="top" className={`${scrollNav ? "" : "scrollNav"}`} onToggle={()=>setScrollNav(true)}>
      <Container>
        <Navbar.Brand href="#home">
          <img
            src={scrollNav ? logoBlack : logoWhite}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="logo"
          />
          <span className="brand-name">Raghul Family Dental</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="#link_1">Link 1</Nav.Link>
                <Nav.Link href="#link_2">Link 2</Nav.Link>
                <Nav.Link href="#link_3">Link 3</Nav.Link>

            </Nav>
            {/* <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
                Dank memes
            </Nav.Link>
            </Nav> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
