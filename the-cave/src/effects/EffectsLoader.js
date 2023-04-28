import "./EffectsLoader.css";
import { useContext } from "react";
import GameContext from "../context/GameContext";

function EffectsLoader() {
    const context = useContext(GameContext);
    //loader is static while the container moves to reposition effects according to player position
    return (
        <div className="effects-loader">
            <div className="effects-container">
                {context.effects}
            </div>
        </div>
    )
}

export default EffectsLoader;