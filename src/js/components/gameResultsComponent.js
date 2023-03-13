import React from 'react'
import ReactList from 'react-list'
import GeneralButton from './generalButton'

// Game results component
const GameResultsComponent = ({
    scores,
    quit
}) =>

(<div className = "flexContainer mainContent">
    {scores && scores.length > 0 ?
        <>
        <p className = "bigFont">The winner is <b>{scores[0].name}</b>!</p>
        {/** Third-party generic presentational component */}
        <ReactList
            itemRenderer = {(index, key) => {
                const {name, score} = scores[index]
                return <p key = {key} className = "bigFont">
                    {name}: <b>{score}</b>
                </p>}}
            length = {scores.length}
        /></>
        :
        <p>Trying to reconnect...</p>
    }
    <GeneralButton navArray={quit}/>
</div>)

export default GameResultsComponent
