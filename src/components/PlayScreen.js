import { useEffect, useState } from "react";
import "./PlayScreen.css";
import { fadeIn, horizontalMove, verticalMove } from "../animations/ComponentAnimations";
import PlayerAvatar from "./PlayerAvatar";
import useKeylogger from "../hooks/useKeylogger";
import PauseMenu from "./PauseMenu";
import LevelLoader, { checkCoords } from "../levels/LevelLoader";
import EntityLoader from "../entities/EntityLoader"

function PlayScreen({setScreen}) {
    const [level, setLevel] = useState("Test");
    const [face, setFace] = useState("face-down");

    const [right, setRight] = useState(false);
    const [left, setLeft] = useState(false);
    const [up, setUp] = useState(false);
    const [down, setDown] = useState(false);

    const [y, setY] = useState(0);
    const [x, setX] = useState(0);
    const [entityPositions, setEntityPositions] = useState({});

    const [tick, setTick] = useState(0);
    const tickrate = 250; //ms
    const [paused, setPaused] = useState(false);

    const [render, setRender] = useState([
        <LevelLoader level={level} key="levelLoader"/>,
        <PlayerAvatar face={face} key="playerAvatar"/>,
        <EntityLoader level={level} setEntityPositions={setEntityPositions} key="entityLoader"/>
    ]);

    const keylogger = useKeylogger();

    useEffect(() => {
        fadeIn(".play-screen");
    }, []);

    useEffect(() => {
        if(render[render.length - 1].key !== "pauseMenu") {
            if(keylogger.includes('Escape')) {
                pause();
            }
            if(keylogger.includes('f')) {
                interact();
            }

            setRight(keylogger.includes('d') && !keylogger.includes('a'));
            setLeft(keylogger.includes('a') && !keylogger.includes('d'));
            setUp(keylogger.includes('w') && !keylogger.includes('s'));
            setDown(keylogger.includes('s') && !keylogger.includes('w'));
        }
    }, [keylogger]);

    const checkEntities = function(x, y) {
        return Object.values(entityPositions).filter(e => e.x === x + 16 && e.y === y + 24).length > 0;
    }

    const interact = function() {
        let frontY; 
        switch(face) {
            case "face-up": frontY = y+35; break;
            case "face-down": frontY =  y+33; break;
            default: frontY =  y+34; break;
        }

        let frontX;
        switch(face) {
            case "face-left": frontX = x+19; break;
            case "face-right": frontX = x+17; break;
            default: frontX = x+18; break;
        }

        const adjacent = checkCoords(level, frontX, frontY);
        if(adjacent > 1) {
            console.log("ping");
            if(adjacent === 2) {
                setLevel("Test2");
                setX(0);
                setY(0);
            }
        }
    }

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

        if(checkCoords(level, newX+18, newY+34) === 0 && !checkEntities(newX, newY)) {
            setX(newX);
            setY(newY);
        }
        else if(checkCoords(level, newX+18, y+34) === 0 && !checkEntities(newX, y)) {
            setX(newX);
        }
        else if(checkCoords(level, x+18, newY+34) === 0 && !checkEntities(x, newY)) {
            setY(newY);
        }
    }

    useEffect(() => {
        const newAvatar = <PlayerAvatar face={face} key="playerAvatar"/>;
        let newRender = [...render];
        newRender[newRender.findIndex(el => el.key === "playerAvatar")] = newAvatar;
        setRender(newRender);
    }, [face]);

    useEffect(() => {
        const newLevel = <LevelLoader level={level} key="levelLoader"/>;
        let newRender = [...render];
        newRender[newRender.findIndex(el => el.key === "levelLoader")] = newLevel;
        setRender(newRender);
    }, [level]);

    const rerender = function() {
        move();

        const tickSet = setTimeout(() => setTick(tick < 1000 ? tick + 1 : 0), tickrate);
        if(paused) {
            clearTimeout(tickSet);
        }
    }

    useEffect(rerender,[tick]);
    
    useEffect(() => {
        verticalMove("#background", y, tickrate);
        verticalMove(".entity-container", y, tickrate);
    }, [y]);

    useEffect(() => {
        horizontalMove("#background", x, tickrate);
        horizontalMove(".entity-container", x, tickrate);
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
            setTick(tick+1);
        }
    }, [paused]);

    return (
        <div className="play-screen">
            { render }
        </div>
    );
}

export default PlayScreen;