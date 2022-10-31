import { Heading } from "@chakra-ui/react";
import * as React from "react";
import { Text, Image, Box } from "@chakra-ui/react";
import { Link as RouterLink} from "react-router-dom";


const LandingPage = ()=> {
  return (
    <>
      <Box bgImage={require('../assets/bg3.png')} filter="blur(0px)" opacity={.8} h='calc(100vh)' objectFit="cover" w='100%'>
      
        <Text color= "#FDEEDC" fontSize='75px' fontFamily ="Arial Black" lineHeight="20px" letterSpacing={"80px"} fontWeight="900" zIndex="100" pt="300px" pl="75px">
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
    
    </>
  );
};

export default LandingPage;