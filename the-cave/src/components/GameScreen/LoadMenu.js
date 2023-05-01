import "./StartMenu.css";
import "./Menu.css";
import { useContext, useEffect, useState } from "react";
import StartMenu from "./StartMenu";
import { fadeOut } from "../../animations/ComponentAnimations";
import AuthContext from "../../context/AuthContext";
import RequestContext from "../../context/RequestContext";

function LoadMenu({setScreen}) {
    const reqContext = useContext(RequestContext);
    const authContext = useContext(AuthContext);
    const [saves, setSaves] = useState([]);
    const [loading, setLoading] = useState(true);

    const returnToMain = function(evt) {
        evt.preventDefault();
        fadeOut(evt.target.parentElement)
        setTimeout(() => setScreen(<StartMenu setScreen={setScreen}/>), 1000);
    }

    const getSaves = function() {
        fetch(reqContext + "/save", {
            method: "GET",
            headers: {
                Accept:"application/json",
                Authorization: `Bearer ${authContext.token}`
            }
        })
        .then((response) => {
            if(response.status === 200) return response.json();
            console.log(response);
        })
        .then((loadedSaves) => {
            setSaves(loadedSaves);
            setLoading(false);
        });
    }
    useEffect(getSaves, []);

    const listSaves = function() {
        if (loading) {
            return <div className="menu-select">Loading...</div>
        }
        if (saves.length === 0) {
            return <div className="menu-select">No Saves Found</div>
        }
        return (
            <table className="menu-select">
                <thead>
                    <tr className="menu-row">
                        <th></th>
                        <th>Save</th>
                        <th>Date</th>
                        <th>Level</th>
                    </tr>
                </thead>
                <tbody>
                    {saves.map(s => (
                        <tr className="menu-row" key={s.saveName+s.id}>
                            <td><input type="radio" id={s.saveName+s.id} value={s.level} name="save-select"/></td>
                            <td><label htmlFor={s.saveName+s.id}>{s.saveName}</label></td>
                            <td><label htmlFor={s.saveName+s.id}>Not impemented</label></td>
                            <td><label htmlFor={s.saveName+s.id}>{s.level}</label></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }

    return (
        <div className="menu-container top-menu">
            <form>
                { listSaves() }
                <button className="menu-button" disabled={saves.length === 0}>Load Game</button>
                <button onClick={returnToMain} className="menu-button">Main Menu</button>
            </form>
        </div>
    );
}

export default LoadMenu;