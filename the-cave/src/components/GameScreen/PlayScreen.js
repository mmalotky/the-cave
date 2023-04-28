import { useEffect, useState } from "react";
import "./PlayScreen.css";
import { fadeIn, fadeOut, horizontalMove, verticalMove } from "../../animations/ComponentAnimations";
import PlayerAvatar from "./PlayerAvatar";
import useKeylogger from "../../hooks/useKeylogger";
import PauseMenu from "./PauseMenu";
import LevelLoader, { checkCoords, getMessage, startingCoords } from "../../levels/LevelLoader";
import EntityLoader, { initialEntities } from "../../entities/EntityLoader";
import EffectsLoader, { loadLevelEffects } from "../../effects/EffectsLoader";
import { entityMovement, entityView } from "../../entities/entityMovement";
import Message from "./Message";
import GameOverMenu from "./GameOverMenu";
import GameContext from "../../context/GameContext";

function PlayScreen({setScreen}) {
    const [level, setLevel] = useState("Test");
    const [face, setFace] = useState("face-down");

    const [right, setRight] = useState(false);
    const [left, setLeft] = useState(false);
    const [up, setUp] = useState(false);
    const [down, setDown] = useState(false);
    const [moving, setMoving] = useState(false);

    const [y, setY] = useState(0);
    const [x, setX] = useState(0);
    
    const [entities, setEntities] = useState([]);
    const [effects, setEffects] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [interacting, setInteracting] = useState(false);

    const [tick, setTick] = useState(0);
    const tickrate = 150; //ms   sets the refresh rate and gamespeed
    const [paused, setPaused] = useState(false);

    const [render, setRender] = useState([
        <LevelLoader key="levelLoader"/>,
        <PlayerAvatar face={face} interacting={interacting} moving={moving} key="playerAvatar"/>,
        <EntityLoader entities={entities} key="entityLoader"/>,
        <EffectsLoader effects={effects} key="effectsLoader"/>,
        <Message text={"Use WSAD keys to move. Press F to interact."} key="message"/>
    ]);

    const keylogger = useKeylogger();

    //set controls from the keylogger
    useEffect(() => {
        if(render[render.length - 1].key !== "pauseMenu") {
            //esc to pause menu
            if(keylogger.includes('Escape')) {
                pause();
            }

            //f to interact
            if(keylogger.includes('f')) {
                interact();
            }

            //move with wsad
            setRight(keylogger.includes('d') && !keylogger.includes('a'));
            setLeft(keylogger.includes('a') && !keylogger.includes('d'));
            setUp(keylogger.includes('w') && !keylogger.includes('s'));
            setDown(keylogger.includes('s') && !keylogger.includes('w'));
        }
    }, [keylogger]);

    //search coordinates for entities
    const checkEntities = function(x, y) {
        return entities.find(e => e.x === 16 - x && e.y === 8 - y);
    }

    //handle entity movement and range
    const updateEntities = function() {
        let newEntities = [...entities];
        newEntities.forEach(entity => {
            if(entity.movement) {
                entityMovement(entity, x, y, gameOver, tickrate);
            }
            if(entity.direction && entity.range) {
                const seen = entityView(entity, x, y, level);
                if(seen && entity.gameover) {
                    gameOver();
                }
            }
        });
        setEntities(newEntities);
    }

    //get coords in front of player
    const getFront = function() {
        let frontY; 
        switch(face) {
            case "face-up": frontY = y+1; break;
            case "face-down": frontY =  y-1; break;
            default: frontY =  y; break;
        }

        let frontX;
        switch(face) {
            case "face-left": frontX = x+1; break;
            case "face-right": frontX = x-1; break;
            default: frontX = x; break;
        }

        return {frontX, frontY};
    }

    const displayMessage = function(message) {
        if(render[render.length - 1].key !== "message") {
            let newRender = [...render];
            newRender.push(<Message text={message} key="message"/>);
            setRender(newRender);
        }
    }

    //interact with map features
    const mapInteraction = function(adjacent) {
        if(adjacent === 2) {
            fadeOut(".play-screen");
            setTimeout(() => setLevel("Test2"), 1000);
        }
        if(adjacent > 2) {
            const message = getMessage(level, adjacent);
            displayMessage(message);
        }
    }

    //interact with entities
    const entityInteraction = function(entity) {
        let newEntities = [...entities];
        const index = newEntities.findIndex(p => p.id === entity.id);
        let newInventory = [...inventory];
        const keyIndex = inventory.findIndex(i => i.unlocks === entity.id);

        if(entity.drop) {
            newInventory.push(entity.drop);
            let newEntity = {...entity};
            delete newEntity.drop;
            newEntities[index] = newEntity;
        }

        if(entity.message) {
            const message = entity.message[entity.message.length - 1];
            displayMessage(message);

            if(entity.message.length > 1) {
                entity.message.pop();
            }
        }
        
        if(entity.unfixed) {
            newEntities.splice(index, 1);
        }
        else if(keyIndex !== -1) {
            newEntities.splice(index, 1);
            newInventory.splice(keyIndex, 1);
        }
        
        setEntities(newEntities);
        setInventory(newInventory);
    }

    //interact with nearby entities and map features
    const interact = function() {
        setInteracting(true);
        const front = getFront();

        const entity = checkEntities(front.frontX, front.frontY);
        if(entity !== undefined) {
            entityInteraction(entity);
        }

        const adjacent = checkCoords(level, front.frontX, front.frontY);
        mapInteraction(adjacent);
        setTimeout(() => setInteracting(false), 1000);
    }

    //handle player movement
    const move = function() {
        if((up || down || left || right) && render[render.length - 1].key === "message") {
            let newRender = [...render];
            newRender.pop();
            setRender(newRender);
        }

        let newY = y;
        let newX = x;
        
        if(up) {
            newY++;
        }
        if(down) {
            newY--;
        }
        if(right) {
            newX--;
        }
        if(left) {
            newX++;
        }

        if(checkCoords(level, newX, newY) <= 0 && checkEntities(newX, newY) === undefined) {
            setX(newX);
            setY(newY);
        }
        else if(checkCoords(level, newX, y) <= 0 && checkEntities(newX, y) === undefined) {
            setX(newX);
        }
        else if(checkCoords(level, x, newY) <= 0 && checkEntities(x, newY) === undefined) {
            setY(newY);
        }
    }

    //rerender avatar
    useEffect(() => {
        const newAvatar = <PlayerAvatar face={face} interacting={interacting} moving={moving} key="playerAvatar"/>;
        let newRender = [...render];
        newRender[newRender.findIndex(el => el.key === "playerAvatar")] = newAvatar;
        setRender(newRender);
    }, [face, moving, interacting]);

    //set avatar condition
    useEffect(() => {
        if(right) {
            setFace("face-right");
            setMoving(true);
        }
        else if(left) {
            setFace("face-left");
            setMoving(true);
        }
        else if(up) {
            setFace("face-up");
            setMoving(true);
        }
        else if(down) {
            setFace("face-down");
            setMoving(true);
        }
        else {
            setMoving(false);
        }
    }, [up, down, left, right]);

    //load a new level

    const loadLevel = function() {
        const start = startingCoords(level);
        setX(start.x);
        setY(start.y);

        const newEffects = <EffectsLoader effects={effects} key="effectsLoader"/>;

        let newRender = [...render];
        newRender[newRender.findIndex(el => el.key === "effectsLoader")] = newEffects;
        setRender(newRender);

        initialEntities(level, setEntities);
        loadLevelEffects(level, setEffects);
        setInventory([]);
        fadeIn(".play-screen", tickrate*2);
    }

    useEffect(loadLevel, [level]);

    //rerender entities
    useEffect(() => {
        const newEntities = <EntityLoader entities={entities} key="entityLoader"/>;
        let newRender = [...render];
        newRender[newRender.findIndex(el => el.key === "entityLoader")] = newEntities;
        setRender(newRender);
    }, [entities]);

    //render effects + set start message
    useEffect(() => {
        const newEffects = <EffectsLoader effects={effects} key="effectsLoader"/>;
        let newRender = [...render];
        newRender[newRender.findIndex(el => el.key === "effectsLoader")] = newEffects;
        setRender(newRender);
    }, [effects]);

    //sets rerender to tickrate and recalls functions on each tick
    const rerender = function() {
        if(tick % 2 === 0 && entities.length > 0) {
            updateEntities();
        }
        else if (tick % 2 === 1){    
            move();
        }

        const tickSet = setTimeout(() => setTick(tick < 1000 ? tick + 1 : 0), tickrate);
        if(paused) {
            clearTimeout(tickSet);
        }
    }

    useEffect(rerender,[tick]);
    
    //rerender player x and y movement

    useEffect(() => {
        verticalMove("#background", y, tickrate * 2);
        verticalMove(".entity-container", y, tickrate * 2);
        verticalMove(".effects-container", y, tickrate * 2);
    }, [y]);

    useEffect(() => {
        horizontalMove("#background", x, tickrate * 2);
        horizontalMove(".entity-container", x, tickrate * 2);
        horizontalMove(".effects-container", x, tickrate * 2);
    }, [x]);

    //halt the game and open the pause menu
    const pause = function() {
        setPaused(true);
        let newRender = [...render];
        newRender.push(<PauseMenu key="pauseMenu" unpause={unpause} setScreen={setScreen}/>);
        setRender(newRender);
    }

    //continue the game if the player unpauses
    const unpause = function() {
        let newRender = [...render];
        if(render[render.length - 1].key === "pauseMenu" || render[render.length - 1].key === "pauseMenu") {
            newRender.pop();
        }
        setRender(newRender);
        setPaused(false);
    }

    //pause and display game over menu
    const gameOver = function() {
        setPaused(true);
        let newRender = [...render];
        newRender.push(<GameOverMenu key="gameOverMenu" unpause={unpause} loadLevel={loadLevel} setScreen={setScreen}/>);
        setRender(newRender);
    }

    useEffect(() => {
        if(!paused) {
            setTick(tick+1);
        }
    }, [paused]);

    return (
        <GameContext.Provider value={level}>
            <div className="play-screen">
                { render }
            </div>
        </GameContext.Provider>
    );
}

export default PlayScreen;