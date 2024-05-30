import React from 'react';
import { FiBell, FiSettings } from 'react-icons/fi';
import '../styles/ContentHeader.css';

const ContentHeader = () => {
  return (
    <div className='content--header'>
      <h1 className='header--title'>DASHBOARD</h1>
      <div className='header--icons'>
        <FiBell className='icon' />
        <FiSettings className='icon' />
      </div>
    </div>
  );
};

export default ContentHeader;
