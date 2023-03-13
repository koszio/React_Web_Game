import React from 'react'
import ReactList from 'react-list'

// Lobby component
// What the player, and host, see when waiting to start a game
const LobbyComponent = ({
    players,
    lobbyID,
    isHost,
    game: [gameLabel, gameCallback],
}) =>
(<div className = "flexContainer mainContent">
    {isHost && <button className = "generalButton" onClick =  {gameCallback}>{gameLabel}</button>}
    <b className = "bigFont">Game code: {lobbyID}</b>
    <p className = "bigFont">Players:</p>
    {/** Third-party generic presentational component */}
    <ReactList
        itemRenderer = {(index, key) => {
            const {playerID, name} = players[index]
            return <p key = {key} className = {playerID + " bigFont"}>
                {name}
            </p>}}
        length = {players.length}
    />
</div>)

export default LobbyComponent
