import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore } from 'redux'
import { push, routerMiddleware, LOCATION_CHANGE } from 'connected-react-router'
import ReduxThunk from 'redux-thunk'
import createRootReducer from './js/reducers/rootReducer'
import { getInLobby } from './js/selectors/gameSessionSelectors'
import {
  didRedirect,
  LOBBY as LOBBYPATH,
  GAME as GAMEPATH,
  RESULTS as RESULTSPATH
} from './js/actions/redirectActions'

/**
 * Configure the redux store in order to use the connected-react-router package
 * https://github.com/supasate/connected-react-router
 */

// The navigation history object (this instance must be connected to the router)
export const history = createBrowserHistory()

const inGamePaths = [LOBBYPATH, GAMEPATH, RESULTSPATH]

// Restrict navigation
const redirectMiddleWare = store => next => action => {
  if (action.type === LOCATION_CHANGE) {
    //console.group("location change")
    const newPath = action.payload.location.pathname
    const inGame = getInLobby(store.getState())

    if (inGamePaths.includes(newPath) && !inGame) {
      store.dispatch(push("/"))
      action = didRedirect(`Cannot navigate to '${newPath}' without being in a game`)
    }
  }
  next(action)
}

export default function configureStore(preloadedState) {

  const middlewares = [
    ReduxThunk,  // this is what allows us to dispatch functions rather than objects
    redirectMiddleWare,
    routerMiddleware(history) // for dispatching history actions
  ]

  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    applyMiddleware(...middlewares)
  )

  return store
}
