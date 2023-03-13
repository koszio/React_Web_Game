import React from 'react'

const GeneralButton = ({
    navArray: [label, callback]
}) =>
(<button className = "generalButton"
    onClick = {callback}>
    {label}
</button>)

export default GeneralButton
