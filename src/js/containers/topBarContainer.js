import { connect } from 'react-redux'
import TopBarComponent from "../components/topBarComponent"
import { populateNavArray } from '../actions/utilActions'
import { getHighScores } from '../actions/highScoresActions'


const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({
  home: populateNavArray(ownProps.home, dispatch),
  about: populateNavArray(ownProps.about, dispatch),
  highScores: populateNavArray(ownProps.highScores, dispatch, () => {
    dispatch(getHighScores())
  })
})

// Container for top bar component
const TopBarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TopBarComponent)

export default TopBarContainer
