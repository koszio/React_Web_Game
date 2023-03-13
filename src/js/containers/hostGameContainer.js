import {connect} from 'react-redux'
import HostGameComponent from '../components/hostGameComponent'
import {createLobby, setUsername} from '../actions/gameSessionActions'
import {getLoggedIn, getUsername} from '../selectors/gameSessionSelectors'
import {populateNavArray} from '../actions/utilActions'
import {isLoading} from '../selectors/loaderSelectors'

const mapStateToProps = (state, ownProps) => ({
  loggedIn: getLoggedIn(state),
  name: getUsername(state),
  isLoading: isLoading(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  createLobby: (name) => {
    dispatch(setUsername(name))
    return dispatch(createLobby())
  },
  lobby: populateNavArray(ownProps.lobby, dispatch)
})

// Container for host game component
const HostGameContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HostGameComponent)

export default HostGameContainer
