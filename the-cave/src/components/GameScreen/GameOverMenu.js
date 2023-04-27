import "./Menu.css";
import StartMenu from "./StartMenu";
import { fadeOut } from "../../animations/ComponentAnimations";

function GameOverMenu({loadLevel, setScreen, unpause}) {
    const retry = function(evt) {
        evt.preventDefault();
        fadeOut(".play-screen");
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