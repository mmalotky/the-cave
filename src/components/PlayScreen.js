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

    const [right, setRight] = useState(false);
    const [left, setLeft] = useState(false);
    const [up, setUp] = useState(false);
    const [down, setDown] = useState(false);

    const [y, setY] = useState(0);
    const [x, setX] = useState(0);

    const keylogger = useKeylogger();

    useEffect(() => {
        if(render[0].key !== "pauseMenu") {
            if(keylogger.includes('Escape')) {
                pause();
            }

            setRight(keylogger.includes('d') && !keylogger.includes('a'));
            setLeft(keylogger.includes('a') && !keylogger.includes('d'));
            setUp(keylogger.includes('w') && !keylogger.includes('s'));
            setDown(keylogger.includes('s') && !keylogger.includes('w'));
        }
    }, [keylogger]);

    const move = function() {
        if(right) {
            setX(x+1);
        }
        if(left) {
            setX(x-1);
        }
        if(up) {
            setY(y-1);
        }
        if(down) {
            setY(y+1);
        }
        setTimeout(() => setTick(!tick), 500);
    }
    const [tick, setTick] = useState(false);
    useEffect(move,[tick]);
    
    useEffect(() => {
        console.log(y);
    }, [y]);

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