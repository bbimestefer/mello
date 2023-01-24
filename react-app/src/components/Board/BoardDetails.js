import React from 'react'
import { useParams } from 'react-router-dom'

function BoardDetails() {
    const { id, boardName } = useParams()

    return (
        <div>
            {id}: {boardName}
        </div>
    )
}

export default BoardDetails
