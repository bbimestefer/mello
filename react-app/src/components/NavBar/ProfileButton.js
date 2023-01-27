import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from "react-router-dom";
import './ProfileButton.css'

function ProfileButton(user) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const closeMenu = (e) => {
    if (!ulRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    if (!showMenu) return;

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    setShowMenu(false)
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div>
        <button className="profile-button fwb" style={{"backgroundColor":"green"}} onClick={openMenu}>
            {user.first_name[0]}{user.last_name[0]}
        </button>
        <ul className={ulClassName} ref={ulRef}>
            <div className="dropdown-menu">
                <li className='user-info'>{user.username}</li>
                <li className='user-info'>{user.email}</li>

                <li>
                    <button className="logout cw fwb" onClick={logout}>Log Out</button>
                </li>
            </div>
        </ul>
    </div>
  );
}

export default ProfileButton;
