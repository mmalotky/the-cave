import "./Form.css";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RequestContext from "../context/RequestContext";

//Forum for creating a new user

function CreateAccount() {
    const reqContext = useContext(RequestContext);
    const [loginData, setLoginData] = useState({username:"", password:"", passwordConfirm:""});
    const [err, setErr] = useState([]);
    const [valid, setValid] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = function (evt) {
        evt.preventDefault();
        if(!valid) return;

        const submission = {username: loginData.username, password: loginData.password};

        fetch(reqContext + "/create_user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(submission)
        })
        .then((response) => {
            if(response.status === 201) navigate("/login");
            return response.json();
        })
        .then(setErr);
    }

    const handleChange = function (evt) {
        let newLoginData = {...loginData};
        newLoginData[evt.target.id] = evt.target.value;
        setValid(newLoginData.password === newLoginData.passwordConfirm);
        setLoginData(newLoginData);
    }

    useEffect(()=> {
        let newErr = [...err];
        if(valid) {
            newErr = newErr.filter(e => e !== "Passwords must match.");
        }
        else {
            newErr.push("Passwords must match.");
        }
        setErr(newErr);
    }, [valid]);

    return (
        <div className="form-container">
            <form className="form-class" onSubmit={handleSubmit}>
                <h1>Create an Account</h1>
                <label htmlFor="username">Username</label>
                <input 
                    className="form-input"
                    id="username"
                    onChange={handleChange}
                    value={loginData.username}
                />
                <label htmlFor="password">Password</label>
                <input 
                    className="form-input"
                    id="password"
                    onChange={handleChange}
                    value={loginData.password}
                />
                <label htmlFor="passwordConfirm">Confirm Password</label>
                <input 
                    className="form-input"
                    id="passwordConfirm"
                    onChange={handleChange}
                    value={loginData.passwordConfirm}
                />
                <button className="form-submit" type="submit">Submit</button>
                {err.map(e=><div className="form-err" key={e}>{e}</div>)}
            </form>
        </div>
    );
}

export default CreateAccount;