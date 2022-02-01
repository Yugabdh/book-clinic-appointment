import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { NavLink, Link, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import logoColor from '../../assets/img/png/tooth-color.png';
import logoWhite from '../../assets/img/png/tooth-white.png';

import { useAuth } from '../../contexts/AuthContext';

const NavbarComponent = () => {
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    try {
      await logOut();
      navigate("/", { replace: true });
    } catch {
      console.log("error");
      navigate("/", { replace: true });
    }
  }

  const [scrollNav, setScrollNav] = useState(false);
  const transparent = useSelector((state) => state.navbarTransparent.transparent);

  const changeNav = useCallback(() => {
    if (transparent) {
      if (window.scrollY >= 80) {
        setScrollNav(true);
      } else {
          setScrollNav(false);
      }
    }
  }, [transparent]);

  useEffect(() => {
      window.addEventListener('scroll', changeNav);
  }, [changeNav]);

  const DisplayIfCurrentUser = ({children}) => {
    return (
      currentUser ? children: ''
    );
  }

  const NotDisplayIfCurrentUser = ({children}) => {
    return (
      !currentUser ? children: ''
    );
  }

  return (
    <Navbar bg="light" variant="light" expand="lg" fixed="top" className={`${scrollNav || !transparent ? "" : "scrollNav"}`} onToggle={()=>setScrollNav(true)}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={scrollNav || !transparent ? logoColor : logoWhite}
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
              <NotDisplayIfCurrentUser>
                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
              </NotDisplayIfCurrentUser>
              <DisplayIfCurrentUser>
                <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
                <Nav.Link as={NavLink} to="/appointments">Appointment</Nav.Link>
              </DisplayIfCurrentUser>
            </Nav>
            <Nav>
              <DisplayIfCurrentUser>
                <button className="primary-button" onClick={ handleSignOut }>Log out</button>
              </DisplayIfCurrentUser>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
