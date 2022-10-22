import * as React from "react";

const Login = () => {

    return (
        <div className="secondary-container">
            <h2>Login</h2>
            <form id="signup-form">
                <input type="text" placeholder="username"/>
                <input type="password" placeholder="password"/>
                <button>Submit</button>
            </form>
        </div>
    );
};

export default Login;