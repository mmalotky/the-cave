import "./Form.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateAccount({SERVER_URL}) {
    const [loginData, setLoginData] = useState({username:"", password:"", passwordConfirm:""})
    const [valid, setValid] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = function (evt) {
        evt.preventDefault();
        if(!valid) return;

        const submission = {username: loginData.username, password: loginData.password};

        fetch(SERVER_URL + "/create_user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(submission)
        })
        .then((response) => {
            console.log(response)
            if(response.status === 201) navigate("/login");
        });
    }

    const handleChange = function (evt) {
        let newLoginData = {...loginData};
        newLoginData[evt.target.id] = evt.target.value;
        setValid(newLoginData.password === newLoginData.passwordConfirm);
        setLoginData(newLoginData);
    }

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
            </form>
        </div>
    );
}

export default CreateAccount;