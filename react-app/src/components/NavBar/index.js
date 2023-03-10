
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './index.css'
import ProfileButton from './ProfileButton';

const NavBar = () => {
    const user = useSelector(state => state.session.user)
    return (
        <div className={user ? 'userNavContainer' : 'navContainer'}>
            <nav className={user ? 'navBar aic' : 'navBar aic jcc'}>
                <div className='aic'>
                    {user ? <li className='lstd'>
                        <NavLink className='lstd cw' id='boardHomeLink' to={`/${user.username.toLowerCase()}/boards`} exact={true} activeClassName=''>
                        Mello
                        </NavLink>
                    </li>
                    :
                    <li className='lstd'>
                        <NavLink className='lstd cw' id='homeLink' style={{"color":"black"}} to='/' exact={true} activeClassName=''>
                        Mello
                        </NavLink>
                    </li>}
                </div>
                <div className='rightNav'>
                    {!user ? <div className='fdr'>
                        <NavLink className=' p1em lstd fwb f18' id='logIn' to='/login' exact={true} activeClassName=''>
                        Log in
                        </NavLink>
                        <NavLink className='lstd fwb f18 cw p1em signUp' to='/sign-up' exact={true} activeClassName=''>
                        Sign Up
                        </NavLink>
                    </div>
                    :
                    <div>
                        <li className='lstd'>
                            <ProfileButton {...user}/>
                        </li>
                    </div>}
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
