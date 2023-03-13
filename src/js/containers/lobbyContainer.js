import {connect} from 'react-redux'
import LobbyComponent from '../components/lobbyComponent'
import {getPlayerList, getLobbyID, isHost} from '../selectors/gameSessionSelectors'
import {startGameSession} from '../actions/gameSessionActions'

const mapStateToProps = (state, ownProps) => ({
  players: getPlayerList(state),
  lobbyID: getLobbyID(state),
  isHost: isHost(state)
})

const mapDispatchToProps = (dispatch, ownProps) => {
  const gameLabel = ownProps.game[0]
  return {
    game: [gameLabel, () => {
      dispatch(startGameSession())
    }]
  }
}

// Container for lobby component
const LobbyContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LobbyComponent)

export default LobbyContainer
