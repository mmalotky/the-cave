import { useContext } from "react";
import TestLevel, { testData } from "./TestLevel";
import TestLevel2, { test2Data } from "./TestLevel2";
import GameContext from "../context/GameContext";

export function getLevelData(level) {
    switch(level) {
        case "Test":return testData;
        case "Test2":return test2Data;
    }
}

//return map information from coordinates based on level
export function checkCoords(levelData, x, y) {
    let modX, modY;
    switch(levelData.level) {
        case "Test":
            modX = x + 34;
            modY = y + 42;
            break;
        case "Test2":
            modX = x + 34;
            modY = y + 42;
            break;
        default:
            return 1;
    }
    console.log(modX, modY)

    if(modX < 0 || modY < 0 || modX > levelData.grid.length || modY > levelData.grid[modX].length) {
        return 1;
    }

    return levelData.grid[modX][modY];
}

//return the background wallpaper element for the level
function LevelLoader() {
    const context = useContext(GameContext);
    switch(context.level) {
        case "Test":
            return <TestLevel/>;
        case "Test2":
            return <TestLevel2/>;
        default:
            return <div>Level Not Found</div>
    }
}

export default LevelLoader;