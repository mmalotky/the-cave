import {useEffect, useState} from "react";
import "./GamePage.css";
import StartMenu from "./StartMenu";

function GamePage() {
    const [screen, setScreen] = useState();

    useEffect(() => {
        setScreen(<StartMenu setScreen={setScreen}/>);
    }, []);

    return (
        <div className='game-page'>
            {screen}
        </div>
    );
}

export default GamePage;