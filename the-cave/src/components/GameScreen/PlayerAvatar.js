import { useContext } from "react";
import "./PlayerAvatar.css";
import CharContext from "../../context/CharContext";

function PlayerAvatar() {
    const context = useContext(CharContext);

    return <div className={"player-avatar " + context.face + (context.moving? " walking" : "") + (context.interacting? " interact" : "")}/>
}

export default PlayerAvatar;