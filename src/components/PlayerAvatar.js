import "./PlayerAvatar.css";

function PlayerAvatar({face, interacting, moving}) {

    return <div className={"player-avatar " + face + (moving? " walking" : "") + (interacting? " interact" : "")}/>
}

export default PlayerAvatar;