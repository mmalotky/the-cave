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

    const [xMove, setXMove] = useState(false);
    const [yMove, setYMove] = useState(false);

    const [y, setY] = useState(0);
    const [x, setX] = useState(0);

    const keylogger = useKeylogger();

    useEffect(() => {
        if(render[0].key !== "pauseMenu") {
            if(keylogger.includes('Escape')) {
                pause();
            }

            if((keylogger.includes('w') || keylogger.includes('s'))
                    && !(keylogger.includes('w') && keylogger.includes('s'))) {
                setYMove(true);
            }
            else {
                setYMove(false);
            }

            if((keylogger.includes('a') || keylogger.includes('d'))
                    && !(keylogger.includes('a') && keylogger.includes('d'))) {
                setXMove(true);
            }
            else {
                setXMove(false);
            }
        }
    }, [keylogger]);

    const moveY = function() {
        if(yMove) {
            if(keylogger.includes('w')) {
                setY(y - 1);
            }
            if(keylogger.includes('s')) {
                setY(y + 1);
            }
        }
    }

    useEffect(moveY, [yMove]);
    
    useEffect(() => {
        console.log(y);
    }, [y]);

    const moveX = function() {
        if(xMove) {
            if(keylogger.includes('a')) {
                setX(x - 1);
            }
            if(keylogger.includes('d')) {
                setX(x + 1);
            }
        }
    }

    useEffect(moveX, [xMove]);

    useEffect(() => {
        console.log(x);
    }, [x]);

    useEffect(() => {
        fadeIn(".play-screen");
    }, []);

    const pause = function() {
        let newRender = [...render];
        newRender.unshift(<PauseMenu key="pauseMenu" unpause={unpause} setScreen={setScreen}/>);
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