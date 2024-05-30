import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Papaleria from './components/Papaleria';
import Productos from './components/Products';
import Pedidos from './components/Pedidos';
import Header from './components/Header';
import './App.css';

const App = () => {
  const [activeContent, setActiveContent] = useState('dashboard');
  const [selectedItem, setSelectedItem] = useState('Dashboard');

  const handleMenuClick = (menu, itemName) => {
    setActiveContent(menu);
    setSelectedItem(itemName);
  };

  return (
    <div className='dashboard'>
      <Sidebar onMenuClick={handleMenuClick} />
      <div className='dashboard--main'>
        <Header selectedItem={selectedItem} />
        <div className='dashboard--content'>
          {activeContent === 'dashboard' && <Content />}
          {activeContent === 'stationery' && <Papaleria />}
          {activeContent === 'productos' && <Productos />}
          {activeContent === 'orders' && <Pedidos />}
        </div>
      </div>
    </div>
  );
};

export default App;
