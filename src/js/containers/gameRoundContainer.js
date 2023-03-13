import {connect} from 'react-redux'
import GameRoundComponent from '../components/gameRoundComponent'
import {answerQuestion, kickPlayer} from '../actions/gameSessionActions'
import {nextCallback} from '../actions/utilActions'
import {
  getPlayerAnswers,
  getGameInfo,
  getRoundCount,
  getAnswerOptions,
  getQuestion,
  getRoundReason,
  allPlayersReady,
  allPlayersHaveAnswered,
  getHaveAnswered,
  gameHasEnded,
  isHost,
  getUnreadyPlayers
} from '../selectors/gameSessionSelectors'
import {isLoading} from '../selectors/loaderSelectors'

const mapStateToProps = (state, ownProps) => ({
  // See gameRoundComponent
  gameInfo: getGameInfo(state),
  answers: getPlayerAnswers(state),
  canAnswer: !getHaveAnswered(state),
  showResults: allPlayersHaveAnswered(state),
  round: getRoundCount(state),
  answerOptions: getAnswerOptions(state),
  question: getQuestion(state),
  nextDisabled: !allPlayersReady(state),
  nextLabel: gameHasEnded(state) ? ownProps.results[0] : "Next Question",
  isLoading: isLoading(state),
  roundReason: getRoundReason(state),
  isHost: isHost(state),
  unreadyPlayers: getUnreadyPlayers(state)
})

const mapDispatchToProps = (dispatch, ownProps) =>  ({
  answerCallback: (answerOption, correct) => {
    dispatch(answerQuestion(answerOption, correct))
  },
  nextCallback: (answers) => dispatch(nextCallback(ownProps.results[1], answers)),
  kickUnready: players => players.forEach(player => {
    if (player.playerID !== "host") dispatch(kickPlayer(player))
  })
})

// Container for the game round component
const GameRoundContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GameRoundComponent)

export default GameRoundContainer
