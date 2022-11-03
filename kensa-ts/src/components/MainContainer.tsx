import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Center } from '@chakra-ui/react';
import LandingPage from './LandingPage';
import Signup from "./Signup";
import Login from "./Login";
import Monitor from "./Monitor";
import Cookies from 'js-cookie';
import TeamPage from "./TeamPage";
import DocsPage from "./DocsPage";
import WhyKensaPage from "./WhyKensaPage";
import Kensa from './Kensa';
import Projects from './Projects';
import Hero from './Hero';
import PlaygroundContainer from './PlaygroundContainer';

const MainContainer = () => {
  // const [currentUserId, setCurrentUserId] = React.useState(null);

  // useEffect(() => {
  //     handleCurrentUserId(currentUserId);
  // }, [currentUserId]);

  // const handleCurrentUserId = (id:(number | null)):void => {
  //     setCurrentUserId(id);
  // };

  // *****************************************
  // brpham's comment: seems like this method doesn't even hit the backend
  // because the fetch didn't make request to localhost:3000/testjwt
  // const [verified, setVerified] = React.useState(false);
  // const [username, setUsername] = React.useState(null);

  // const verifyjwt = async () => {
  //   const jwt = Cookies.get('token');
    
  //   console.log('IN verifyJWT', jwt);
    
    
  //   await fetch('testjwt', {
  //     method: 'POST',
  //     headers: { 
  //       'Content-Type': 'application/json' 
  //     },
  //     body: JSON.stringify({ token: jwt })
  //   })
  //     .then((result) => {
  //       // console.log(verified);
  //       setVerified(true);
  //       setUsername(result);
  //       // console.log(verified);
  //     })
  //     .catch((err) => console.log(err));
  // };
  // verifyjwt.bind(useState);
  // *****************************************

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
          </Route>

        </Route>
      </Routes>
    </Center>
  );

};

export default MainContainer;