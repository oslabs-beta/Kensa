import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Center } from '@chakra-ui/react';
const LandingPage = lazy(() => import('./LandingPage'));
const Hero = lazy(() => import('./Hero'));
const TeamPage = lazy(() => import('./TeamPage'));
const WhyKensaPage = lazy(() => import('./WhyKensaPage'));

const Signup = lazy(() => import('./Signup'));
const Login = lazy(() => import('./Login'));

const Kensa = lazy(() => import('./Kensa'));
const Projects = lazy(() => import('./Projects'));
const Monitor = lazy(() => import('./Monitor'));
const PlaygroundContainer = lazy(() => import('./PlaygroundContainer'));
const ChangePasswordForm = lazy(() => import('./ChangePasswordForm'));
const NotFound = lazy(() => import('./NotFound'));

const MainContainer = () => {
  return (
    <Center h="100vh">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/">
            {/* Routes within Landing page */}
            <Route path="/" element={<LandingPage />}>
              <Route path="/" element={<Hero />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/whykensa" element={<WhyKensaPage />} />
            </Route>

            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            {/* Routes within main Kensa app */}
            <Route path="/user/:username" element={<Kensa />}>
              <Route path="" element={<Projects />} />
              <Route path="monitor/:projectId" element={<Monitor />} />
              <Route path="playground" element={<PlaygroundContainer />} />
              <Route path="security" element={<ChangePasswordForm />} />
            </Route>
            {/* 404 for all other routes */}
            <Route path="/*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </Center>
  );
};

export default MainContainer;
