import AuthContext from "../context/AuthContext";
import "./Displays.css";
import { useContext } from "react";

function Home() {
    const context = useContext(AuthContext);
    return (
        <div className="display">
            <h1>{"Welcome to the Cave" + (context ? ", " + context.userData.sub : "")}</h1>
        </div>
    )
}

export default Home;