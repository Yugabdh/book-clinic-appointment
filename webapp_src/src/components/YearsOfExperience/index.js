import React, { useState, useEffect } from 'react';

import logoColor from '../../assets/img/png/tooth-color.png';

import Container from 'react-bootstrap/Container';

const YearsOfExperience = () => {

  const [experience, setExperience] = useState();

  function diff_years(dt2, dt1) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60 * 24);

    return Math.abs(Math.round(diff/365.25));
  }

  useEffect(() => {
    const start_date = new Date(2007,1,1);
    setExperience(diff_years(start_date, new Date()))
  }, []);

  return (
    <section className="years-of-experience">
      <div className="d-flex justify-content-center align-items-center mask">
          <Container className="years-of-experience-wrapper">
            <div className="call text-center">
              <img
                src={logoColor}
                width="100"
                height="100"
                className="d-inline-block align-top"
                alt="logo"
              />
              <p className="call-text"><span className="years-count">{experience}+</span> Years of Experience</p>
              <span className="dot"></span>&nbsp;
              <span className="dot"></span>&nbsp; 
              <span className="dot"></span>&nbsp; 
              <span className="dot"></span>
            </div>
          </Container>
      </div>
    </section>
  )
}

export default YearsOfExperience