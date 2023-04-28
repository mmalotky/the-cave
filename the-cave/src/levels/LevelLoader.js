import { useContext } from "react";
import TestLevel, { testData } from "./TestLevel";
import TestLevel2, { test2Data } from "./TestLevel2";
import GameContext from "../context/GameContext";
import { getEntityComponent } from "../entities/EntityLoader";
import { getEffectComponent } from "../effects/EffectsLoader";

//get levelData
export function getLevelData(level) {
    let data;
    switch(level) {
        case "Test":
            data = JSON.parse(JSON.stringify(testData));
            break;
        case "Test2":
            data = JSON.parse(JSON.stringify(test2Data));
            break;
        default: return {};
    }

    data.entities.map(e => {
        e.el = getEntityComponent(e);
        return e;
    });
    data.effects.map(e => {
        e = getEffectComponent(e);
        return e;
    });
    console.log(data)

    return data;
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