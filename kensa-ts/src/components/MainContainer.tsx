import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Center } from '@chakra-ui/react';
import LandingPage from './LandingPage';
import Signup from "./Signup";
import Login from "./Login";
import Monitor from "./Monitor";
import TeamPage from "./TeamPage";
import DocsPage from "./DocsPage";
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
        {/* The outer route is used for auth routing later */}
        <Route path='/'>

          <Route path='/' element={<LandingPage />}>
            <Route path='/' element={<Hero />} />
            <Route path='/team' element={<TeamPage />} />
            <Route path='/docs' element={<DocsPage />} />
            <Route path='/whykensa' element={<WhyKensaPage />} />
          </Route>

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route path='/user/:username' element={<Kensa />}>
            <Route path='' element={<Projects />} />
            <Route path='monitor/:projectId' element={<Monitor />} />
            <Route path='playground' element={<PlaygroundContainer />} />
            <Route path='security' element={<ChangePasswordForm />} />
          </Route>
          <Route path='/*' element={<NotFound />} />
        </Route>
      </Routes>
    </Center>
  );

};

export default MainContainer;