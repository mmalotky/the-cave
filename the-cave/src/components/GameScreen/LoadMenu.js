import "./StartMenu.css";
import "./Menu.css";
import { useContext, useEffect, useState } from "react";
import StartMenu from "./StartMenu";
import PlayScreen from "./PlayScreen";
import { fadeOut } from "../../animations/ComponentAnimations";
import AuthContext from "../../context/AuthContext";
import RequestContext from "../../context/RequestContext";

function LoadMenu({setScreen}) {
    const reqContext = useContext(RequestContext);
    const authContext = useContext(AuthContext);
    const [saves, setSaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    const returnToMain = function(evt) {
        evt.preventDefault();
        fadeOut(evt.target.parentElement)
        setTimeout(() => setScreen(<StartMenu setScreen={setScreen}/>), 1000);
    }

    const selectSave = function(evt) {
        const el = evt.target.parentElement.parentElement.querySelector("input[name='save-select']:checked");
        if(!el) return;

        return saves.find((s) => {
            return s.id == el.value;
        });
    }

    const deleteSelected = function(evt) {
        evt.preventDefault();
        const save = selectSave(evt);
        if(!save) return;

        fetch(reqContext + "/save", {
            method: "DELETE",
            headers: {
                "Content-Type":"application/json",
                Authorization: `Bearer ${authContext.token}`
            },
            body: JSON.stringify(save)
        })
        .then((response) => {
            if(response.status !== 204) return setErr("Could not complete request.");
            getSaves()
        })
    }

    const load = function(evt) {
        evt.preventDefault();
        const save = selectSave(evt);
        if(!save) {
            setErr("Please select a save.")
            return;
        }

        fadeOut(evt.target.parentElement)
        setTimeout(() => setScreen(<PlayScreen setScreen={setScreen} startingLevel={save.level} lastSave={save}/>), 1000);
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
            <div className="menu-select">
                <table>
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
                                <td><input type="radio" id={s.saveName+s.id} value={s.id} name="save-select"/></td>
                                <td><label htmlFor={s.saveName+s.id}>{s.saveName}</label></td>
                                <td><label htmlFor={s.saveName+s.id}>{new Date(s.saveDate).toLocaleString()}</label></td>
                                <td><label htmlFor={s.saveName+s.id}>{s.level}</label></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div className="menu-container top-menu">
            <form>
                <div className="menu-err">{err}</div>
                { listSaves() }
                <div>
                    <button onClick={load} className="menu-button" disabled={saves.length === 0}>Load Game</button>
                    <button onClick={deleteSelected} className="menu-button" disabled={saves.length === 0}>Delete</button>
                    <button onClick={returnToMain} className="menu-button">Main Menu</button>
                </div>
            </form>
        </div>
    );
}

export default LoadMenu;