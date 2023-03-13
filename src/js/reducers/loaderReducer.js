import {HIDE_LOADER,
        SHOW_LOADER, 
        SHOW_LOADER_FRONT,
        HIDE_LOADER_FRONT} from '../actions/loaderActions'

/**
 * Reducer handling loads in the app. Is something loading or not?
 */
const loaderReducer = function(state = {
  isLoading: false,
  isLoading_front: false
}, action) {
  switch (action.type) {
    case HIDE_LOADER:
      return Object.assign({}, state, {
        isLoading: false
      })
    case SHOW_LOADER:
      return Object.assign({}, state, {
        isLoading: true
      })
    case SHOW_LOADER_FRONT:
      return Object.assign({}, state, {
        isLoading_front: true
    })
    case HIDE_LOADER_FRONT:
      return Object.assign({}, state, {
        isLoading_front: false
    })
    default:
      return state
  }
}

export default loaderReducer
