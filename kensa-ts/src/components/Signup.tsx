import * as React from "react";

const Signup = () => {

    return (
        <div className="secondary-container">
            <h2>Sign Up</h2>
            <form id="signup-form">
                <input type="text" placeholder="username"/>
                <input type="password" placeholder="password"/>
                <button>Submit</button>
            </form>
        </div>
    );
};

export default Signup;