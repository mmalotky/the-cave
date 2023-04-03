import { useEffect } from "react";
import "./PlayScreen.css";
import { fadeIn } from "../animations/ComponentAnimations";
import PlayerAvatar from "./PlayerAvatar";
import useKeylogger from "../hooks/useKeylogger";

function PlayScreen({setScreen}) {
    const keylogger = useKeylogger();

    useEffect(() => {
        //controls
    }, [keylogger]);

    useEffect(() => {
        fadeIn(".play-screen");
    }, []);

    return (
        <div className="play-screen">
            <PlayerAvatar/>
        </div>
    );
}

export default PlayScreen;