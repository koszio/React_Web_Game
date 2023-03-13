import {createSelector} from 'reselect'

const available = state => state.highScores.available
const highScores = state => state.highScores.highScores

export const getAvailable = createSelector(
    [available],
    available => available
)

export const getHighScores = createSelector(
    [highScores],
    highScores => highScores
)