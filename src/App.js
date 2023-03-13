import React from 'react';
import './style/App.css';
import WelcomeContainer     from './js/containers/welcomeContainer'
import AboutContainer       from './js/containers/aboutContainer'
import LobbyContainer       from './js/containers/lobbyContainer'
import JoinGameContainer    from './js/containers/joinGameContainer'
import HostGameContainer    from './js/containers/hostGameContainer'
import GameRoundContainer   from './js/containers/gameRoundContainer'
import GameResultsContainer from './js/containers/gameResultsContainer'
import HighScoresContainer  from './js/containers/highScoresContainer'
import TopBarContainer      from './js/containers/topBarContainer'
import LoginContainer       from './js/containers/loginContainer'
import {
  Switch,
  Route
} from "react-router-dom"
import * as routes from './js/actions/redirectActions'
function App() {

  const aboutNav  = ["About",                   routes.ABOUT]
  const homeNav   = ["Home",                    routes.HOME]
  const lobbyNav  = ["Go to game session",      routes.LOBBY]
  const joinNav   = ["Join game session",       routes.JOIN]
  const hostNav   = ["Host game session",       routes.HOST]
  const gameNav   = ["Start game",              routes.GAME]
  const resultsNav= ["Results",                 routes.RESULTS]
  const hsNav     = ["High Scores",             routes.HISGH_SCORES]
  const loginNav  = ["Log in / Create account", routes.LOGIN]
  const quitGame  = ["Quit game",               routes.HOME]

  // Main screen
  return (
    <div>
      <div>
        <TopBarContainer home={homeNav} about={aboutNav} highScores={hsNav}/>
      </div>
      <div>
        <Switch>
          <Route path={routes.ABOUT}>
            <AboutContainer/>
          </Route>
          <Route path={routes.HOST}>
            <HostGameContainer
              lobby={lobbyNav}
            />
          </Route>
          <Route path ={routes.JOIN}>
            <JoinGameContainer
              lobby={lobbyNav}
            />
          </Route>
          <Route path={routes.LOBBY}>
            <LobbyContainer
              game={gameNav}
            />
          </Route>
          <Route path={routes.GAME}>
            <GameRoundContainer
              results={resultsNav}
            />
          </Route>
          <Route path={routes.RESULTS}>
            <GameResultsContainer quit={quitGame}/>
          </Route>
          <Route path={routes.HISGH_SCORES}>
            <HighScoresContainer/>
          </Route>
          <Route path ={routes.LOGIN}>
            <LoginContainer
              home={homeNav}
            />
          </Route>
          <Route path={routes.HOME}>
            <WelcomeContainer
              join={joinNav} host={hostNav}
              login={loginNav} quit={quitGame}
            />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
