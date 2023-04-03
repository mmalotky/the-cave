import { closeMenu } from "../animations/MenuAnimations";
import "./Menu.css"
import PlayScreen from "./PlayScreen";

function StartMenu({setScreen}) {
    const start = function(evt) {
        evt.preventDefault();
        closeMenu(evt.target.parentElement)
        setTimeout(() => setScreen(<PlayScreen setScreen={setScreen}/>), 1000);
    }

    const load = function() {
        //path to load menu
    }

    return (
        <div className="menu-container">
            <form>
                <button onClick={(evt) => start(evt)} className="menu-button">Start</button>
                <button onClick={() => load()} className="menu-button" disabled>Load Save</button>
            </form>
        </div>
    );
}

export default StartMenu;