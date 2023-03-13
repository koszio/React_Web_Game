import {
  SET_USERNAME,
  SET_USERHASH,
  INIT_GAME_SESSION,
  SET_PLAYERS,
  SET_PLAYER_ID,
  SET_GAME_INFO,
  SET_LOBBY_ID,
  MODIFY_PLAYER,
  DELETE_PLAYER,
  SET_UNSUBSCRIBE,
  RESET_GAME_SESSION,
  SET_SCORE,
  SET_HAVE_ANSWERED,
  RESET_USERHASH
} from '../actions/gameSessionActions'

export const getInitState = () => ({
  lobbyID: null,
  players: null,
  self: {
    playerID: null,
    username: null,
    score: 0,
    status: null,
    hash: null
  },
  gameInfo: null,
  haveAnswered: false,
  unsubscribe: () => {}
})

/**
 * Reducer handling the gameSession part of the state and all actions to it
 */
const gameSessionReducer = function(state = getInitState() , action) {

    switch(action.type) {

        case SET_USERNAME:
            return action.newName === state.self.username ?
              state :
              Object.assign({}, state, {
                self: Object.assign({}, state.self, {
                  username: action.newName
                })
              })

        case SET_USERHASH:
          // Hash function one-liner source:
          // https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
          const hashCode = s => s.split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0)
          return Object.assign({}, state, {
            self: Object.assign({}, state.self, {
              hash: hashCode(action.name + action.pass)
            })
          })
        
        case RESET_USERHASH:
          return Object.assign({}, state, {
            self: Object.assign({}, state.self, {
              hash: null
            } )
          })

        case SET_SCORE:
            return Object.assign({}, state, {
              self: Object.assign({}, state.self, {
                score: action.newScore
              })
            })

        case SET_HAVE_ANSWERED:
            return Object.assign({}, state, {
              haveAnswered: action.answered
            })

        case INIT_GAME_SESSION:
            const player = action.lobby.players[action.playerID]
            return Object.assign({}, state, {
              players: action.lobby.players,
              lobbyID: action.lobby.lobbyID,
              gameInfo: action.lobby.gameInfo,
              self: Object.assign({}, state.self, {
                playerID: action.playerID,
                score: player.score
              }),
              settings: action.lobby.settings
            })

        case RESET_GAME_SESSION:
            const newState = getInitState()
            return Object.assign(newState, {
              self: Object.assign(newState.self, {
                username: state.self.username,
                hash: state.self.hash
              })
            })

        case SET_PLAYERS:
            return Object.assign({}, state, {
              players: action.newPlayers
            })

        case SET_PLAYER_ID:
            return Object.assign({}, state, {
              self: Object.assign({}, state.self, {
                playerID: action.newID
              })
            })

        case SET_GAME_INFO:
            if (state.gameInfo === null) return state
            const updateObj = action.newGameInfo.round !== state.gameInfo.round ?
              {gameInfo: action.newGameInfo, haveAnswered: false} :
              {gameInfo: action.newGameInfo}
            return Object.assign({}, state, updateObj)

        case SET_LOBBY_ID:
            return Object.assign({}, state, {
              lobbyID: action.newID
            })

        case MODIFY_PLAYER:
            return Object.assign({}, state, {
              players: Object.assign({}, state.players, {
                [action.playerID]: action.player
              })
            })

        case DELETE_PLAYER:
            const newPlayers = Object.assign({}, state.players)
            delete newPlayers[action.playerID]
            return Object.assign({}, state, {
              players: newPlayers
            })

        case SET_UNSUBSCRIBE:
            return Object.assign({}, state, {
              unsubscribe: action.unsubscribe
            })

        default:
            return state
    }
}

export default gameSessionReducer
