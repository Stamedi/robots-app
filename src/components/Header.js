import React from 'react';
import Nav from './Nav';
import robot_main from '../assets/images/robot_main.png';
import robot_bg from '../assets/images/robot_bg.png';
import robot_left from '../assets/images/robot_left.png';
import '../styles/Header.scss';

const Header = () => {
  return (
    <header>
      <div className="inner-container">
        <Nav />
        <h1>
          Find your <br /> household assistant
        </h1>
        <div className="robot-header-container-none robot-header-container-flex">
          <div className="robot-left-container">
            <img src={robot_left} alt="robot_left" />
          </div>
          <div className="robot-bg-container">
            <img src={robot_main} alt="robot_main" />
            <img className="robot-bg-header" src={robot_bg} alt="robot_bg" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
