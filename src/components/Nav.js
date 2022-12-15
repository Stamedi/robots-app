import React from 'react';
import white_horizontal_logo from '../assets/images/white_horizontal_logo.png';
import '../styles/Header.scss';

const Nav = () => {
  return (
    <nav>
      <img src={white_horizontal_logo} alt="logo" />
      <div className="nav-items">
        <ul>
          <li>ROBOTS</li>
          <li>COMPANY</li>
          <li>CONTACTS</li>
        </ul>
        <button>Card</button>
      </div>
    </nav>
  );
};

export default Nav;
