import React from 'react';
import { Stack, InputGroup, InputLeftElement, Input, Avatar, Icon } from '@chakra-ui/react';
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
      <Avatar name={username} size='md' justifyItems='flex-end' />
    </Stack>
  );
};

export default KensaNavbar;