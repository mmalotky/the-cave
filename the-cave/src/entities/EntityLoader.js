import "./EntityLoader.css";
import { useContext } from "react";
import GameContext from "../context/GameContext";

function EntityLoader() {
    const context = useContext(GameContext);

    //loader is static while the container moves to reposition entities according to player position
    return (
        <div className="entity-loader">
            <div className="entity-container">
                {context.entities.map(e => e.el)}
            </div>
        </div>
    )
}

export default EntityLoader;