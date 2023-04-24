import { useEffect, useState } from "react";

function useKeylogger() {
    const [keylogger, setKeylogger] = useState([]);

    //on keydown, add to the logger
    const handleKeyDown = function (evt) {
        setKeylogger(keylogger => {return keylogger.includes(evt.key) ? keylogger : [...keylogger, evt.key]});
    }

    //on keyup, remove from the logger
    const handleKeyUp = function (evt) {
        setKeylogger(keylogger => keylogger.filter(k => k !== evt.key));
    }

    //handle event listeners
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        }
    }, []);

    return keylogger;
}

export default useKeylogger;