import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
    const [errors, setErrors] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onSignUp = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
        const data = await dispatch(signUp(firstName, lastName, username, email, password));
        if (data) {
            setErrors(data)
        }
        }
    };

    useEffect(() => {
        const e = []
        if(password !== repeatPassword) e.push("Passwords must match")
        setErrors(e)
    }, [password, repeatPassword])

    const updateFirstName = (e) => {
        setFirstName(e.target.value);
    };

    const updateLastName = (e) => {
        setLastName(e.target.value);
    };

    const updateUsername = (e) => {
        setUsername(e.target.value);
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const updateRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
    };

    if (user) {
        return <Redirect to={`/${user.username.toLowerCase()}/boards`} />;
    }

    return (
        <div className='jcc'>
            <form onSubmit={onSignUp} className='signUpForm fdc aic g1'>
            <h4 className='signUpHeader aic jcc' style={{"marginTop":"5px"}}>Sign up for your account</h4>
            <div>
                {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
                ))}
            </div>

                <input
                type='text'
                name='first_name'
                placeholder='Enter first name'
                onChange={updateFirstName}
                value={firstName}
                required={true}
                ></input>

                <input
                type='text'
                name='last_name'
                placeholder='Enter last name'
                onChange={updateLastName}
                value={lastName}
                required={true}
                ></input>

                <input
                type='text'
                name='username'
                placeholder='Enter username'
                onChange={updateUsername}
                value={username}
                required={true}
                ></input>

                <input
                type='email'
                name='email'
                placeholder='Enter email'
                onChange={updateEmail}
                value={email}
                required={true}
                ></input>

                <input
                type='password'
                name='password'
                placeholder='Enter password'
                onChange={updatePassword}
                value={password}
                minLength={5}
                required={true}
                ></input>

                <input
                type='password'
                name='repeat_password'
                placeholder='Repeat password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                minLength={5}
                required={true}
                ></input>

            <button type='submit' className='fwb' id='signUpButtons'>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpForm;
