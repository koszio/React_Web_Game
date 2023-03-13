import React from 'react'
import LoaderContainer from '../containers/loaderContainer'

/**
 * Login screen 
 */
const LoginComponent = ({
    login: [loginLabel, loginNav],
    finalize_login_callback,
    isLoading
}) => {

    const [name, setName] = React.useState("")
    const [pass, setPass] = React.useState("")
    // Enables/disable password censoring
    const [type, setType] = React.useState("password")

    return (<div className = "flexContainer">
    {isLoading &&
        (<LoaderContainer />)}
        Your username: <input
            className = "extraMargin"
            onChange = {e => setName(e.target.value)}
            value = {name}
        />
        Your password: <input 
            className = "extraMargin"
            type = {type}
            onChange = {e => {
                setPass(e.target.value)
                setType("password")
            }}
            value = {pass}
        />
        <button className = "generalButton"
            color = 'orchid'
            onClick = {() => {
                const validName = name.length > 0
                const validPass = pass.length > 0

                if (validName && validPass) {
                    finalize_login_callback(name, pass)
                    loginNav()
                }
                
                if (!validName) setName("At least one character!")
                if (!validPass) {
                    setPass("At least one character!")
                    setType("")
                }
            }}
        >{loginLabel}</button>
    </div>)
}

export default LoginComponent