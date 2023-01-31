import React from 'react'
import { useLocation } from 'react-router-dom'
import github from '../../assets/github.png'
import './Footer.css'

function Footer() {
    const location = useLocation()

    console.log(location)

    if(location.pathname !== '/login' && location.pathname !== '/sign-up') return null
    return (
        <div className='jcc aic lstd footer'>
            <a className='lstd jcc fwb gitLink' target='_blank' href={'https://github.com/bbimestefer'}>
                <img src={github} className='gitImage' />
                GitHub
            </a>
        </div>
    )
}

export default Footer
