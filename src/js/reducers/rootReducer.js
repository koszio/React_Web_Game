import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import gameSessionReducer from './gameSessionReducer'
import loaderReducer from './loaderReducer'
import redirectReducer from './redirectReducer'
import highScoresReducer from './highScoresReducer'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  redirect: redirectReducer,
  gameSession: gameSessionReducer,
  loader: loaderReducer,
  highScores: highScoresReducer
})

export default createRootReducer
