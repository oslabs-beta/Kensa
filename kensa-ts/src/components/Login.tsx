import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { Link } from 'react-router-dom';

// type LoginProps = {
//     // verifyjwt: ()=> void; 
//     handleCurrentUserId: (id:(number | null)) => void
// } 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
//   const { verifyjwt } = props;
	let navigate = useNavigate();

  function handleUserChange(e: React.SyntheticEvent):void {
    const target = e.target as HTMLInputElement;
    setUsername(target.value);
  }

  function handlePasswordChange(e: React.SyntheticEvent):void {
    const target = e.target as HTMLInputElement;
    setPassword(target.value);
  }

	function toProjectPage(username:string):void {
		const path = `../user/${username}`;
		navigate(path);
	}

  // login function that send username and psw to server (/login)
  function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const link = 'http://localhost:3000/login'

    fetch(link, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000/*',
      },
    //   mode: 'no-cors',
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then((data) => {
        return data.json();
      })
      .then((verified) => {
        // console.log('myJson', myJson) // returns boolean
        verified ? toProjectPage(username) : alert("Wrong login credentials.");
      })
      .catch((err) => console.log("Error:", err));
  }

  return (
    <div className="loginpanel">
      <p id="loginBanner">Login to Kensa</p>
      <form onSubmit={login}>
        <label htmlFor="username" translate-context="Label" ></label>
        <input
          type="text"
          id="loginUsername"
          name="username"
          required
          placeholder="Username"
          onChange={handleUserChange}
        />
        <br />
        <label htmlFor="password" translate-context="Password" ></label>
        <input
          type="password"
          id="loginPassword"
          name="password"
          required
          placeholder="Password"
          onChange={handlePasswordChange}
        />
        <br />
        <input type="submit" id="loginSubmitButton" value="LOGIN" />
      </form>
      <Link to="/signup">
        <button id="createAccountButton">
          Create Account
        </button>
      </Link>
    </div>
  );
};

export default Login;