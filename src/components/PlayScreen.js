import { useEffect, useState } from "react";
import "./PlayScreen.css";
import { fadeIn, horizontalMove, verticalMove } from "../animations/ComponentAnimations";
import PlayerAvatar from "./PlayerAvatar";
import useKeylogger from "../hooks/useKeylogger";
import PauseMenu from "./PauseMenu";
import LevelLoader, { checkCoords, startingCoords } from "../levels/LevelLoader";
import EntityLoader from "../entities/EntityLoader"
import { entityMovement } from "../entities/entityMovement";

function PlayScreen({setScreen}) {
    const [level, setLevel] = useState("Test");
    const [face, setFace] = useState("face-down");

    const [right, setRight] = useState(false);
    const [left, setLeft] = useState(false);
    const [up, setUp] = useState(false);
    const [down, setDown] = useState(false);

    const [y, setY] = useState(0);
    const [x, setX] = useState(0);
    
    const [entities, setEntities] = useState([]);

    const [tick, setTick] = useState(0);
    const tickrate = 200; //ms
    const [paused, setPaused] = useState(false);

    const [render, setRender] = useState([
        <LevelLoader level={level} key="levelLoader"/>,
        <PlayerAvatar face={face} key="playerAvatar"/>,
        <EntityLoader level={level} entities={entities} setEntities={setEntities} key="entityLoader"/>
    ]);

    const keylogger = useKeylogger();

    useEffect(() => {
        fadeIn(".play-screen", tickrate*2);
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
        return entities.find(e => e.x === -x + 32 && e.y === -y + 16);
    }

    const updateEntities = function() {
        let newEntities = [...entities];
        newEntities.forEach(entity => {
            if(entity.movement) {
                entityMovement(entity, x, y, tickrate);
            }
        });
        setEntities(newEntities);
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
        const entity = checkEntities(frontX - 18, frontY - 34);
        
        
        if(adjacent === 2) {
            setLevel("Test2");
            setX(0);
            setY(0);
        }

        if(entity !== undefined && entity.unfixed) {
            let newEntities = [...entities];
            const index = newEntities.findIndex(p => p.id === entity.id);
            newEntities.splice(index, index+1);
            setEntities(newEntities);
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

        if(checkCoords(level, newX+18, newY+34) <= 0 && checkEntities(newX, newY) === undefined) {
            setX(newX);
            setY(newY);
        }
        else if(checkCoords(level, newX+18, y+34) <= 0 && checkEntities(newX, y) === undefined) {
            setX(newX);
        }
        else if(checkCoords(level, x+18, newY+34) <= 0 && checkEntities(x, newY) === undefined) {
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
        const start = startingCoords(level);
        setX(start.x);
        setY(start.y);
        const newLevel = <LevelLoader level={level} key="levelLoader"/>;
        const newEntities = <EntityLoader level={level} entities={entities} setEntities={setEntities} key="entityLoader"/>;
        let newRender = [...render];
        newRender[newRender.findIndex(el => el.key === "levelLoader")] = newLevel;
        newRender[newRender.findIndex(el => el.key === "entityLoader")] = newEntities;
        setRender(newRender);
    }, [level]);

    useEffect(() => {
        const newEntities = <EntityLoader level={level} entities={entities} setEntities={setEntities} key="entityLoader"/>;
        let newRender = [...render];
        newRender[newRender.findIndex(el => el.key === "entityLoader")] = newEntities;
        setRender(newRender);
    }, [entities]);

    const rerender = function() {
        if(tick % 2 == 0 && entities.length > 0) {
            updateEntities();
        }
        else if (tick % 2 == 1){    
            move();
        }

        const tickSet = setTimeout(() => setTick(tick < 1000 ? tick + 1 : 0), tickrate);
        if(paused) {
            clearTimeout(tickSet);
        }
    }

    useEffect(rerender,[tick]);
    
    useEffect(() => {
        verticalMove("#background", y, tickrate * 2);
        verticalMove(".entity-container", y, tickrate * 2);
    }, [y]);

    useEffect(() => {
        horizontalMove("#background", x, tickrate * 2);
        horizontalMove(".entity-container", x, tickrate * 2);
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