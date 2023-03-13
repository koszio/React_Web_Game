import {connect} from 'react-redux'
import HighScoreComponent from '../components/highScoresComponent'
import {getHighScores} from '../selectors/highScoresSelectors'
import {isLoading} from '../selectors/loaderSelectors'
import {getHighScores as getHighScoresAction} from '../actions/highScoresActions'

const mapStateToProps = (state, ownProps) => ({
    isLoading: isLoading(state),
    highScores: getHighScores(state)
      .sort((s1, s2) => s2.score - s1.score)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  getHighScores: () => dispatch(getHighScoresAction())
})

// Container for high scores component
const HighScoreContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HighScoreComponent)

export default HighScoreContainer
