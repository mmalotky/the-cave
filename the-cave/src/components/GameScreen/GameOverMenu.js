import "./Menu.css";
import StartMenu from "./StartMenu";
import { fadeOut } from "../../animations/ComponentAnimations";
import { getLevelData } from "../../levels/LevelLoader";
import { useContext, useEffect, useState } from "react";
import GameContext from "../../context/GameContext";
import RequestContext from "../../context/RequestContext";
import AuthContext from "../../context/AuthContext";
import SaveContext from "../../context/SaveContext";

//should overlay the gamescreen, pause the game and controls
//options: restart the current level, save game, return to start menu
function GameOverMenu({loadLevel, setLevelData, setScreen, unpause, setSaveData}) {
    const reqContext = useContext(RequestContext);
    const authContext = useContext(AuthContext);
    const gameContext = useContext(GameContext);
    const saveContext = useContext(SaveContext);

    const [saveName, setSaveName] = useState(saveContext.saveName);
    const [saveState, setSaveState] = useState(<></>);
    
    //resets the level and player data to the beginnning of the current level
    const retry = function(evt) {
        evt.preventDefault();
        fadeOut(".play-screen");
        
        const levelReset = getLevelData(gameContext.level);
        setLevelData(levelReset);

        setTimeout(() => {
            loadLevel();
            unpause();
        }, 1000);
    }

    //either updates the current save or make a new save for a different title
    const save = function(evt) {
        evt.preventDefault();

        if(saveContext.saveName === saveName) {
            updateSave();
        }
        else {
            newSave();
        }
    }

    //returns to start menu
    const exit = function(evt) {
        evt.preventDefault();
        fadeOut(".play-screen")
        setTimeout(() => setScreen(<StartMenu setScreen={setScreen}/>), 1000);
    }

    const handleChange = function(evt) {
        let newSaveName = evt.target.value;
        setSaveName(newSaveName);
    }

    //fetch for new save
    const newSave = function() {
        fetch(reqContext + "/save", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                Authorization: `Bearer ${authContext.token}`
            },
            body: JSON.stringify({
                saveDate:Date.now(),
                saveName:saveName,
                level:gameContext.level,
                user:authContext.userData.sub
            })
        })
        .then((response) => {
            if(response.status === 201) {
                setSaveState(<div>✅</div>);
                return response.json();
            }
            else {
                setSaveState(<div>Save Failed</div>)
            }
        })
        .then((savedData) => {
            if(savedData) setSaveData(savedData);
        });
    }

    useEffect(() => setSaveState(<></>), [saveName]);

    //fetch to update the current save
    const updateSave = function() {
        fetch(reqContext + "/save", {
            method: "PUT",
            headers: {
                "Content-Type":"application/json",
                Authorization: `Bearer ${authContext.token}`
            },
            body: JSON.stringify({
                id:saveContext.id,
                saveDate:Date.now(),
                saveName:saveName,
                level:gameContext.level,
                user:authContext.userData.sub
            })
        })
        .then((response) => {
            if(response.status === 202) {
                setSaveState(<div>✅</div>);
                return response.json();
            }
            else {
                setSaveState(<div>Save Failed</div>)
            }
        })
        .then((savedData) => {
            if(savedData) setSaveData(savedData);
        });
    }

    return (
        <div className="menu-container">
            <p className="menu-caption">GAME OVER</p>
            <form>
                <button onClick={retry} className="menu-button">Retry</button>
                <div className="menu-input">
                    <label htmlFor="save-as">Save As</label>
                    <input onChange={handleChange} id="save-as" value={saveName}/>
                    {saveState}
                    <button onClick={save} className="menu-button">Save</button>
                </div>
                <button onClick={exit} className="menu-button">Exit</button>
            </form>
        </div>
    );
}

export default GameOverMenu;