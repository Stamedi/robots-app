import React from 'react';
import Nav from './Nav';
import '../styles/Header.scss';

const Header = () => {
  return (
    <header>
      <div className="inner-container">
        <Nav />
        <h1>
          Find your <br /> household assistant
        </h1>
      </div>
    </header>
  );
};

export default Header;
