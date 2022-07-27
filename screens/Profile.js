import React from 'react';
import { Image } from 'react-native';
import { Stack, Flex, Text, Chip } from '@react-native-material/core';

const Profile = () => {
  return (
    <Flex>
      <Flex items='center'>
        <Flex style={{ width: 300, height: 300, marginVertical: 20 }}>
          <Image
            source={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
            style={{ width: '100%', height: '100%', borderRadius: 999, alignItems: 'center' }}
          />
        </Flex>
      </Flex>
      <Stack spacing={10}>
        <Flex mh={30} direction='row' items='center' justify='between'>
          <Chip label='Name' color='primary' />
          <Text variant='h6'>Đỗ Công Sơn</Text>
        </Flex>
        <Flex mh={30} direction='row' items='center' justify='between'>
          <Chip label='Date of Birth' color='primary' />
          <Text variant='h6'>01/10/2001</Text>
        </Flex>
        <Flex mh={30} direction='row' items='center' justify='between'>
          <Chip label='Address' color='primary' />
          <Text variant='h6'>Hà Nội</Text>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default Profile;
