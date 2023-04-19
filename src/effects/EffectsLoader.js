import { useEffect } from "react";
import Shadow from "./Shadow";
import "./EffectsLoader.css";

function EffectsLoader(props) {

    //each level load effects
    useEffect(() => {
        switch(props.level) {
            case "Test":
                props.setEffects([
                    <Shadow x={21} y={15} height={10} width={7} key="shadow1"/>
                ]);
                break;
            case "Test2":
                props.setEffects([]);
                break;
        }
    }, [props.level]);

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