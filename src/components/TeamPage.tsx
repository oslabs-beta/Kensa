import React from "react";
import { SimpleGrid, Text, Box, Link, Flex } from "@chakra-ui/react";


const TeamPage = () => {
  return ( 
    <>
      <SimpleGrid h='90vh' columns={2} spacing={10} bgColor='white'> 
        <Box bgImage={require('../assets/bg3.png')} objectFit='fill' filter="blur(1px)" opacity={.8}>
        </Box>
        <Flex direction='column' justifyContent='space-around' paddingBottom='20px'>
          <Text fontFamily="Garamond" fontWeight="600" fontSize={["25px","35px"]} letterSpacing={"2px"} fontStyle="italic" color="#E38B29">Brian Pham</Text>
          <Link href='https://github.com/brpham13' isExternal fontFamily ="Arial" fontWeight="100" letterSpacing={".1px"} fontSize={['16px',"20px"]}>GitHub</Link>
          <br />
          <Link href='https://www.linkedin.com/in/brpham13/' isExternal fontFamily ="Arial" fontWeight="100" letterSpacing={".1px"} fontSize={['16px',"20px"]}>LinkedIn</Link>

          <Text fontFamily="Garamond" fontWeight="600" fontSize={["25px","35px"]} letterSpacing={"2px"} fontStyle="italic" pt={["20px","35px","50px"]} color="#E38B29">Brian Peinado</Text>
          <Link href='https://github.com/brianhip' isExternal fontFamily ="Arial" fontWeight="100" letterSpacing={".1px"} fontSize={['16px',"20px"]}>GitHub</Link>
          <br />
          <Link href='https://www.linkedin.com/in/brian-peinado/' isExternal fontFamily ="Arial" fontWeight="100" letterSpacing={".1px"} fontSize={['16px',"20px"]}>LinkedIn</Link>

          <Text fontFamily="Garamond" fontWeight="600" fontSize={["25px","35px"]} letterSpacing={"2px"} fontStyle="italic" pt={["20px","35px","50px"]} color="#E38B29">Tommy Li</Text>
          <Link href='https://github.com/tommyli97' isExternal fontFamily ="Arial" fontWeight="100" letterSpacing={".1px"} fontSize={['16px',"20px"]}>GitHub</Link>
          <br />
          <Link href='https://www.linkedin.com/in/tommyli10/' isExternal fontFamily ="Arial" fontWeight="100" letterSpacing={".1px"} fontSize={['16px',"20px"]}>LinkedIn</Link>

          <Text fontFamily="Garamond" fontWeight="600" fontSize={["25px","35px"]} letterSpacing={"2px"} fontStyle="italic" pt={["20px","35px","50px"]} color="#E38B29">Raymond Kim</Text>
          <Link href='https://github.com/raymonnd' isExternal fontFamily ="Arial" fontWeight="100" letterSpacing={".1px"} fontSize={['16px',"20px"]}>GitHub</Link>
          <br />
          <Link href='https://www.linkedin.com/in/raymond-kim0/' isExternal fontFamily ="Arial" fontWeight="100" letterSpacing={".1px"} fontSize={['16px',"20px"]}>LinkedIn</Link>
        </Flex>
      </SimpleGrid>
    </>
  );
};

export default TeamPage;