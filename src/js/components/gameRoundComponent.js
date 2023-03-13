import React from 'react'
import {ImageStyle, ImageBoxStyle, ImageWrapper} from '../styledComponents/ImageBox';
import LoaderContainer from '../containers/loaderContainer';

const GameRoundComponent = ({
    nextLabel,      // label for "next" button (results or next round)
    nextCallback,   // callback for "next" button
    nextDisabled,   // disables (or not) "next button"
    round,          // which round is it?
    answerOptions,  // the answer options (images, correct, etc.)
    question,       // the question to be displayed
    answers,        // the answers from all the other players
    answerCallback, // what should happen when a player clicks on an answer?
    showResults,    // should the results for the round be shown?
    canAnswer,      // is the player allowed to answer, or have they made their choice?
    isLoading,      // checks if the loader should be displayed
    roundReason,    // the reason a certain choice was correct
    isHost,         // Checks if the user is host
    unreadyPlayers, // Checks what players have not answered
    kickUnready     // Kicks out unready players
}) => {

const [choice, setChoice] = React.useState(null)
// For kicking out players (disconnect handling)
const [override, setOverride] = React.useState(false)

return (
    <div className = "flexContainer mainContent">
    {isLoading &&
        (<LoaderContainer />)}
    <div align = "center">

    {round ?
      (<p align = {"center"}>
        <b>Round {round}/10: </b> {isLoading ? (<b>Loading...</b>) : question}
      </p>) :
      round === 0 ?
        (<p align = {"center"}>
          Wait until the host starts the game
        </p>) :
        (<p align = {"center"}>
          Trying to reconnect...
        </p>)
    }
    {<ImageWrapper>
        {answerOptions.map(
            ({image, correctAnswer}, index) =>
            <div key = {index}><figure>
                <ImageBoxStyle
                    blocked={!canAnswer}
                    reveal={showResults}
                    correct={correctAnswer}
                    selected={!canAnswer && choice === index}
                    onClick = {canAnswer ?
                        () => {setChoice(index); answerCallback(index, correctAnswer)} :
                        () => {}}
                >
                <ImageStyle
                    transparent = {showResults && choice !== index} //If we want to show results
                    src = {image}
                    /*height = {"300px"}*/
                    alt = {"Sorry, we couldn't show the image!"}
                >
                </ImageStyle>
                </ImageBoxStyle>
            </figure>
            {showResults ?
                <div key = {index}>
                <p>{
                correctAnswer && answers[index].length > 1 ?
                "And the winners are..." :
                correctAnswer && answers[index].length === 1 ?
                "And the winner is..." :
                correctAnswer ?
                "This is the correct answer, Everyone is Wrong!" : ""
                }</p>
                {answers[index].map(({name}, plIndex) =>
                <p key = {index + 3 * plIndex}>
                    {name}
                </p>
                )}
                </div>
            :null}
            </div>
        )}
    </ImageWrapper>}

    {showResults ?
        <div>
            <i>Why is that the correct answer?</i> {roundReason}
            {answers.map((list, index1) =>
            list.map(({name, score}, index2) =>
                <p key = {index1 + 3 * index2 /** Constant 3 ensures no clashes */ }>
                    <b>{name}</b> has <b>{score}</b> points</p>
            ))}
        </div>
        :
    null}
    {override ?<u>Click again to kick players who haven't answered out</u> : null}
    <div>
        <button 
        className = "generalButton" 
        onClick={() => {
            if (!override && isHost && nextDisabled) {
                setOverride(true)
            } else if (override) {
                kickUnready(unreadyPlayers)
                nextCallback()
                setOverride(false)
            } else {
                nextCallback()
            }
        }} 
        disabled={nextDisabled && !isHost}>{nextLabel}</button>
    </div>
</div></div>)}


export default GameRoundComponent
