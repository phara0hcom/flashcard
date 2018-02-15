import localforage from "localforage";

localforage.config({
  driver: localforage.WEBSQL, // Force WebSQL; same as using setDriver()
  name: "cardScoreStorage",
  version: 1.0,
  size: 4980736, // Size of database, in bytes. WebSQL-only for now.
  storeName: "keyvaluepairs", // Should be alphanumeric, with underscores.
  description: "OverallScore"
});

// get value
const getKeyValue = key => {
  return new Promise((resolve, reject) => {
    localforage
      .getItem(key)
      .then(value => {
        resolve(value);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// save a key
const saveKey = (key, value) => {
  return new Promise((resolve, reject) => {
    localforage
      .setItem(key, value)
      .then(() => {
        return localforage.getItem(key);
      })
      .then(function(savedValue) {
        resolve(savedValue);
      })
      .catch(function(err) {
        // we got an error
        reject(err);
      });
  });
}

// gets the past score out of the localDB storage
export const getPastScore = (store) => {
    getKeyValue("pastScore")
    .then(pastScore => {
        console.log("Saved Paste", pastScore);
        // if null then store empty score card is saved
        if (!pastScore) {
            saveKey("pastScore", {
                questions_played: 0,
                questions_failed: 0,
                questions_correct: 0
            })
            .then(value => {
                return value;
            })
            .catch(err => {
                console.log("Error", err);
            });
        } else {
            // return pastScrore that was saved in a previous session
            return pastScore;
        }
    })
    .catch(err => {
        console.log("getPastScore Error", err);
    });
};

export const getCardScore = ( state ) => {
    //const index = deck[symbolNr].index;

    getKeyValue(index)
    .then(cardScore => {
        if (!cardScore) {
            deck.map(element => {
                console.log(element.index);

                saveKey(element.index, {
                    questions_played: 0,
                    questions_failed: 0,
                    questions_correct: 0
                })
                .then(value => {
                    console.log("saved", value);
                })
                .catch(err => {
                    console.log("ERROR save", err);
                });
            });

            return { questions_played: 0, questions_failed: 0, questions_correct: 0 };


        } else {
            return cardScore;
        }
    })
    .catch(err => {
        console.log("getCardScore Error", err);
    });
};


export const getAllScores = ( state ) => {
    return new Promise((resolve, reject) => {
        Promise.all([
            getCardScore( state ),
            getPastScore( state )
        ])
        .then( values => {
            console.log("getAllScores values", values);
        })
        .catch( err => {
            console.log("getAllScores ERROR", err);
            reject( err );
        })
    })
}