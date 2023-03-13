import React from 'react'
import dab from '../../style/dab.jpg'

// Component for the About page.
const AboutComponent = () => (
  <div className = "flexContainer mainContent">
    <h1>About Everything is Wrong</h1>
    <p> 
      Everything is Wrong is a multiplayer game. 
      Anyone can host a game, and then anyone can join the game. 
      It is, by far, the best game ever made.
    </p>
    <img src = {dab} alt = "DAB" width = {100}></img>
    <p>
      Once the game starts, the players will be presented with a set of images and a question ("prompt") to go with them. 
      The players will choose an image as their answer to the prompt. If the player is correct, they get a point. 
      The game goes on for some amount of rounds, and then has one (or several) winners.
    </p>
    <p> 
      The images are fetched from the Imgur API. 
      This is where the title, "Everything is Wrong", comes into play. 
      The images fetched are of a certain category, such as images of food, bears or cars. 
      These images are then fed into a Clarifai image recognition model API that is intentionally chosen to not match the image category. 
      If the category of the images is bears, they might be sent to an image recognition model for food. 
      This model might find some partial matches; it could detect some lemon or some coffee in the image of the bear. 
      From these results the question is generated.
    </p>
    <p>
      The questions might seem arbitrary and somewhat impossible to answer with any sort of accuracy. 
      This is the point of the game. 
      It's not supposed to be a serious multiplayer experience, but rather a fun party-game type of experience.
      Want to be seen in the high scores? Remember to log in!
    </p>
  </div>
)

export default AboutComponent
