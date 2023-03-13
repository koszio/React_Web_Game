import {connect} from 'react-redux'
import GameResultsComponent from '../components/gameResultsComponent'
import {getPlayerListSorted} from '../selectors/gameSessionSelectors'
import {populateNavArray} from '../actions/utilActions'
import {leaveLobby} from '../actions/gameSessionActions'

const mapStateToProps = (state, ownProps) => ({
  scores: getPlayerListSorted(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  quit: populateNavArray(ownProps.quit, dispatch, () => dispatch(leaveLobby()))
})

// Container for game results component
const GameResultContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GameResultsComponent)

export default GameResultContainer
