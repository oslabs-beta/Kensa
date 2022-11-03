import * as React from "react";
import { Flex, Heading, HStack, Image, Text,AspectRatio } from "@chakra-ui/react";
import { Link as RouterLink} from "react-router-dom";
import logo from '../assets/Kensa cropped2.png';


const Header = () => {
  return (
    <>
      <Flex px="100px" py="10px" bg="#FDEEDC" alignItems="center" justifyContent="space-between">
        <RouterLink to="/"> 
          <Image css={`&:hover {transform: translate(0,2px)`} justifyContent="flex-start" alignItems={"center"} w="90px" h="60px" src={logo} />
        </RouterLink>
        <Flex alignItems="space-between">
          <HStack fontFamily="Helvetica" justifyContent="space-between" spacing="150px" letterSpacing={".5px"} fontSize="20px" color="#DEA057" fontWeight="500" >
            <RouterLink to="/whykensa">
              <Text css={`&:hover {color: #E38B29; font-weight: 550`}> WHY KENSA</Text>
            </RouterLink>
            <RouterLink to="/docs">
              <Text css={`&:hover {color: #E38B29; font-weight: 550`}>DOCS</Text>
            </RouterLink>   
            <RouterLink to="/team">
              <Text css={`&:hover {color: #E38B29; font-weight: 550`}>TEAM</Text>
            </RouterLink>        
          </HStack>
        </Flex>

        <Flex alignItems="flex-end">
          <HStack fontFamily="Helvetica" justifyContent="flex-end" spacing="50px" fontSize="20px" letterSpacing={".5px"} color="#DEA057" fontWeight="500" >
            <RouterLink to="/signup">
              <Text css={`&:hover {color: #E38B29; font-weight: 550`}>SIGN UP</Text>
            </RouterLink>
            <RouterLink to="/login">
              <Text css={`&:hover {color: #E38B29; font-weight: 550`}>LOGIN</Text>
            </RouterLink>  
          </HStack>
        </Flex>
      </Flex>
    </>
  );
};

export default Header;