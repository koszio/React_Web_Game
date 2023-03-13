import { DID_REDIRECT } from '../actions/redirectActions'
import { LOCATION_CHANGE } from 'connected-react-router'


const getInitState = () => ({
  didRedirect: false,
  message: ""
})

/**
 * Reducer handling permitted navigation.
 */
const redirectReducer = function(state = getInitState(), action) {
  switch (action.type) {
    case DID_REDIRECT:
      console.log(`Redirection: ${action.error}`)
      return Object.assign({}, state, {
        didRedirect: true,
        message: action.error
      })
    case LOCATION_CHANGE:
      return getInitState()
    default:
      return state
  }
}

export default redirectReducer
