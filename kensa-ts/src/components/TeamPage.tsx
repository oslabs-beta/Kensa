import * as React from "react";
import { SimpleGrid, Text, Box,Link, Image } from "@chakra-ui/react";


const TeamPage = () => {
  return ( 
    <>
      <SimpleGrid columns={2}> 
        <Box justifyContent={'center'} 
          alignItems="center" 
          pt="100px"
          ml="150px"
        >
          <br />
          <Text fontFamily="Helvetica" 
            fontWeight="600"
            fontSize={"30px"}
            letterSpacing={"2.5px"} 
            color="#F1A661"
            lineHeight={"30px"}
            >
            <Image src={require('../assets/doodle.jpeg')} 
              borderRadius="50%" w="7.5%" h="7.5%">
            </Image>
            BRIAN PHAM
          </Text>
          
          <Link fontFamily ="Garamond" 
            fontWeight="100"
            letterSpacing={".1px"}
            fontSize={"25px"}
            fontStyle="italic"
            lineHeight={"25px"}
            >
              GitHub
          </Link>
          <br />
          <Link fontFamily ="Garamond" 
            fontWeight="100" 
            letterSpacing={".1px"} 
            fontSize={"25px"} 
            fontStyle="italic"
            lineHeight={"25px"}
            >  
            LinkedIn
          </Link>
          <br />
          <br />
          <Text fontFamily="Helvetica" 
            fontWeight="600" 
            fontSize={"30px"} 
            letterSpacing={"2.5px"}  
            pt="25px" 
            color="#F1A661"
            lineHeight={"30px"}
          >
            <Image 
              src={require('../assets/doodle.jpeg')} 
              borderRadius="50%"
              w="7.5%" 
              h="7.5%">

            </Image>
          BRIAN PEINADO
          </Text>
          <Link 
            fontFamily ="Garamond" 
            fontWeight="100" 
            letterSpacing={".1px"} 
            fontSize={"25px"} 
            fontStyle="italic"
            lineHeight={"25px"}
          >
            GitHub
          </Link>
          <br />
          <Link fontFamily ="Garamond" 
            fontWeight="100" 
            letterSpacing={".1px"} 
            fontSize={"25px"} 
            fontStyle="italic"
            lineHeight={"25px"}>
            LinkedIn
          </Link>
          <br />
          <br />
          <Text fontFamily="Helvetica"
            fontWeight="600" 
            fontSize={"30px"} 
            letterSpacing={"2.5px"}
            pt="25px" 
            color="#F1A661"
            lineHeight={"30px"}>
            <Image src={require('../assets/doodle.jpeg')} 
              borderRadius="50%" 
              w="7.5%" 
              h="7.5%">
            </Image>
              TOMMY LI          
          </Text>
          <Link fontFamily ="Garamond" 
            fontWeight="100"
            letterSpacing={".1px"}
            fontSize={"25px"} 
            fontStyle="italic"
            lineHeight={"25px"}>
              GitHub
          </Link>

          <br />
          <Link fontFamily ="Garamond" 
            fontWeight="100" 
            letterSpacing={".1px"} 
            fontSize={"25px"}
            fontStyle="italic"
            lineHeight={"25px"}
            >
            LinkedIn
          </Link>
          <br />
          <br />
          <Text fontFamily="Helvetica" 
            fontWeight="600" 
            fontSize={"30px"} 
            letterSpacing={"2.5px"}
            pt="25px"
            color="#F1A661"
            lineHeight={"30px"}>
            <Image src={require('../assets/doodle.jpeg')}
              borderRadius="50%" 
              w="7.5%"
              h="7.5%%">
            </Image>
            RAYMOND KIM
          </Text>
          <Link fontFamily ="Garamond"
            fontWeight="100"
            letterSpacing={".1px"} 
            fontSize={"25px"} 
            fontStyle="italic"
            lineHeight={"25px"}
          >
              GitHub
          </Link>
          <br />
          <Link fontFamily ="Garamond"
            fontWeight="100" 
            letterSpacing={".1px"} 
            fontSize={"25px"} 
            fontStyle="italic"
            lineHeight={"25px"}>
            LinkedIn
          </Link>
          <br /> 
        </Box>
        <Box bgImage={require('../assets/bg3.png')} 
          objectFit='contain' 
          filter="blur(1px)" 
          opacity={.8}
          h="calc(100vh)"
        >
        </Box>
      </SimpleGrid>
    </>
  );
};

export default TeamPage;