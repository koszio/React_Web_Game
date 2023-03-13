import React from 'react'
import ErrorContainer from '../containers/errorContainer'
import LoaderContainer from '../containers/loaderContainer'

// Host Game component.
// This is where a user starts a game by hosting it.
const HostGameComponent = ({
    lobby: [lobbyLabel, lobbyCallback],
    createLobby,
    loggedIn,
    name,
    isLoading
}) => {

    const [text, setText] = React.useState("")
    const [myError, setError] = React.useState(null)
    
    return (<div className = "flexContainer mainContent">
        {isLoading &&
        (<LoaderContainer />)}

        {(myError != null) &&
        <ErrorContainer error={myError}/>}

        Your name: 
        {loggedIn ? 
            <b>{name}</b> :
            <input 
            className = "extraMargin"
            onChange = {e => setText(e.target.value)} 
                value={text}>
            </input>
        }
        <button className = "generalButton"
        onClick = {() => {
            createLobby(loggedIn ? name : text)
            .then(val => {lobbyCallback()})
            .catch(error => {setError(error)})
        }}>
            {lobbyLabel}
        </button>
    </div>
    )
}

export default HostGameComponent