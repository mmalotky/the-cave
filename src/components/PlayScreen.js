import { useEffect, useState } from "react";
import "./PlayScreen.css";
import { fadeIn } from "../animations/ComponentAnimations";
import PlayerAvatar from "./PlayerAvatar";
import useKeylogger from "../hooks/useKeylogger";
import PauseMenu from "./PauseMenu";

function PlayScreen({setScreen}) {
    const [render, setRender] = useState([
        <PlayerAvatar key="playerAvatar"/>
    ]);

    const keylogger = useKeylogger();

    useEffect(() => {
        if(render[0].key !== "pauseMenu") {
            if(keylogger.includes('Escape')) {
                pause();
            }
        }
    }, [keylogger]);

    useEffect(() => {
        fadeIn(".play-screen");
    }, []);


    const pause = function() {
        let newRender = [...render];
        newRender.unshift(<PauseMenu key="pauseMenu" unpause={unpause}/>);
        setRender(newRender);
    }

    const unpause = function() {
        let newRender = [...render];
        if(render[0].key === "pauseMenu") {
            newRender.shift();
        }
        setRender(newRender);
    }

    return (
        <div className="play-screen">
            {render}
        </div>
    );
}

export default PlayScreen;