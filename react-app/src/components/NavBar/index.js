
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './index.css'

const NavBar = () => {
    const user = useSelector(state => state.session.user)
    return (
        <nav className='navBar'>
            <div className='leftNav'>
                {user ? <li>
                    <NavLink to={`/${user.username}/boards`} exact={true} activeClassName='active'>
                    Home
                    </NavLink>
                </li>
                :
                <li>
                    <NavLink to='/' exact={true} activeClassName='active'>
                    Home
                    </NavLink>
                </li>}
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
