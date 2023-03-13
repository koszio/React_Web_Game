import React from 'react'
import GeneralButton from './generalButton'

// The welcome screen component
// Main game navigation
const WelcomeComponent = ({
    host,
    join,
    login,
    rejoin,
    quit,
    inGame,
    loggedIn,
    name,
    signout
}) =>
(<div className = "flexContainer mainContent">
    <p>{loggedIn ?
        "Welcome to Everything is Wrong, " + name + "!"
        :
        "Welcome to Everything is Wrong!"}
    </p>
    {inGame ?
      <React.Fragment>
        <GeneralButton navArray={rejoin}/>
        <GeneralButton navArray={quit}/>
      </React.Fragment> :
      <React.Fragment>
        <GeneralButton navArray={join}/>
        <GeneralButton navArray={host}/>
      </React.Fragment>
    }
    {loggedIn ?
      <GeneralButton navArray={["Sign Out", signout]}/> :
      <GeneralButton navArray={login}/>
    }
</div>)

export default WelcomeComponent
