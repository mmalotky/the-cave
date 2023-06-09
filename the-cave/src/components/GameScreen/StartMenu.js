import { fadeOut } from "../../animations/ComponentAnimations";
import "./Menu.css"
import "./StartMenu.css"
import PlayScreen from "./PlayScreen";
import LoadMenu from "./LoadMenu";

//options: start game, load saves

//todo: settings?
function StartMenu({setScreen}) {
    const start = function(evt) {
        evt.preventDefault();
        fadeOut(evt.target.parentElement)
        setTimeout(() => setScreen(
            <PlayScreen 
                setScreen={setScreen} 
                startingLevel={"Test"} 
                lastSave={{
                    saveName:""
                }}
            />
        ), 1000);
    }

    const load = function(evt) {
        evt.preventDefault();
        fadeOut(evt.target.parentElement)
        setTimeout(() => setScreen(<LoadMenu setScreen={setScreen}/>), 1000);
    }

    return (
        <div className="menu-container top-menu">
            <form>
                <button onClick={start} className="menu-button">Start</button>
                <button onClick={load} className="menu-button">Load Save</button>
            </form>
        </div>
    );
}

export default StartMenu;