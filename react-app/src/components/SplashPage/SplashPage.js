import React from 'react'
import './SplashPage.css'

function SplashPage() {
    return (
        <div className='fdc ic g1 border'>
            <div className='header jcsa fdr aic'>
                <div className='fdc jcc'>
                    <div id='line1'></div>
                    <h1 className='jcc aic'>Welcome to Mello!</h1>
                    <div id='line2'></div>
                </div>
                <img alt='home' className='homeImage' src='https://images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=1140&fm=webp'/>
            </div>
            <div className='jcc fdc g1' style={{"height":"10em"}}>
                <div id='line1'></div>
                <div id='line2'></div>
            </div>
        </div>
    )
}

export default SplashPage
