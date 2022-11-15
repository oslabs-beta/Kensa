import React from "react";
import { Box, Text, SimpleGrid, Flex, UnorderedList, ListItem } from "@chakra-ui/react";


const WhyKensaPage = () => {
  return (
    <>
      <SimpleGrid h='90vh' columns={2} bgColor='white'> 
        <Box bgImage={require('../assets/bg3.png')} objectFit='fill' filter="blur(1px)" opacity={.8}>
        </Box>
        <Flex direction='column' gap='50px' padding='30px'>
          <Box>
            <Text fontSize={['.8rem','1.2rem']}>
              Managing a healthy and performant server while working with GraphQL can sometimes be a tricky process.
              With all requests made to a single endpoint, the ability to make pinpoint calls on which of a developers requests could
              potentially be causing health and cost issues almost becomes a necessity to have while developing GraphQL schema and resolvers.
              Adding on to that, in many cases, a developer's workflow when utilizing larger datasets and GraphQL requests could include
              deeply nested queries and multiple resolvers that add more layers of complexity when attempting to monitor a server.
            </Text>
          </Box>
          <Box>
            <Text fontSize={['.8rem','1.2rem']} fontWeight='bold'>Kensa provides developers with :</Text>
            <UnorderedList fontSize={['.8rem','1.2rem']}>
              <ListItem>Query latency time</ListItem>
              <ListItem>Response data and errors</ListItem>
              <ListItem>Query and mutation logs</ListItem>
              <ListItem>Built-in playground for testing</ListItem>
              <ListItem>Tree visualization for queries</ListItem>
              <ListItem>Individually saved projects</ListItem>
            </UnorderedList>
          </Box>
        </Flex>
      </SimpleGrid>
    </>
  )
};

export default WhyKensaPage;