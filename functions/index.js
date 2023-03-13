//run in "npm install --save request" & "npm install --save request-promise" in this folder.
//More documentation here: https://github.com/request/request-promise
const functions = require('firebase-functions');
const rp = require('request-promise')   

//Run "npm install clarifai" in this folder
const Clarifai = require('clarifai'); //require the client
const gameRoundGen = require('./gameRoundGen');

//Run "firebase deploy --only functions" in the root functions folder to deploy functions

// Functions here are not available in the program necessarily
// They are just written here and the exported to Firebase


/* HARDCODED. TODO: CHANGE TO MORE DYNAMIC */
const IMAGES = {
    FOOD:       'FoodPorn',
    BEARS:      'bears',
    CARS:       'carporn',
    DOGS:       'dogpictures',
    CATS:       'cat',
    PLANTS:     'plants'
};

const MODELS = {
    "MODEL_MODERATION":     Clarifai.MODERATION_MODEL,
    "MODEL_FOOD":           Clarifai.FOOD_MODEL
};

//imgur client ID
const imgur_client_id = functions.config().imgur.id

//Clarifai app
const clarifai_app = new Clarifai.App({
    apiKey: functions.config().clarifai.key
});

//Returns random default data if clarifai has failed.
const default_data = (images) => {
    const concepts = ["Gore", "Drug", "Explicit", "Suggestive", "Safe"]
    var outputs = []
    outputs["data"]["concepts"] = Array.from(images.map(() => ({name : concepts[Math.floor(Math.random() * concepts.length)], 
                                                                value : Math.random()} )))/**generate concept array with objects containing conceptName and probValue*/
    return outputs;
};


const choice = arr => arr[Math.floor(Math.random() * arr.length)]

//=================================
//When a new game round starts, "when game-round changes", make a call to imgur API and choose.abs
//This would've worked if we pay-to-win
//https://firebase.google.com/docs/functions/database-events#handle_event_data
exports.UPDATE_IMAGES = functions.database.ref('/lobbies/{lobbyID}/gameInfo/round')
.onUpdate((change, context) => {
    if(!change.before.exists()){
        return null;
    }
    const curr_round = change.before.val(); //round in index format

    const gameInfo_ref = change.before.ref.parent; //ref to ".../gameInfo/" 

    //Get a promise containing images and subreddit.
    const myFunction = () => {
        //console.log(snapshot.child("images").val());
        return new Promise(function pr(resolution, rejection){
            gameInfo_ref.once('value', snapshot => {
                if(snapshot.child("images").val() === null){
                    //console.log("invalid!");
                    setTimeout(() => pr(resolution, rejection), 1000); //Wait a while
                }
                else{
                    //Rest of the code.
                    //console.log("Valid!");
                    const images = snapshot.child("images").val().slice(curr_round * 3, curr_round * 3 + 3); //empty array to be filled
                    const subreddit = snapshot.child("types").val()[curr_round];
                    const model = MODELS[subreddit === IMAGES.FOOD ? 
                    choice(Object.keys(MODELS).filter(key => key !== "MODEL_FOOD")):choice(Object.keys(MODELS))
                    ];
        
                    resolution(clarifai_app.models.predict(model, images)
                    .then(response => response)
                    .then(result => {
                        var data = result.outputs;
                
                        //Call to generate prompts and scores
                        if(data === "undefined"){
                            data = default_data(images);
                        }
                        const roundInfo = gameRoundGen.generatePromptAndScores({
                            modelType: model,
                            imageType: subreddit,
                            modelOutputs: data,
                            images: images
                        });
                        //return change.after.ref.parent.child("images").set(images); //update the database.
                        return change.after.ref.parent.child("roundInfo").set(roundInfo)
                                .then(() => change.after.ref.parent.child("isLoading").set(0));
                    })
                    .catch(error => console.log(error.message))); //Probably return some error
                }
            });
        });
        
    };
    return myFunction();
});


//Cleanup. Delete a lobby if it has no players left.
exports.CLEANUP = functions.database.ref("/lobbies/{lobbyID}/players/")
.onDelete(snapshot => {
    //console.log(snapshot.ref.parent.toJSON());
    //console.log(snapshot.ref.parent.parent.toJSON());
    if (Object.keys(snapshot.val).length < 1) {
        return snapshot.ref.parent.remove();
    } else{
        return null;
    }
})

//When creating a lobby, add a timestamp to it:
exports.ADD_TIMESTAMP = functions.database.ref("/lobbies/{lobbyID}")
.onCreate((snapshot, context) => {
    var ref = snapshot.ref.parent; //ref to "/lobbies/"
    var date_now = Date.now();

    var cutoff_date = date_now - 2 * 60 * 60 * 1000; //our cutoff is anything newer than two hours. idk
    var toUpdate = ref.orderByChild('timestamp').endAt(cutoff_date); //Keep everything older than two hours.
    var updates = {}; //Contains all the updates
    updates[context.params.lobbyID + "/timestamp"] = date_now; //timestamp on the newly created lobby with current date
        
    return toUpdate.once('value', function(snapshot_toUpdate){
        snapshot_toUpdate.forEach(function(child) { //Go through every element to be deleted.
            if(child.key !== context.params.lobbyID){
                updates[child.key] = null
            }
        });
        return ref.update(updates);
    });
})



//Function to add images when lobby/gameInfo is created.
exports.ADD_IMAGES = functions.database.ref("/lobbies/{lobbyID}/gameInfo")
.onCreate((snapshot, context) => {
    const num_rounds = 10;
    const num_images = 3;


    var requestOptions = {
        uri: null,
        method: 'GET',
        headers: {'Authorization': imgur_client_id},
        redirect: 'follow',
        json: true // Automatically parses the JSON string in the response
    };

    var images      = []    //image array
    var subreddits  = []    //subreddit array
    var promises    = []    //empty promise array
    var updates = {}; //object to contain all updates to be made

    for(let i = 0; i < num_rounds; i++){
        subreddits.push(IMAGES[choice(Object.keys(IMAGES))]);
        requestOptions.uri = 'https://api.imgur.com/3/' + 'gallery/r/' + subreddits[i] + '/top/all';
        promises.push(rp(requestOptions)
        .then(result => result.data.filter(d => d.type === "image/jpeg")) //filter out images
        .then(data => {
            var imgs = []
            for (let j = 0; j < num_images; j++) {
                imgs[j] = data.splice(Math.floor(Math.random() * data.length), 1)[0].link;
                //console.log(i*num_images + j)
            }
            //console.log(subreddit);
            return Promise.resolve(imgs)
        })
        .catch(error => console.log(error))
        )
    }

    return Promise.all(promises)
        .then(result =>{
            
                //Loop through result:
                for(let i = 0; i < num_rounds; i++){
                    images.push(...result[i]);
                }
                updates["/images"] = images;
                updates["/types"] = subreddits;

                return snapshot.ref.update(updates); //change.after.ref.parent.child("roundInfo").set(roundInfo)
        })
        .catch(error => console.log(error));
});
