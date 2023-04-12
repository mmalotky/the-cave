import TestLevel, { checkCoordsTestLevel } from "./TestLevel";
import TestLevel2, { checkCoordsTestLevel2 } from "./TestLevel2";

//return map information from coordinates based on level
export function checkCoords(level, x, y) {
    switch(level) {
        case "Test":
            return checkCoordsTestLevel(x, y);
        case "Test2":
            return checkCoordsTestLevel2(x, y);
    }
}

//return a message that is displayed by a map feature
export function getMessage(level, key) {
    let messageList = [];
    let index = key - 3;
    
    switch(level) {
        case "Test":
            messageList = [
                "Not Here",
                "Wrong Castle"
            ]
            break;
        case "Test2":
            messageList = [

            ]
            break;
    }

    return messageList[index];
}

//sets the player's starting coordinates for a level
export function startingCoords(level) {
    switch(level) {
        case "Test":
            return {x:8, y:8};
        case "Test2":
            return {x:30, y:14};
    }
}

//return the background wallpaper element for the level
function LevelLoader({level}) {
    switch(level) {
        case "Test":
            return <TestLevel/>;
        case "Test2":
            return <TestLevel2/>;
    }
}

export default LevelLoader;