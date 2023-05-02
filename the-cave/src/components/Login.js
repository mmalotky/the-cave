import { useContext, useState } from "react";
import "./Form.css";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import RequestContext from "../context/RequestContext";


//Forum for logging in as an existing user
function Login({ setUser }) {
    const reqContext = useContext(RequestContext);
    const navigate = useNavigate();
    const [err, setErr] = useState("");
    const [loginData, setLoginData] = useState({
        username:"",
        password:""
    });

    function handleSubmit(evt) {
        evt.preventDefault();

        fetch(reqContext + "/authenticate", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(loginData)
        })
        .then((response) => {
            if(response.status === 200) return response.json();
            else setErr("Login Failed.");
        })
        .then((jwtContainer) => {
            if(!jwtContainer) return;

            const jwt = jwtContainer.jwt_token;
            let userData = jwtDecode(jwt);

            userData.authorities = userData.authorities.split(",");

            const newUser = {
              token: jwt,
              userData,
            };

            localStorage.setItem("userData", JSON.stringify(newUser));

            setUser(newUser);

            navigate("/");
        })
    }

    function handleChange(evt) {
        let newLoginData = {...loginData};
        newLoginData[evt.target.id] = evt.target.value;
        setLoginData(newLoginData);
    }

    return (
        <div className="form-container">
            <form className="form-class" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <label className="form-label" htmlFor="username">Username</label>
                <input 
                    className="form-input" 
                    type="text"
                    id="username" 
                    value={loginData.username}
                    onChange={handleChange}
                />
                <label className="form-label" htmlFor="password">Password</label>
                <input 
                    className="form-input" 
                    type="password" 
                    id="password" 
                    value={loginData.password}
                    onChange={handleChange}
                />
                <button className="form-submit" type="submit">Submit</button>
                <div className="form-err">{err}</div>
            </form>
        </div>
    );
}

export default Login;