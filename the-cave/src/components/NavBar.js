import {Link} from "react-router-dom";
import "./NavBar.css";

function NavBar() {
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
                        Sign-in
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;