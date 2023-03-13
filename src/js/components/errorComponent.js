import React from 'react'

const styles = {
    color: "red"
}

// Used to display errors to the user.
const ErrorComponent = ({
    error
}) => (<div style = {styles}>
    {error.message}
</div>)

export default ErrorComponent