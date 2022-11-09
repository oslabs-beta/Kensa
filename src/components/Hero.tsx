import React, { useState, useEffect } from 'react';
import { Flex, Box, Text, Image } from '@chakra-ui/react';
import { Link as RouterLink} from "react-router-dom";
import bg3 from '../assets/bg3.png';
import logo from '../assets/Kensa_cropped.png';

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
    <Flex bgImage={bg3} filter="blur(0px)" opacity={.8} h='90vh' objectFit="cover" w='100%'>
      <Box>
        <Text color= "#FDEEDC" fontSize='75px' fontFamily ="Arial Black" lineHeight="20px" letterSpacing={"80px"} fontWeight="900" zIndex="100" pt="200px" pl="75px">
           KENSA
        </Text>
        <Text color= "#FDEEDC" fontSize='45px' fontFamily ="Arial" lineHeight="40px" fontWeight="100" letterSpacing={".1px"} zIndex="100" pt="30px" pl="75px">
            monitoring and observability <br />
            for all your GraphQL APIs
        </Text>
        <br />
        <br />
        
        <RouterLink to="/login">
          <Text css={`&:hover {transform: translate(0,1px); text-decoration: underline}`} fontFamily="Garamond" fontWeight="400" color="#FDEEDC" fontSize="50px" letterSpacing={"3px"} fontStyle="italic" pl="75px">
            GET STARTED
          </Text>
        </RouterLink>
      </Box>
      <Box>
        <Image src={logo} w='500px' pt='80px' id={`${render}`}/> 
      </Box>
    </Flex>
  );
};

export default Hero;