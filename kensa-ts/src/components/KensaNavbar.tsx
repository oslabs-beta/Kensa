import React from 'react';
import { Stack, InputGroup, InputLeftElement, Input, Avatar, Icon, Heading, Text, Button } from '@chakra-ui/react';
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody } from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';
import { useParams } from 'react-router-dom';

const KensaNavbar = () => {
  const { username } = useParams();

  return (
    <Stack direction='row' spacing={3} bgColor='white' h='8%' w='100%' align='center' p='20px'>
      <InputGroup>
        <InputLeftElement 
          pointerEvents='none'
          // eslint-disable-next-line react/no-children-prop
          children={<Icon as={BsSearch} />}
        />
        <Input type='text' placeholder='Search' />
      </InputGroup>

      {/* Displpay username and logout button when click on Avatar */}
      <Popover placement='bottom-end'>
        <PopoverTrigger>
          <Avatar name={username} size='md' justifyItems='flex-end' _hover={{ cursor: 'pointer' }} />
        </PopoverTrigger>
        <PopoverContent w='200px'>
          <PopoverArrow />
          <PopoverHeader><Heading size='xs'>{username}</Heading></PopoverHeader>
          <PopoverBody>
            <Text>Sign out</Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Stack>
  );
};

export default KensaNavbar;