import "./Form.css";

function CreateAccount() {
    return (
        <div className="form-container">
            <form className="form-class">
                <h1>Create an Account</h1>
                <label>Username</label>
                <input className="form-input"/>
                <label>Password</label>
                <input className="form-input"/>
                <label>Confirm Password</label>
                <input className="form-input"/>
                <button className="form-submit" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreateAccount;