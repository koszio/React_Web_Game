import React from 'react'
import LoaderContainer from '../containers/loaderContainer'

// Single-use styling
const styles = {
    table: {
        fontSize: "20px",
        border: "1px solid black"
    },
    row: {
        border: "1px solid black"
    },
    td: width => ({
        width
    })
}

// High scores component
const HighScoreComponent = ({
    isLoading,
    highScores,
    getHighScores
}) => {

    if (highScores.length === 0) getHighScores()

    return isLoading ? <LoaderContainer/>
    :
    <div className = "flexContainer mainContent">
    <u>Want to be seen here? Log in, and play some games!</u>
    <table style = {styles.table}><tbody>
        <tr>
            <th>#</th>
            <th>Player</th>
            <th>Score</th>
        </tr>
        {highScores
            .map(({name, score}, idx) => 
                <tr style = {styles.row} key = {idx}>
                    <td style = {styles.td(75 )}> {idx + 1} </td>
                    <td style = {styles.td(300)}> {name}    </td>
                    <td style = {styles.td(100)}> {score}   </td>
                </tr>)}
    </tbody></table>
    </div>

}

export default HighScoreComponent