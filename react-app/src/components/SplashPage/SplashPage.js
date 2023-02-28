import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './SplashPage.css'

function SplashPage() {
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    if(user) history.push(`/${user.username.toLowerCase()}/boards`)

    return (
        <div className='fdc ic g1 border'>
            <div className='header jcsa fdr aic'>
                <div className='fdc jcc aic'>
                    <div id='line1'></div>
                    <h1 className='jcc aic'>Welcome to Mello!</h1>
                    <div className='aic jcc fs18' style={{"paddingBottom":"2em"}}>
                        Mello brings all your tasks and tools together.
                        Keep everything in the same place!
                    </div>
                    <div id='line2'></div>
                </div>
                <img alt='home' className='homeImage' src='https://images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=1140&fm=webp'/>
            </div>

        </div>
    )
}

export default SplashPage
