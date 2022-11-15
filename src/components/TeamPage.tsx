import React from "react";
import { SimpleGrid, Text, Box, Link, Flex, Image, Hide } from "@chakra-ui/react";

import brian from '../assets/brianpham.jpeg';
import brianpei from '../assets/brianpei.jpeg';
import tommy from '../assets/tommy.jpeg';
import raymond from '../assets/raymond.jpeg';

const TeamPage = () => {
  return ( 
    <>
      <SimpleGrid h='100vh' pt='10vh' columns={{'md':2, 'sm':1}} spacing={10} bgColor='white'>
        <Hide below={'md'}>
          <Box bgImage={require('../assets/bg3.png')} objectFit='fill' filter="blur(1px)" opacity={.8}>
          </Box>
        </Hide> 
        <Flex direction='column' justifyContent='space-around' paddingBottom='20px'>
          <Flex paddingLeft='30px' paddingRight='30px' justifyContent='space-around'>
            <Box width={'50%'} className='teampage'>
              <Text fontFamily="Garamond" fontWeight="600" fontSize={["20px","30px"]} letterSpacing={"2px"} fontStyle="italic" color="#E38B29">Brian Pham</Text>
              <Link href='https://github.com/brpham13' isExternal fontFamily ="Arial" fontWeight="100" letterSpacing={".1px"} fontSize={['12px',"16px"]}>GitHub</Link>
              <br />
              <Link href='https://www.linkedin.com/in/brpham13/' isExternal fontFamily ="Arial" fontWeight="100" letterSpacing={".1px"} fontSize={['12px',"16px"]}>LinkedIn</Link>
            </Box>
            <Box>
              <Image borderRadius={'50%'} width={'150px'} src={brian}/>
            </Box>
          </Flex>

          <Flex paddingLeft='30px' paddingRight='30px' justifyContent='space-around'>
            <Box width={'50%'} className='teampage'>
              <Text fontFamily="Garamond" fontWeight="600" fontSize={["20px","30px"]} letterSpacing={"2px"} fontStyle="italic" pt={["20px","35px","50px"]} color="#E38B29">Brian Peinado</Text>
              <Link href='https://github.com/brianhip' isExternal fontFamily ="Arial" fontWeight="100" letterSpacing={".1px"} fontSize={['12px',"16px"]}>GitHub</Link>
              <br />
              <Link href='https://www.linkedin.com/in/brian-peinado/' isExternal fontFamily ="Arial" fontWeight="100" letterSpacing={".1px"} fontSize={['12px',"16px"]}>LinkedIn</Link>
            </Box>
            <Box>
              <Image borderRadius={'50%'} width={'150px'} src={brianpei}/>
            </Box>
          </Flex>

          <Flex paddingLeft='30px' paddingRight='30px' justifyContent='space-around'>
            <Box width={'50%'} className='teampage'>
              <Text fontFamily="Garamond" fontWeight="600" fontSize={["20px","30px"]} letterSpacing={"2px"} fontStyle="italic" pt={["20px","35px","50px"]} color="#E38B29">Tommy Li</Text>
              <Link href='https://github.com/tommyli97' isExternal fontFamily ="Arial" fontWeight="100" letterSpacing={".1px"} fontSize={['12px',"16px"]}>GitHub</Link>
              <br />
              <Link href='https://www.linkedin.com/in/tommyli10/' isExternal fontFamily ="Arial" fontWeight="100" letterSpacing={".1px"} fontSize={['12px',"16px"]}>LinkedIn</Link>
            </Box>
            <Box>
              <Image borderRadius={'50%'} width={'150px'} src={tommy}/>
            </Box>
          </Flex>

          <Flex paddingLeft='30px' paddingRight='30px' justifyContent='space-around'>
            <Box width={'50%'} className='teampage'>
              <Text fontFamily="Garamond" fontWeight="600" fontSize={["20px","30px"]} letterSpacing={"2px"} fontStyle="italic" pt={["20px","35px","50px"]} color="#E38B29">Raymond Kim</Text>
              <Link href='https://github.com/raymonnd' isExternal fontFamily ="Arial" fontWeight="100" letterSpacing={".1px"} fontSize={['12px',"16px"]}>GitHub</Link>
              <br />
              <Link href='https://www.linkedin.com/in/raymond-kim0/' isExternal fontFamily ="Arial" fontWeight="100" letterSpacing={".1px"} fontSize={['12px',"16px"]}>LinkedIn</Link>
            </Box>
            <Box>
              <Image borderRadius={'50%'} width={'150px'} src={raymond}/>
            </Box>
          </Flex>
          
        </Flex>
      </SimpleGrid>
    </>
  );
};

export default TeamPage;