import React from 'react'
import { NavLink, Route, Switch } from "react-router-dom"
import Boards from '../Board'
import './index.css'

function Home(user) {
    return (
        <div className='homeContainer'>
            <nav className='homeNav'>
                <NavLink className='homeNavButtons' exact to={`/${user.username}/boards`}>Boards</NavLink>
                {/* <NavLink className='homeNavButtons' to={`/${user.username}/boards/templates`}>Templates</NavLink> */}
            </nav>
            <div className='switchWrapper'>
                <Switch>
                    <Route exact path='/:username/boards'>
                        <Boards />
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default Home
