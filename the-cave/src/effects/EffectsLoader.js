import "./EffectsLoader.css";
import { useContext } from "react";
import GameContext from "../context/GameContext";
import Shadow from "./Shadow";

export function getEffectComponent(effect) {
    switch(effect.el) {
        case "Shadow": return (
            <Shadow id={effect.id} x={effect.x} y={effect.y} key={effect.id}/>
        );
        default: return <div>Not Found</div>
    }
}

function EffectsLoader() {
    const context = useContext(GameContext);

    //loader is static while the container moves to reposition effects according to player position
    return (
        <div className="effects-loader">
            <div className="effects-container">
                
            </div>
        </div>
    )
}

export default EffectsLoader;