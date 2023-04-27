import { fadeOut } from "../../animations/ComponentAnimations";
import "./Menu.css"
import "./StartMenu.css"
import PlayScreen from "./PlayScreen";

//options: start game

//todo: load save file, settings?
function StartMenu({setScreen}) {
    const start = function(evt) {
        evt.preventDefault();
        fadeOut(evt.target.parentElement)
        setTimeout(() => setScreen(<PlayScreen setScreen={setScreen}/>), 1000);
    }

    const load = function(evt) {
        evt.preventDefault();
        //path to load menu
    }

    return (
        <div className="menu-container start-menu">
            <form>
                <button onClick={(evt) => start(evt)} className="menu-button">Start</button>
                <button onClick={(evt) => load(evt)} className="menu-button" disabled>Load Save</button>
            </form>
        </div>
    );
}

export default StartMenu;