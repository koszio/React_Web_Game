import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router'
import './style/index.css'
import App from './App'
import configureStore, {history} from './configureStore'
import {reconnectToLobby, setLobbyID} from './js/actions/gameSessionActions'
import {getInitState as getInitSessionState} from './js/reducers/gameSessionReducer'
import {push} from 'connected-react-router'

// Load from local storage
const gameSession = JSON.parse(localStorage.getItem("gameSession"))
const initSessionState = getInitSessionState()
const initialState = gameSession ? {
  gameSession: Object.assign(getInitSessionState(), {
    lobbyID: gameSession.currentLobby,
    self: {
      ...initSessionState.self,
      username: gameSession.username,
      hash: gameSession.hash
    }
  })
} : {}


const store = configureStore(initialState)

// Attempt lobby reconnect on user refresh
if (gameSession && gameSession.currentLobby) {
  store.dispatch(reconnectToLobby(
    gameSession.currentLobby, 
    gameSession.playerID,
    () => store.dispatch(setLobbyID(null)),
    () => store.dispatch(push("/"))
  ))
}

// Save in local state
store.subscribe(() => {
  const obj = JSON.stringify({
    username:     store.getState().gameSession.self.username,
    currentLobby: store.getState().gameSession.lobbyID,
    playerID:     store.getState().gameSession.self.playerID,
    hash:         store.getState().gameSession.self.hash
  })
  localStorage.setItem("gameSession", obj)
})

ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
