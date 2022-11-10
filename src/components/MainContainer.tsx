import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Center } from '@chakra-ui/react';
import LandingPage from './LandingPage';
import Signup from "./Signup";
import Login from "./Login";
import Monitor from "./Monitor";
import TeamPage from "./TeamPage";
import WhyKensaPage from "./WhyKensaPage";
import Kensa from './Kensa';
import Projects from './Projects';
import Hero from './Hero';
import PlaygroundContainer from './PlaygroundContainer';
import ChangePasswordForm from './ChangePasswordForm';
import NotFound from './NotFound';

const MainContainer = () => {

  return (
    <Center h='100vh'>
      <Routes>
        <Route path='/'>
          {/* Routes within Landing page */}
          <Route path='/' element={<LandingPage />}>
            <Route path='/' element={<Hero />} />
            <Route path='/team' element={<TeamPage />} />
            <Route path='/whykensa' element={<WhyKensaPage />} />
          </Route>

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Routes within main Kensa app */}
          <Route path='/user/:username' element={<Kensa />}>
            <Route path='' element={<Projects />} />
            <Route path='monitor/:projectId' element={<Monitor />} />
            <Route path='playground' element={<PlaygroundContainer />} />
            <Route path='security' element={<ChangePasswordForm />} />
          </Route>
          {/* 404 for all other routes */}
          <Route path='/*' element={<NotFound />} />
        </Route>
      </Routes>
    </Center>
  );

};

export default MainContainer;