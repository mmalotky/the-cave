import TestLevel, { checkCoordsTestLevel } from "./TestLevel";
import TestLevel2, { checkCoordsTestLevel2 } from "./TestLevel2";

export function checkCoords(level, x, y) {
    switch(level) {
        case "Test":
            return checkCoordsTestLevel(x, y);
        case "Test2":
            return checkCoordsTestLevel2(x, y);
    }
}

export function startingCoords(level) {
    switch(level) {
        case "Test":
            return {x:8, y:8};
        case "Test2":
            return {x:30, y:14};
    }
}

function LevelLoader({level}) {
    switch(level) {
        case "Test":
            return <TestLevel/>;
        case "Test2":
            return <TestLevel2/>;
    }
}

export default LevelLoader;