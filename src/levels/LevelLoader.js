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

function LevelLoader({level}) {
    switch(level) {
        case "Test":
            return <TestLevel/>;
        case "Test2":
            return <TestLevel2/>;
    }
}

export default LevelLoader;