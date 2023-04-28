import "./EntityLoader.css";
import { useContext } from "react";
import GameContext from "../context/GameContext";
import Guard from "./Guard";
import Door from "./Door";
import Chest from "./Chest";

export function getEntityComponent(entity) {
    switch(entity.el) {
        case "Guard": return (
            <Guard id={entity.id} x={entity.x} y={entity.y} key={entity.id}/>
        );
        case "Door": return (
            <Door id={entity.id} x={entity.x} y={entity.y} key={entity.id}/>
        );
        case "Chest": return (
            <Chest id={entity.id} x={entity.x} y={entity.y} key={entity.id}/>
        );
        default: return <div>Not Found</div>;
    }
}

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