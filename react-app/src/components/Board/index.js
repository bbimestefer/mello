import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBoards } from '../../store/board'
import CreateBoardModal from '../Forms/BoardForms/CreateBoardModal'
import BoardCard from './BoardCard'
import './index.css'

function Boards() {
    const dispatch = useDispatch()
    const [ showForm, setShowForm ] = useState(false)
    const userBoards = useSelector(state => state.boards.userBoards)
    const boards = Object.values(userBoards)

    useEffect(() => {
        dispatch(getAllBoards())
    }, [dispatch])

    const techAndFrame = [
        {name: 'Python', logo: <i className="devicon-python-plain colored"></i>, background: '#306998', link: 'https://www.python.org/'},
        {name: 'Javascript', logo: <i className="devicon-javascript-plain colored"></i>, background: '#323330', link: 'https://www.javascript.com/'},
        {name: 'React', logo: <i className="devicon-react-original"></i>, background: '#88dded', link: 'https://reactjs.org/'},
        {name: 'Redux', logo: <i className="devicon-redux-original"></i>, background: '#764abc', link: 'https://redux.js.org/'},
        {name: 'SQLAlchemy', logo: <i className="devicon-sqlalchemy-plain colored largeLogo"></i>, background: '#DE310B', link: 'https://www.sqlalchemy.org/'},
        {name: 'Flask', logo: <i className="devicon-flask-original colored"></i>, background: 'white', link: 'https://flask.palletsprojects.com/en/2.2.x/'},
        {name: 'HTML', logo: <i className="devicon-html5-plain-wordmark"></i>, background: '#f06529', link: 'https://developer.mozilla.org/en-US/docs/Web/HTML'},
        {name: 'CSS', logo: <i className="devicon-css3-plain colored"></i>, background: '#ebebeb', link: 'https://developer.mozilla.org/en-US/docs/Web/CSS'}
    ]

    if(!boards) return null
    return (
        <div className='fdc g1'>
            <div className='fwb'>
                Your Boards:
            </div>
            <div className='boards fww fdr g1'>
                {boards && boards.map(board => (
                    <BoardCard key={board.id} {...board} />
                ))}
                <div className='createABoard'>
                    <button className='boardListCreate' onClick={() => setShowForm(true)}>Create new board</button>
                    {showForm && <div className='createModalPosition'><CreateBoardModal showForm={showForm} setShowForm={setShowForm}/></div>}
                </div>
            </div>

            <div className='fwb techHeader'>
                Technologies and Frameworks:
            </div>
            <div className='boards fww fdr g1'>
                {techAndFrame && techAndFrame.map((tech, index) => (
                    <a key={index} href={tech.link} target='_blank' rel="noreferrer" className='techTag'>
                        <div id='cardWidth' className={`techCard fdc ${tech.background === 'white' || tech.background === '#ebebeb' ? 'borderForTech' : ''}`} style={{"backgroundColor":`${tech.background}`}}>
                            <span className={`lstd fwb ${tech.background === 'white' || tech.background === '#ebebeb' ? '' : 'cw'}`}>{tech.name}</span>
                            <div className='jcc techLogo'>
                                {tech.logo}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default Boards
