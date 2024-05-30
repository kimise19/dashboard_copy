import React from 'react';
import { FiBell, FiSettings } from "react-icons/fi";
import '../styles/Header.css';

const Header = ({ selectedItem }) => {
  return (
    <div className='content--header'>
      <h1 className='header--title'>{selectedItem}</h1>
      <div className='header--icons'>
        <FiBell className='icon' />
        <FiSettings className='icon' />
      </div>
    </div>
  );
};

export default Header;
