import "./Menu.css";
import StartMenu from "./StartMenu";
import { fadeOut } from "../../animations/ComponentAnimations";
import { getLevelData } from "../../levels/LevelLoader";
import { useContext } from "react";
import GameContext from "../../context/GameContext";

function GameOverMenu({loadLevel, setLevelData, setScreen, unpause}) {
    const context = useContext(GameContext);
    
    const retry = function(evt) {
        evt.preventDefault();
        fadeOut(".play-screen");
        
        const levelReset = getLevelData(context.level);
        setLevelData(levelReset);

        setTimeout(() => {
            loadLevel();
            unpause();
        }, 1000);
    }

    const exit = function(evt) {
        evt.preventDefault();
        fadeOut(".play-screen")
        setTimeout(() => setScreen(<StartMenu setScreen={setScreen}/>), 1000);
    }

    return (
        <div className="menu-container">
            <p className="menu-caption">GAME OVER</p>
            <form>
                <button onClick={(evt) => retry(evt)} className="menu-button">retry</button>
                <button onClick={(evt) => exit(evt)} className="menu-button">exit</button>
            </form>
        </div>
    );
}

export default GameOverMenu;