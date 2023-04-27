import {Link, useNavigate} from "react-router-dom";
import "./NavBar.css";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function NavBar({setUser}) {
    const context = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = function () {
        localStorage.setItem("userData", null);
        setUser(null);
        navigate("/");
    };

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li>
                    <Link className="navbar-link" to="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link className="navbar-link" to="/game">
                        Play
                    </Link>
                </li>
                <li>
                    <Link className="navbar-link" to="/login">
                        { context ? "Switch Users" : "Sign-in"}
                    </Link>
                </li>
                {
                    context ?
                    <button onClick={handleLogout}>Logout</button> :
                    <></>
                }
            </ul>
        </nav>
    );
}

export default NavBar;