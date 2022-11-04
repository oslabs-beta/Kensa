import * as React from "react";
import { Text, SimpleGrid, Box } from "@chakra-ui/react";


const WhyKensaPage = () => {
  return ( 
    <>
      <SimpleGrid columns={2} spacing={10}> 
        <Box bgImage={require('../assets/bg3.png')}
          filter="blur(0px)" 
          opacity={.8}
          h="calc(100vh)">
        </Box>
        <Box h="calc(90vh)">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Text fontFamily={"Garamond"} 
            fontStyle="italic" 
            fontWeight="550" 
            fontSize="35px"
            lineHeight={"35px"} 
          >
            Monitoring a server helps ensure
          its performance and functionalities. 
          </Text>
          <br />
          <Text fontFamily="Garamond" fontSize="25px" lineHeight="30px"> However, monitoring a GraphQL API traffic is a 
          daunting task because all GraphQL requests are made to a single
           endpoint. They must be able to keep track of real-time key metrics that are relevant
          to the health and performance of the server.
          </Text>
          <br />
          <Text pt="100px" fontFamily={"Garamond"} fontWeight="550" fontStyle="italic" fontSize="35px" lineHeight="35px">
          A GraphQL monitoring tool that allows you to:
          </Text>
          <br/>
          <Text fontFamily="Garamond" fontSize="25px" lineHeight="30px">
            -Compare query performance over time, look for high latency queries, and
            track response data/errors.<br/>
            -Access query history logs to get a unified view of your APIs performance.<br/>
            -Embedded GraphQL playground for quickly testing your
            queries/mutations.<br/>
            -Graph visualization for easily accessible and understandable API metrics
          </Text>
          
        </Box>
      
      </SimpleGrid>
    </>
  );
};

export default WhyKensaPage;