import "./Menu.css"
import PlayScreen from "./PlayScreen";

function StartMenu({setScreen}) {
    const start = function() {
        setScreen(<PlayScreen setScreen={setScreen}/>)
    }

    const load = function() {
        //path to load menu
    }

    return (
        <div className="menu-container">
            <form>
                <button onClick={() => start()} className="menu-button">Start</button>
                <button onClick={() => load()} className="menu-button" disabled>Load Save</button>
            </form>
        </div>
    );
}

export default StartMenu;