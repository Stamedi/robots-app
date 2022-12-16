import React from 'react';
import '../styles/Footer.scss';
import white_vertical_logo from '../assets/images/white_vertical_logo.png';

const Footer = () => {
  return (
    <footer>
      <img src={white_vertical_logo} alt="" />
      <p>Awesome robots ©2021</p>
    </footer>
  );
};

export default Footer;
