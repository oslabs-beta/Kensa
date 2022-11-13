import React from "react";
import { Flex, HStack, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from '../assets/Kensa-cropped2.png';


const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <Flex h='10vh' px={["10px", "25px", "50px"]} py="10px" bg="#FDEEDC" alignItems="center" justifyContent="space-between"  w="100vw">
        <Link to="/"> 
          <Image css={`&:hover {transform: translate(0,2px)`} justifyContent="flex-start" alignItems={"center"} w={['40px','60px',"90px"]} h={['30px','40px',"60px"]} src={logo} />
        </Link>
        <Flex alignItems="space-between">
          <HStack fontFamily="Helvetica" justifyContent="space-between" spacing={["20px", "30px", "60px"]} letterSpacing={".5px"} 
            fontSize={['12px', '16px', "20px"]} color="#DEA057" fontWeight="500">
            <Link to="/whykensa">
              <Text css={`&:hover {color: #E38B29; font-weight: 550`}> WHY KENSA</Text>
            </Link>
            <a href="https://github.com/oslabs-beta/Kensa" target="_blank" rel="noreferrer">
              <Text css={`&:hover {color: #E38B29; font-weight: 550`}>DOCS</Text>
            </a>   
            <Link to="/team">
              <Text css={`&:hover {color: #E38B29; font-weight: 550`}>TEAM</Text>
            </Link>        
          </HStack>
        </Flex>

        <Flex alignItems="flex-end">
          <HStack fontFamily="Helvetica" alignItems='center' justifyContent="flex-end" 
            spacing={['20px','30px',"50px"]} fontSize={['12px', '16px', "20px"]}  letterSpacing={[".5px"]} color="#DEA057" fontWeight="500" pr={['20px', '30px','45px']} >
            <Link to="/signup">
              <Text css={`&:hover {color: #E38B29; font-weight: 550`}>SIGN UP</Text>
            </Link>
            {user ? (
              <Link to={`/user/${user.username}`}><Text>{user.username}</Text></Link>
            ) : (
              <Link to='/login'><Text>LOGIN</Text></Link>
            )}
          </HStack>
        </Flex>
      </Flex>
    </>
  );
};

export default Header;