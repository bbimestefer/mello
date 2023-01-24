
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
    return (
        <nav className='navBar'>
            <div className='leftNav'>
                <li>
                    <NavLink to='/' exact={true} activeClassName='active'>
                    Home
                    </NavLink>
                </li>
            </div>
            <div className='rightNav'>
                <li>
                    <NavLink to='/login' exact={true} activeClassName='active'>
                    Login
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/sign-up' exact={true} activeClassName='active'>
                    Sign Up
                    </NavLink>
                </li>
                <li>
                <LogoutButton />
                </li>
            </div>
        </nav>
    );
}

export default NavBar;
