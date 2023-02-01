import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const onLogout = async (e) => {
        await dispatch(logout());
    };

    return (
        <div>
            {user && <button onClick={onLogout}>Logout</button>}
        </div>
    )
};

export default LogoutButton;
