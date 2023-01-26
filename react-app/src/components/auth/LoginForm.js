import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
        }
    };

    const demoUser = async (e) => {
        e.preventDefault();
        const data = await dispatch(login('demo@aa.io', 'password'));
        if (data) {
            setErrors(data);
        }
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    if (user) {
        return <Redirect to={`/${user.username.toLowerCase()}/boards`} />;
    }

    return (
        <div className='jcc'>
        <form onSubmit={onLogin} className='loginForm fdc aic g1'>
            <h4 className='loginHeader aic jcc' style={{"marginTop":"5px"}}>Log in to Mello</h4>
            <div>
            {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
            ))}
            </div>

            {/* <label htmlFor='email'>Email</label> */}
            <input
                name='email'
                type='text'
                placeholder='Enter email'
                value={email}
                onChange={updateEmail}
            />

            {/* <label htmlFor='password'>Password</label> */}
            <input
                name='password'
                type='password'
                placeholder='Enter Password'
                value={password}
                onChange={updatePassword}
            />

            <button type='submit' className='fwb' id='loginButton'>Log in</button>
            <div style={{"fontSize":"12px", "color":"lightSlateGray"}}>OR</div>
            <button className='fwb' id='demoButton' onClick={demoUser}>Demo User</button>
        </form>
        </div>
    );
};

export default LoginForm;
