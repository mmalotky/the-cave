import { fadeOut } from "../animations/ComponentAnimations";
import "./Menu.css"
import StartMenu from "./StartMenu";

//should overlay the gamescreen, pause the game and controls

//options: return to game, exit to start menu

//todo: save?

function PauseMenu({unpause, setScreen}) {
    const resume = function(evt) {
        evt.preventDefault();
        unpause();
    }

    const exit = function(evt) {
        evt.preventDefault();
        fadeOut(".play-screen")
        setTimeout(() => setScreen(<StartMenu setScreen={setScreen}/>), 1000);
    }

    return (
        <div className="menu-container">
            <form>
                <button onClick={(evt) => resume(evt)} className="menu-button">resume</button>
                <button onClick={(evt) => exit(evt)} className="menu-button">exit</button>
            </form>
        </div>
    );
}

export default PauseMenu;