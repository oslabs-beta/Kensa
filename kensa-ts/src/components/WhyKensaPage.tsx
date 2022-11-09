import React from "react";
import { Box, Text } from "@chakra-ui/react";


const WhyKensaPage = () => {
  return ( 
    <Box h='90vh' bgColor='white'>
      <Text>
        Managing a healthy and performant server while working with GraphQL can sometimes be a tricky process.
        With all requests made to a single endpoint, the ability to make pinpoint calls on which of a developers requests could
        potentially be causing health and cost issues almost becomes a necessity to have while utilizing GraphQL.
        Adding on to that, in many cases, a developer's workflow when utilizing larger datasets and GraphQL requests could include
        deeply nested queries and multiple resolvers that add more layers of complexity when attempting to monitor a server.

        Kensa provides developers with :
        Query latency time
        Response data and errors 
        Historical logs
        Individually saved projects 
        Built-in playground for testing
        Tree visualization for queries
        
      </Text>
    </Box>
  );
};

export default WhyKensaPage;