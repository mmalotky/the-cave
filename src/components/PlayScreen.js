import { useEffect } from "react";
import "./PlayScreen.css";
import { fadeIn } from "../animations/ComponentAnimations";

function PlayScreen({setScreen}) {

    useEffect(() => {
        fadeIn(".play-screen");
    }, []);

    return (
        <div className="play-screen">
            
        </div>
    );
}

export default PlayScreen;