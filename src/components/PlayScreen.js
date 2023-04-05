import { useEffect, useState } from "react";
import "./PlayScreen.css";
import { fadeIn, horizontalMove, verticalMove } from "../animations/ComponentAnimations";
import PlayerAvatar from "./PlayerAvatar";
import useKeylogger from "../hooks/useKeylogger";
import PauseMenu from "./PauseMenu";
import TestLevel, { checkCoords } from "../levels/TestLevel";

function PlayScreen({setScreen}) {
    const [face, setFace] = useState("face-down");
    const [render, setRender] = useState([
        <TestLevel key="test"/>,
        <PlayerAvatar face={face} key="playerAvatar"/>
    ]);

    const [right, setRight] = useState(false);
    const [left, setLeft] = useState(false);
    const [up, setUp] = useState(false);
    const [down, setDown] = useState(false);

    const [y, setY] = useState(0);
    const [x, setX] = useState(0);
    const [tick, setTick] = useState(false);
    const tickrate = 200; //ms
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
        let newY = y;
        let newX = x;
        
        if(up) {
            newY++;
            setFace("face-up");
        }
        if(down) {
            newY--;
            setFace("face-down");
        }
        if(right) {
            newX--;
            setFace("face-right");
        }
        if(left) {
            newX++;
            setFace("face-left");
        }

        if(checkCoords(newX+18, newY+34) === 0) {
            setX(newX);
            setY(newY);
        }
        else if(checkCoords(newX+18, y+34) === 0) {
            setX(newX);
        }
        else if(checkCoords(x+18, newY+34) === 0) {
            setY(newY);
        }
    }

    useEffect(() => {
        const newAvatar = <PlayerAvatar face={face} key="playerAvatar"/>;
        let newRender = [...render];
        newRender[newRender.findIndex(el => el.key === "playerAvatar")] = newAvatar;
        setRender(newRender);
    }, [face]);

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
            { render }
        </div>
    );
}

export default PlayScreen;