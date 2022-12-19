import React from 'react';
import white_horizontal_logo from '../assets/images/white_horizontal_logo.png';
import cart from '../assets/images/cart.svg';
import '../styles/Header.scss';

const Nav = () => {
  return (
    <nav>
      <div className="logo-container">
        <img src={white_horizontal_logo} alt="logo" />
      </div>
      <div className="nav-items">
        <ul>
          <li className="nav-item-green">ROBOTS</li>
          <li>COMPANY</li>
          <li>CONTACTS</li>
        </ul>
        <button className="cart-btn-container">
          <img src={cart} alt="cart" /> Cart
        </button>
      </div>
    </nav>
  );
};

export default Nav;
