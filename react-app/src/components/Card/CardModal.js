import React from 'react'
import './CardModal.css'

function CardModal(card) {
    return (
        <div className='cardInfoContainer'>
            {card.name}
        </div>
    )
}

export default CardModal
