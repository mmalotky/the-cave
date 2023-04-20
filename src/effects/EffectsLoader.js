import Shadow from "./Shadow";
import "./EffectsLoader.css";

//load effects by level
export function loadLevelEffects(level, setEffects) {
    switch(level) {
        case "Test":
            setEffects([
                <Shadow x={21} y={15} height={10} width={7} key="shadow1"/>
            ]);
            break;
        case "Test2":
            setEffects([]);
            break;
    }
}

function EffectsLoader(props) {

    //loader is static while the container moves to reposition effects according to player position
    return (
        <div className="effects-loader">
            <div className="effects-container">
                {props.effects}
            </div>
        </div>
    )
}

export default EffectsLoader;