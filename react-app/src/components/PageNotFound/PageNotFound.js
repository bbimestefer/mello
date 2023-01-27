import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './PageNotFound.css'

function PageNotFound() {
    const user = useSelector(state => state.session.user)

    return (
        <div id='mainContainer'>
            <h1>Page not found</h1>
            {user ? <Link to={`/${user.username.toLowerCase()}/boards`} className='lstd home'>Take me Home!</Link> : <Link className='lstd home' to='/login'>Log in</Link>}
        </div>
    )
}

export default PageNotFound
