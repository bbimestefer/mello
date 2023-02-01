import React from 'react'
import { NavLink, Route, Switch } from "react-router-dom"
import Boards from '../Board'
import './index.css'

function Home(user) {
    return (
        <div className='homeContainer'>
            <nav className='homeNav'>
                <NavLink className='lstd fwb homeNavButtons' activeClassName='active' exact to={`/${user.username.toLowerCase()}/boards`}>Boards</NavLink>
                {/* <NavLink className='homeNavButtons' to={`/${user.username}/boards/templates`}>Templates</NavLink> */}
            </nav>
            <div className='switchWrapper fdc'>
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
