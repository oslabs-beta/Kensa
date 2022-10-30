import React, { useState, useEffect } from 'react';
import {Routes, Route, Outlet} from "react-router-dom";

import LandingPage from "./LandingPage";
import Signup from "./Signup";
import Login from "./Login";
import Projects from "./Projects";
import AddProject from "./AddProject";
import Monitor from "./Monitor";
import Cookies from 'js-cookie';

import Kensa from './Kensa';

const MainContainer = () => {
  // const [currentUserId, setCurrentUserId] = React.useState(null);

  // useEffect(() => {
  //     handleCurrentUserId(currentUserId);
  // }, [currentUserId]);

    // const handleCurrentUserId = (id:(number | null)):void => {
    //     setCurrentUserId(id);
    // };
    const [verified, setVerified] = React.useState(false);
    const [username, setUsername] = React.useState(null);

    const verifyjwt = async () => {
        const jwt = await Cookies.get('token');
    
        console.log('IN verifyJWT', jwt);
    
        await fetch('testjwt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: jwt })
        })
          .then((result) => {
            console.log(verified)
            setVerified(true)
            setUsername(result);
            console.log(verified)
          })
          .catch((err) => console.log(err));
    }
    verifyjwt.bind(useState);

    return (
    <Routes>
      {/* The outer route is used for auth routing later */}
      <Route path="/">
        <Route path="/" element={<LandingPage />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login verifyjwt={verifyjwt} />} />
        <Route path="user/:username" element={<Projects />} />
        <Route path="user/:username/new" element={<AddProject />} />
        <Route path="monitor/:projectId" element={<Monitor />} />
        <Route path='/dashboard' element={<Kensa />} />
      </Route>
    </Routes>
  );

};

export default MainContainer;