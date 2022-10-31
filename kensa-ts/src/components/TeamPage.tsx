import * as React from "react";
import { SimpleGrid, Text, Box,Link } from "@chakra-ui/react";


const TeamPage = () => {
  return ( 
    <>
      <SimpleGrid columns={2} spacing={10}> 
        <Box bgImage={require('../assets/bg3.png')} objectFit='fill' filter="blur(1px)" opacity={.8} h='calc(100vh)'>
        </Box>
        <Box justifyContent={'center'} alignItems="center" pt="150px">
          <br />
          <Text fontFamily="Garamond" fontWeight="600" fontSize={"35px"} letterSpacing={"2px"} fontStyle="italic" color="#E38B29">Brian Pham</Text>
          <Link fontFamily ="Arial" fontWeight="100" letterSpacing={".1px"} fontSize={"20px"}>GitHub</Link>
          <br />
          <Link fontFamily ="Arial" fontWeight="100" letterSpacing={".1px"} fontSize={"20px"}>LinkedIn</Link>
          <br />
          <br />
          <Text fontFamily="Garamond" fontWeight="600" fontSize={"35px"} letterSpacing={"2px"} fontStyle="italic" pt="75px" color="#E38B29">Brian Peinado</Text>
          <Link fontFamily ="Arial" fontWeight="100" letterSpacing={".1px"} fontSize={"20px"}>GitHub</Link>
          <br />
          <Link fontFamily ="Arial" fontWeight="100" letterSpacing={".1px"} fontSize={"20px"}>LinkedIn</Link>
          <br />
          <br />
          <Text fontFamily="Garamond" fontWeight="600" fontSize={"35px"} letterSpacing={"2px"} fontStyle="italic" pt="75px" color="#E38B29">Tommy Li</Text>
          <Link fontFamily ="Arial" fontWeight="100" letterSpacing={".1px"} fontSize={"20px"}>GitHub</Link>

          <br />
          <Link fontFamily ="Arial" fontWeight="100" letterSpacing={".1px"} fontSize={"20px"}>LinkedIn</Link>
          <br />
          <br />
          <Text fontFamily="Garamond" fontWeight="600" fontSize={"35px"} letterSpacing={"2px"} fontStyle="italic" pt="75px" color="#E38B29">Raymond Kim</Text>
          <Link fontFamily ="Arial" fontWeight="100" letterSpacing={".1px"} fontSize={"20px"}>GitHub</Link>
          <br />
          <Link fontFamily ="Arial" fontWeight="100" letterSpacing={".1px"} fontSize={"20px"}>LinkedIn</Link>
          <br /> 
        </Box>
      </SimpleGrid>
    </>
  );
};

export default TeamPage;