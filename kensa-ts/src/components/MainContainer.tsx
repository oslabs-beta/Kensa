import React, { useState, useEffect } from 'react';
import {Routes, Route, Outlet} from "react-router-dom";

import LandingPage from "./LandingPage";
import Signup from "./Signup";
import Login from "./Login";
import Projects from "./Projects";
import AddProject from "./AddProject";
import Monitor from "./Monitor";
import Kensa from './Kensa';

const MainContainer = () => {
  // const [currentUserId, setCurrentUserId] = React.useState(null);

  // useEffect(() => {
  //     handleCurrentUserId(currentUserId);
  // }, [currentUserId]);

  // const handleCurrentUserId = (id:(number | null)):void => {
  //     setCurrentUserId(id);
  // };

  return (
    <Routes>
      {/* The outer route is used for auth routing later */}
      <Route path="/">
        <Route path="/" element={<LandingPage />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="user/:username" element={<Projects />} />
        <Route path="user/:username/new" element={<AddProject />} />
        <Route path="monitor/:projectId" element={<Monitor />} />
        <Route path='/dashboard' element={<Kensa />} />
      </Route>
    </Routes>
  );

};

export default MainContainer;