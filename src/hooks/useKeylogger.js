import { useEffect, useState } from "react";

function useKeylogger() {
    const [keylogger, setKeylogger] = useState([]);

    const handleKeyDown = function (evt) {
        setKeylogger(keylogger => {return keylogger.includes(evt.key) ? keylogger : [...keylogger, evt.key]});
    }

    const handleKeyUp = function (evt) {
        setKeylogger(keylogger => keylogger.filter(k => k !== evt.key));
    }

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