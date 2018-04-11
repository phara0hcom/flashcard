import localforage from "localforage";
import { returnDeck } from "./card.decks";

localforage.config({
  driver: localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
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
};

// save a key
export const saveKey = (key, value) => {
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
};

// gets the past score out of the localDB storage
export const getPastScore = () => {
  return new Promise((resolve, reject) => {
    console.log("getPastScore Function ");
    getKeyValue("pastScore")
      .then(pastScore => {
        console.log("Saved Paste", pastScore);
        // if null then store empty score card is saved
        if (!pastScore) {
          saveKey("pastScore", {
            questions_failed: 0,
            questions_correct: 0
          })
            .then(value => {
              resolve(value);
            })
            .catch(err => {
              console.log("Error", err);
              reject(err);
            });
        } else {
          // return pastScrore that was saved in a previous session
          resolve(pastScore);
        }
      })
      .catch(err => {
        console.log("getPastScore Error", err);
        reject(err);
      });
  });
};

//get the CardScore from the localforage from the state
export const getCardScore = state => {
  console.log(" getCardScore state", state);
  return new Promise((resolve, reject) => {
    const index = state.symbolObj.index;
    getKeyValue(index)
      .then(cardScore => {
        if (!cardScore) {
          saveKey(index, {
            questions_failed: 0,
            questions_correct: 0
          })
            .then(value => {
              console.log("saved", value);
              resolve(value);
            })
            .catch(err => {
              console.log("ERROR save", err);
              reject(err);
            });
        } else {
          resolve(cardScore);
        }
      })
      .catch(err => {
        console.log("getCardScore Error", err);
        reject(err);
      });
  });
};

export const getSettings = stateSettings => {
  return new Promise((resolve, reject) => {
    getKeyValue("appSettings")
      .then(settings => {
        if (!settings) {
          saveKey("appSettings", stateSettings)
            .then(value => {
              console.log("getSettings >> saveKey Saved", value);
              resolve(value);
            })
            .catch(err => {
              console.log("ERROR getSettings >> saveKey", err);
              reject(err);
            });
        } else {
          console.log("getSettings >> settings", {
            ...stateSettings,
            settings
          });
          resolve({ ...stateSettings, settings });
        }
      })
      .catch(err => {
        console.log("ERROR getSettings", err);
        reject(err);
      });
  });
};

//getAll scores
export const getAllScores = state => {
  return Promise.all([getPastScore(state), getCardScore(state)])
    .then(values => {
      console.log("getAllScores", values);
      return {
        pastScore: values[0],
        cardScore: values[1]
      };
    })
    .catch(err => {
      console.log("getAllScores ERROR", err);
      return err;
    });
};

export const updateCardScore = (state, corrAnswerd) => {
  const index = state.symbolObj.index;
  let CardScore = state.cardScore;
  console.log("updateCardScore >> CardScore", CardScore);
  console.log("updateCardScore >> corrAnswerd", corrAnswerd);

  if (corrAnswerd) {
    CardScore = {
      ...CardScore,
      questions_correct: CardScore.questions_correct + 1
    };
  } else {
    CardScore = {
      ...CardScore,
      questions_failed: CardScore.questions_failed + 1
    };
  }

  saveKey(index, CardScore)
    .then(value => {
      console.log("updateCardScore >> saveKey", value);
    })
    .catch(err => {
      console.log("updateCardScore >> saveKey", err);
    });
};
