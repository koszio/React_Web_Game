import {push} from 'connected-react-router'
import {showLoader_front, hideLoader_front} from './loaderActions'
import {
  startNextRound,
  uploadHighscore
} from './gameSessionActions'
import {
  getLoggedIn,
  gameHasEnded,
  getInLobby,
  getRoundCount
} from '../selectors/gameSessionSelectors'
import * as routes from './redirectActions'

/**
 * Get an async action that show and hide the loader, and handle errors.
 * This can be dispatched with the use of the thunk middleware.
 *
 * @param {function} asyncCall - a function that performs an async action
 *     and returns a Promise
 * @param {str} errorMessage - an error message that should help the user
 *    know where the error occured
 */
export const asyncAction = (asyncCall, errorMessage) => {
  return (dispatch, getState) => {
    dispatch(showLoader_front())
    return asyncCall(dispatch, getState)
      .then(/*() => dispatch(hideLoader())*/) //This will hide the loader only when promise is resolved
      .catch(error => {
        throw error; //Throw it again, since we cannot do much for the user to handle the error here!
      })
      .finally(() => dispatch(hideLoader_front())) /* This is executed wether or not the promise is resolved.*/
  }
}

/**
 * Perform something async. Handles errors and the loader (hide/show).
 * This will often be called inside an async action.
 *
 * @param {funciton} dispatch - the dispatch funciton for the redux store
 * @param {function} getState - the getState function for the redux store
 * @param {function} asyncCall - a function that performs an async action
 *     and returns a Promise
 * @param {str} errorMessage - an error message that should help the user
 *    know where the error occured
 */
export const performAsync = (dispatch, getState, asyncCall, errorMessage) => {
  dispatch(showLoader_front())
  return asyncCall(dispatch, getState)
    .then(/*() => dispatch(hideLoader())*/) //This will hide the loader only when promise is resolved
    .catch( error => {
      console.log(errorMessage)
      console.log(error)
    })
    .finally(() => dispatch(hideLoader_front()))
}

/**
 * Convert a navigation array including a button label and a navigation path
 * to a navigation array with a button label and a navigation callback. The
 * callback will push a new page to the browser history (navigate to a new
 * page), but may also do some additional work.
 *
 * @param {array} navArray - a navigation array on the form [label, path] where
 *    path is a path to a page in the application
 * @param {funciton} dispatch - the dispatch funciton for the redux store
 * @param {function} extraWork - this function will be called just after the
 *    navigation to the new page. This parameter is optional.
 */
export const populateNavArray = (navArray, dispatch, extraWork = () => {}) => {
  const [label, path] = navArray
  return [label, () => {
    dispatch(push(path))
    extraWork()
  }]
}


/**
 * The callback for the button on the game component.
 *
 * @param {str} resultsPath - the path to the result page
 */
export const nextCallback = (resultsPath) => {
  return (dispatch, getState) => {
    if (gameHasEnded(getState())) {
      if (getLoggedIn(getState())) dispatch(uploadHighscore())
      dispatch(push(resultsPath))
    } else {
      dispatch(startNextRound())
    }
  }
}

/**
 *
 */
 export const navBackToGame = () => {
   return (dispatch, getState) => {
     const state = getState()
     const nextPath = getInLobby(state) ?
      (getRoundCount(state) > 0 ?
        routes.GAME :
        routes.LOBBY) :
      routes.HOME
     return dispatch(push(nextPath))
   }
 }
