import "./Menu.css"

function PauseMenu({unpause}) {
    const resume = function(evt) {
        evt.preventDefault();
        unpause();
    }

    const exit = function(evt) {
        evt.preventDefault();
    }

    return (
        <div className="menu-container">
            <form>
                <button onClick={(evt) => resume(evt)} className="menu-button">resume</button>
                <button onClick={(evt) => exit(evt)} className="menu-button" disabled>exit</button>
            </form>
        </div>
    );
}

export default PauseMenu;