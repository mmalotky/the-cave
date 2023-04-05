import { useEffect, useState } from "react";
import "./PlayScreen.css";
import { fadeIn, horizontalMove, verticalMove } from "../animations/ComponentAnimations";
import PlayerAvatar from "./PlayerAvatar";
import useKeylogger from "../hooks/useKeylogger";
import PauseMenu from "./PauseMenu";
import Test, { checkCoords } from "../levels/Test";

function PlayScreen({setScreen}) {
    const [render, setRender] = useState([
        <Test key="test"/>,
        <PlayerAvatar key="playerAvatar"/>
    ]);

    const [right, setRight] = useState(false);
    const [left, setLeft] = useState(false);
    const [up, setUp] = useState(false);
    const [down, setDown] = useState(false);

    const [y, setY] = useState(0);
    const [x, setX] = useState(0);
    const [tick, setTick] = useState(false);
    const tickrate = 250; //ms
    const [paused, setPaused] = useState(false);

    const keylogger = useKeylogger();

    useEffect(() => {
        fadeIn(".play-screen");
    }, []);

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
        if(right && checkCoords(x+17, y+34) === 0) {
            setX(x-1);
        }
        if(left && checkCoords(x+19, y+34) === 0) {
            setX(x+1);
        }
        if(up && checkCoords(x+18, y+35) === 0) {
            setY(y+1);
        }
        if(down && checkCoords(x+18, y+33) === 0) {
            setY(y-1);
        }
    }

    const rerender = function() {
        move();

        const tickSet = setTimeout(() => setTick(!tick), tickrate);
        if(paused) {
            clearTimeout(tickSet);
        }
    }

    useEffect(rerender,[tick]);
    
    useEffect(() => {
        verticalMove("#background", y, tickrate);
    }, [y]);

    useEffect(() => {
        horizontalMove("#background", x, tickrate);
    }, [x]);

    const pause = function() {
        setPaused(true);
        let newRender = [...render];
        newRender.push(<PauseMenu key="pauseMenu" unpause={unpause} setScreen={setScreen}/>);
        setRender(newRender);
    }

    const unpause = function() {
        let newRender = [...render];
        if(render[render.length - 1].key === "pauseMenu") {
            newRender.pop();
        }
        setRender(newRender);
        setPaused(false);
    }

    useEffect(() => {
        if(!paused) {
            setTick(!tick);
        }
    }, [paused]);

    return (
        <div className="play-screen">
            {render}
        </div>
    );
}

export default PlayScreen;