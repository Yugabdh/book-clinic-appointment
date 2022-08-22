import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

import { NavLink, Link, useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { selectUser, selectClaims } from "../../redux/user";
import useLogout from "../../hooks/useLogout";

import logoColor from "../../assets/img/png/tooth-color.png";
import logoWhite from "../../assets/img/png/tooth-white.png";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const { logoutUser } = useLogout(handleSignOut);

  const transparent = useSelector(
    (state) => state.navbarTransparent.transparent
  );
  const [scrollNav, setScrollNav] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const user = useSelector(selectUser);
  const claims = useSelector(selectClaims);

  function handleSignOut() {
    try {
      navigate("/", { replace: true });
    } catch {
      navigate("/", { replace: true });
    }
  }

  const scrollNavStateHandler = (open) => {
    setScrollNav(open);
    setNavOpen(open);
  }

  const changeNav = useCallback(() => {
    if (transparent) {
      if (window.scrollY <= 80) {
        if (!navOpen) {
          setScrollNav(false);
        }
      } else {
        setScrollNav(true);
      }
    }
  }, [transparent, navOpen]);

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
  }, [changeNav]);

  const DisplayIfUser = ({ children }) => {
    return user ? children : "";
  };

  const NotDisplayIfUser = ({ children }) => {
    return !user ? children : "";
  };

  const NotDisplayIfSpecialUser = ({ children }) => {
    return claims ? (claims.receptionist || claims.doctor ? "" : children) : "";
  };

  const NotDisplayIfDoctor = ({ children }) => {
    return claims ? (claims.doctor ? "" : children) : "";
  };

  return (
    <Navbar
      bg="light"
      variant="light"
      expand="lg"
      fixed="top"
      className={`${scrollNav || !transparent || navOpen ? "" : "scrollNav"}`}
      onToggle={(opened) => scrollNavStateHandler(opened)}
      collapseOnSelect={true}
    >
      <Container>
        <Navbar.Brand as={Link} to={`${!user ? "/" : "/dashboard"}`}>
          <img
            src={scrollNav || !transparent || navOpen ? logoColor : logoWhite}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="logo"
          />
          <span className="brand-name">Ragul Family Dental</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NotDisplayIfUser>
              <Nav.Link as={NavLink} to="/login" href="/login">
                Login
              </Nav.Link>
            </NotDisplayIfUser>
            <DisplayIfUser>
              <Nav.Link as={NavLink} to="/dashboard" href="/dashboard">
                Dashboard
              </Nav.Link>
              <NotDisplayIfSpecialUser>
                <Nav.Link as={NavLink} to="/profile" href="/profile">
                  Profile
                </Nav.Link>
              </NotDisplayIfSpecialUser>
              <NotDisplayIfDoctor>
                <Nav.Link as={NavLink} to="/appointments" href="/appointments">
                  Book Appointment
                </Nav.Link>
              </NotDisplayIfDoctor>
            </DisplayIfUser>
          </Nav>
          <Nav>
            <DisplayIfUser>
              <button className="primary-button" onClick={logoutUser}>
                Log out
              </button>
            </DisplayIfUser>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
