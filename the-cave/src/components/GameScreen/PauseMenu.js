import { useContext, useState, useEffect } from "react";
import { fadeOut } from "../../animations/ComponentAnimations";
import "./Menu.css"
import StartMenu from "./StartMenu";
import RequestContext from "../../context/RequestContext";
import AuthContext from "../../context/AuthContext";
import GameContext from "../../context/GameContext";
import SaveContext from "../../context/SaveContext";

//should overlay the gamescreen, pause the game and controls

//options: return to game, exit to start menu, save

function PauseMenu({unpause, setScreen, setSaveData}) {
    const reqContext = useContext(RequestContext);
    const authContext = useContext(AuthContext);
    const gameContext = useContext(GameContext);
    const saveContext = useContext(SaveContext);

    const [saveName, setSaveName] = useState(saveContext.saveName);
    const [saveState, setSaveState] = useState(<></>);

    const resume = function(evt) {
        evt.preventDefault();
        unpause();
    }

    const save = function(evt) {
        evt.preventDefault();

        if(saveContext.saveName === saveName) {
            updateSave();
        }
        else {
            newSave();
        }
    }

    const exit = function(evt) {
        evt.preventDefault();
        fadeOut(".play-screen")
        setTimeout(() => setScreen(<StartMenu setScreen={setScreen}/>), 1000);
    }

    const handleChange = function(evt) {
        let newSaveName = evt.target.value;
        setSaveName(newSaveName);
    }

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
            <form>
                <button onClick={resume} className="menu-button">Resume</button>
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

export default PauseMenu;