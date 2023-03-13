import React from 'react'
import ErrorContainer from '../containers/errorContainer'
import LoaderContainer from '../containers/loaderContainer'

// Single-use styling
const styles = {
    input: toUpperCase => ({
        margin: "10px",
        textTransform: toUpperCase ? "uppercase" : ""
    })
}

// Join Game component.
// Shown when a player wants to join a game.
const JoinGameComponent = ({
    lobby: [lobbyLabel, lobbyCallback],
    joinLobby,
    loggedIn,
    name,
    isLoading
}) => {
    
const [text, setText] = React.useState("");
const [code, setCode] = React.useState("");
const [myError, setError] = React.useState(null)

return (
<div className = "flexContainer mainContent">
    {isLoading &&
        (<LoaderContainer />)}
    {(myError != null) && <ErrorContainer error={myError}/>}
    Your name:
    {loggedIn ? 
        <b>{name}</b> :
        <input 
            className = "extraMargin"
            style = {styles.input(false)} 
            onChange = {e => setText(e.target.value)} value = {text}/>
    }
    Game link:
    <input 
        className = "extraMargin"
        style = {styles.input(true)}
        onChange = {e => setCode(e.target.value) } 
        value = {code}/>
    <button className = "generalButton"
        onClick = {() => {
            joinLobby(code.toUpperCase(), loggedIn ? name : text)
            .then(lobbyCallback)
            .catch(error => {setError(error)})
        }}>{lobbyLabel}</button>
</div>)}

export default JoinGameComponent