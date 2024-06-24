import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Papaleria from './components/Papaleria';
import Productos from './components/Products';
import Pedidos from './components/Pedidos';
import Header from './components/Header';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import NewPassword from './components/NewPassword';
import './App.css';
import { validateToken } from './helpers/authHelper';
import Users from './components/Users';
import CheckEmail from './components/MesaggePassword';
const App = () => {
    const [activeContent, setActiveContent] = useState('dashboard');
    const [selectedItem, setSelectedItem] = useState('Dashboard');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const tokenIsValid = validateToken();
        setIsLoggedIn(tokenIsValid);
    }, []);

    const handleMenuClick = (menu, itemName) => {
        setActiveContent(menu);
        setSelectedItem(itemName);
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setActiveContent('dashboard');
        setSelectedItem('Dashboard');
    };

    return (
        <Router>
            <Switch>
                <Route path="/reset-password">
                    {isLoggedIn ? <Redirect to="/dashboard" /> : <ResetPassword onLogout={handleLogout} />}
                </Route>
                <Route path="/new-password">
                    {isLoggedIn ? <Redirect to="/dashboard" /> : <NewPassword />}
                </Route>
                <Route path="/check-email">
                    <CheckEmail />
                </Route>
                <Route path="/">
                    {isLoggedIn ? (
                        <div className="dashboard">
                            <Sidebar onMenuClick={handleMenuClick} onLogout={handleLogout} />
                            <div className="dashboard--main">
                                <Header selectedItem={selectedItem} />
                                <div className="dashboard--content">
                                    {activeContent === 'dashboard' && <Content />}
                                    {activeContent === 'stationery' && <Papaleria />}
                                    {activeContent === 'productos' && <Productos />}
                                    {activeContent === 'orders' && <Pedidos />}
                                    {activeContent === 'users' && <Users />}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Login onLogin={handleLogin} />
                    )}
                </Route>
            </Switch>
        </Router>
    );
};

export default App;