import React, { useState } from 'react'
import boards from '../../assets/trello_boards.png'
import lists from '../../assets/trello_lists.png'
import cards from '../../assets/trello_cards.png'
import './Features.css'

function Features() {
    const [selected, setSelected] = useState('Boards')
    console.log(selected)
    return (
        <div className='featuresGradient'>
            <div className='featuresContainer'>
                <h1>A productivity workhorse</h1>
                <p className='fs20' style={{'width':'50%'}}>Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who`s doing what and what needs to get done.</p>
                <div className='selectedFeatures fdr'>
                    <div>
                        <div onClick={() => setSelected('Boards')} className={`cur p1 ${selected === 'Boards' && 'activeFeat bColor'}`}>
                            <p className='fwb'>Boards</p>
                            <p>Mello boards keep tasks organized</p>
                        </div>
                        <div onClick={() => setSelected('Lists')} className={`cur p1 ${selected === 'Lists' && 'activeFeat lColor'}`}>
                            <p className='fwb'>Lists</p>
                            <p>The different stages of a task</p>
                        </div>
                        <div onClick={() => setSelected('Cards')} className={`cur p1 ${selected === 'Cards' && 'activeFeat cColor'}`}>
                            <p className='fwb'>Cards</p>
                            <p>Cards represent tasks and ideas and hold all the information to get the job done.</p>
                        </div>
                    </div>
                    <div>
                        <img  alt='Boards' src={selected === 'Boards' ? boards : selected === 'Lists' ? lists : cards} className='featureImage' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features
