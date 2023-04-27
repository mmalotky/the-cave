import "./Form.css";

function Login() {
    return (
        <div className="form-container">
            <form className="form-class">
                <h1>Login</h1>
                <label className="form-label" htmlFor="username">Username</label>
                <input className="form-input" id="username"/>
                <label className="form-label" htmlFor="password">Password</label>
                <input className="form-input" type="password" id="password"/>
                <button className="form-submit">Submit</button>
            </form>
        </div>
    );
}

export default Login;