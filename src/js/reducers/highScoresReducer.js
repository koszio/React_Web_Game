import {
    SET_HIGHSCORES
} from "../actions/highScoresActions"

/**
 * Reducer for high scores
 */
const highScoresReducer = function(state = {
    highScores: []
}, action) {
    switch(action.type) {

        case SET_HIGHSCORES:
            return Object.assign({}, state, {
                highScores: action.highScores
            })

        default:
            return state
    }
}

export default highScoresReducer