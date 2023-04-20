import TestLevel, { checkCoordsTestLevel } from "./TestLevel";
import TestLevel2, { checkCoordsTestLevel2 } from "./TestLevel2";

//return map information from coordinates based on level
export function checkCoords(level, x, y) {
    switch(level) {
        case "Test":
            return checkCoordsTestLevel(x + 34, y + 42);
        case "Test2":
            return checkCoordsTestLevel2(x + 34, y + 42);
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
                "Wrong Castle",
                "\"Nothing\" is here"
            ]
            break;
        case "Test2":
            messageList = [
                "Thanks For Playing"
            ]
            break;
    }

    return messageList[index];
}

//sets the player's starting coordinates for a level
export function startingCoords(level) {
    switch(level) {
        case "Test":
            return {x:-7, y:0};
        case "Test2":
            return {x:14, y:6};
    }
}

//messages to display at the beginning of a level
export function startingMessage(level) {
    switch(level) {
        case "Test":
            return "Use the WSAD keys to move, press F to interact.";
        case "Test2":
            return "Some entities have sightlines. Be careful sneaking past them.";
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