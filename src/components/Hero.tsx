import React, { useState, useEffect } from 'react';
import { Flex, Box, Text, Image } from '@chakra-ui/react';
import { Link as RouterLink} from "react-router-dom";
import bg3 from '../assets/bg3.png';
import logo from '../assets/Kensa-cropped2.png';

const Hero = () => {
  const [render, setRender] = useState<string>('unrenderedLogo');

  // Render logo after 500ms (transition)
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setRender('renderedLogo');
    }, 500);

    return () => clearTimeout(timeoutID);
  }, []);

  return (
    <Flex bgImage={bg3} filter="blur(0px)" opacity={.8} h='100vh' w='100vw'>
      <Box w='100vw'>
        <Text color= "#FDEEDC" fontSize={['35px', '60px', '80px']} fontFamily ="Arial Black" lineHeight="20px" letterSpacing={['20px','40px',"70px"]} fontWeight="900" zIndex="100" pt={['100px',"200px"]} pl={['25px','50px',"75px"]}>
           KENSA
        </Text>
        <Text color= "#FDEEDC" fontSize={['20px','30px','45px']} fontFamily ="Arial" lineHeight={['15px','25px',"40px"]} fontWeight="100" letterSpacing={".1px"} zIndex="100" pt={['10px','20px',"30px"]} pl={['25px','50px',"75px"]}>
            monitoring and observability <br />
            for all your GraphQL APIs
        </Text>
        <br />
        <br />
        <RouterLink to="/signup">
          <Text css={`&:hover {transform: translate(0,1px); text-decoration: underline}`} fontFamily="Garamond" fontWeight="400" color="#FDEEDC" fontSize={['20px','35px',"50px"]} letterSpacing={"3px"} fontStyle="italic" pl={['25px','50px',"75px"]}>
            GET STARTED
          </Text>
        </RouterLink>
      </Box>
      <Box>
        <Image src={logo} w={['200px', '400px', '600px']} pt={['50px','100px','150px']} pr={["25px","50px",'75px']} id={`${render}`}/> 
      </Box>
    </Flex>
  );
};

export default Hero;