
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './index.css'
import ProfileButton from './ProfileButton';

const NavBar = () => {
    const user = useSelector(state => state.session.user)
    return (
        <div className={user ? 'userNavContainer' : 'navContainer'}>
            <nav className={user ? 'navBar aic jcc' : 'navBar'}>
                <div className='leftNav'>
                    {user ? <li className='lstd'>
                        <NavLink to={`/${user.username}/boards`} exact={true} activeClassName=''>
                        Home
                        </NavLink>
                    </li>
                    :
                    <li className='lstd'>
                        <NavLink style={{"color":"black"}} to='/' exact={true} activeClassName=''>
                        Home
                        </NavLink>
                    </li>}
                </div>
                <div className='rightNav'>
                    {!user ? <div className='fdr'>
                        <li className='p1em lstd'>
                            <NavLink className='lstd fb f18' id='logIn' to='/login' exact={true} activeClassName=''>
                            Log in
                            </NavLink>
                        </li>
                        <li className='p1em signUp lstd'>
                            <NavLink className='lstd fb f18' to='/sign-up' exact={true} activeClassName=''>
                            Sign Up
                            </NavLink>
                        </li>
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
