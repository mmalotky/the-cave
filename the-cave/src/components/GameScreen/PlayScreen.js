import { useEffect, useState } from "react";
import "./PlayScreen.css";
import { fadeIn, fadeOut, horizontalMove, verticalMove } from "../../animations/ComponentAnimations";
import PlayerAvatar from "./PlayerAvatar";
import useKeylogger from "../../hooks/useKeylogger";
import PauseMenu from "./PauseMenu";
import LevelLoader, { checkCoords, getLevelData } from "../../levels/LevelLoader";
import EntityLoader from "../../entities/EntityLoader";
import EffectsLoader from "../../effects/EffectsLoader";
import { entityMovement, entityView } from "../../entities/entityMovement";
import Message from "./Message";
import GameOverMenu from "./GameOverMenu";
import GameContext from "../../context/GameContext";
import CharContext from "../../context/CharContext";

function PlayScreen({setScreen}) {
    const initialLevel = () => getLevelData("Test");
    const [levelData, setLevelData] = useState(initialLevel);

    const [character, setCharacter] = useState({
        face:"face-down",
        moving:false,
        interacting:false,
        inventory:[]
    });

    const [right, setRight] = useState(false);
    const [left, setLeft] = useState(false);
    const [up, setUp] = useState(false);
    const [down, setDown] = useState(false);

    const [y, setY] = useState(0);
    const [x, setX] = useState(0);

    const [tick, setTick] = useState(0);
    const tickrate = 150; //ms   sets the refresh rate and gamespeed
    const [paused, setPaused] = useState(false);

    const [render, setRender] = useState([
        <LevelLoader key="levelLoader"/>,
        <PlayerAvatar key="playerAvatar"/>,
        <EntityLoader key="entityLoader"/>,
        <EffectsLoader key="effectsLoader"/>,
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
        return levelData.entities.find(e => e.x === 16 - x && e.y === 8 - y);
    }

    //handle entity movement and range
    const updateEntities = function() {
        let newLevelData = {...levelData};
        newLevelData.entities.forEach(entity => {
            if(entity.movement) {
                entityMovement(entity, x, y, gameOver, tickrate);
            }
            if(entity.direction && entity.range) {
                const seen = entityView(entity, x, y, levelData.level);
                if(seen && entity.gameover) {
                    gameOver();
                }
            }
        });
        setLevelData(newLevelData);
    }

    //get coords in front of player
    const getFront = function() {
        let frontY; 
        switch(character.face) {
            case "face-up": frontY = y+1; break;
            case "face-down": frontY =  y-1; break;
            default: frontY =  y; break;
        }

        let frontX;
        switch(character.face) {
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
            setTimeout(() => {
                let newLevelData = getLevelData(levelData.next);
                setLevelData(newLevelData);
            }, 1000);
        }
        if(adjacent > 2) {
            const message = levelData.messageList[adjacent - 3];
            displayMessage(message);
        }
    }

    //interact with entities
    const entityInteraction = function(entity) {
        let newLevelData = {...levelData};
        const index = levelData.entities.findIndex(p => p.id === entity.id);
        let newChar = {...character};
        const keyIndex = character.inventory.findIndex(i => i.unlocks === entity.id);

        if(entity.drop) {
            newChar.inventory.push(entity.drop);
            let newEntity = {...entity};
            delete newEntity.drop;
            newLevelData.entities[index] = newEntity;
        }

        if(entity.message) {
            const message = entity.message[entity.message.length - 1];
            displayMessage(message);

            if(entity.message.length > 1) {
                entity.message.pop();
            }
        }
        
        if(entity.unfixed || keyIndex !== -1) {
            newLevelData.entities.splice(index, 1);
        }
        
        setLevelData(newLevelData);
        setCharacter(newChar);
    }

    //interact with nearby entities and map features
    const interact = function() {
        let newChar = {...character};
        newChar.interacting = true;
        setCharacter(newChar);

        const front = getFront();

        const entity = checkEntities(front.frontX, front.frontY);
        if(entity !== undefined) {
            entityInteraction(entity);
        }

        const adjacent = checkCoords(levelData, front.frontX, front.frontY);
        mapInteraction(adjacent);

        newChar.interacting = false;
        setTimeout(() => setCharacter(newChar), 1000);
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

        if(checkCoords(levelData, newX, newY) <= 0 && checkEntities(newX, newY) === undefined) {
            setX(newX);
            setY(newY);
        }
        else if(checkCoords(levelData, newX, y) <= 0 && checkEntities(newX, y) === undefined) {
            setX(newX);
        }
        else if(checkCoords(levelData, x, newY) <= 0 && checkEntities(x, newY) === undefined) {
            setY(newY);
        }
    }

    //set avatar condition
    useEffect(() => {
        let newChar = {...character};
        if(right) {
            newChar.face = "face-right";
            newChar.moving = true;
        }
        else if(left) {
            newChar.face = "face-left";
            newChar.moving = true;
        }
        else if(up) {
            newChar.face = "face-up";
            newChar.moving = true;
        }
        else if(down) {
            newChar.face = "face-down";
            newChar.moving = true;
        }
        else {
            newChar.moving = false;
        }
        setCharacter(newChar);
    }, [up, down, left, right]);

    //load a new level

    const loadLevel = function() {
        setX(levelData.startingCoords.x);
        setY(levelData.startingCoords.y);
        fadeIn(".play-screen", tickrate*2);
    }

    useEffect(loadLevel, [levelData.level]);

    //sets rerender to tickrate and recalls functions on each tick
    const rerender = function() {
        if(tick % 2 === 0 && levelData.entities.length > 0) {
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
        <CharContext.Provider value={character}>
            <GameContext.Provider value={levelData}>
                <div className="play-screen">
                    { render }
                </div>
            </GameContext.Provider>
        </CharContext.Provider>
    );
}

export default PlayScreen;