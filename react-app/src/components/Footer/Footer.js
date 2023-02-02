import React from 'react'
import { useLocation } from 'react-router-dom'
import github from '../../assets/github.png'
import linkedIn from '../../assets/linkedIn-logo.png'
import './Footer.css'

function Footer() {
    const location = useLocation()
    if(location.pathname !== '/login' && location.pathname !== '/sign-up' && location.pathname !== '/') return null
    return (
        <div className='jcc aic lstd footer g1'>
            <a className='lstd jcc fwb gitLink' rel="noreferrer" target='_blank' href={'https://github.com/bbimestefer'}>
                <img alt='gitLogo' src={github} className='logo' />
                GitHub
            </a>
            <a className='lstd jcc fwb gitLink' rel="noreferrer" target='_blank' href={'https://www.linkedin.com/in/brandon-bimestefer-a01924250/'}>
                <img alt='linkedInLogo' src={linkedIn} className='logo' />
                LinkedIn
            </a>
        </div>
    )
}

export default Footer
