import React, { useContext, useState } from 'react';
import AnimatedCheckbox from 'react-native-checkbox-reanimated';
import { Box, Flex, Text } from '@react-native-material/core';
import { getFormatDate } from '../util/date';
import { Alert, Pressable, StyleSheet } from 'react-native';
import { Store } from '../store/Store';

const TodoItem = ({ creations, title, type, completed, id }) => {
  const StoreCtx = useContext(Store);

  let bgColor;
  switch (type) {
    case 'green':
      bgColor = 'green';
      break;
    case 'yellow':
      bgColor = 'yellow';
      break;
    case 'violet':
      bgColor = 'violet';
      break;
    case 'gray':
      bgColor = 'gray';
      break;
    case 'blue':
      bgColor = 'blue';
      break;
    default:
      bgColor = 'red';
      break;
  }

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={() => {
        StoreCtx.changeStatus(id);
      }}
      onLongPress={() => {
        Alert.alert('Delete', 'bạn muốn xoá nó !', [
          { text: 'Cancel' },
          {
            text: 'OK',
            onPress: () => {
              StoreCtx.removeTodo(id);
            },
          },
        ]);
      }}>
      <Flex items='center' direction='row'>
        <Box w={25} h={25} bg={bgColor} radius={99} mh={10} />
        <Flex fill>
          <Text
            style={completed && { textDecorationLine: 'line-through', opacity: 0.3 }}
            variant='h6'>
            {getFormatDate(creations)}
          </Text>
          <Text
            style={completed && { textDecorationLine: 'line-through', opacity: 0.3 }}
            variant='h7'>
            {title}
          </Text>
        </Flex>
        <Pressable
          onPress={() => {
            StoreCtx.changeStatus(id);
          }}
          style={styles.checkbox}>
          <AnimatedCheckbox
            checked={completed}
            highlightColor='#4444ff'
            checkmarkColor='#ffffff'
            boxOutlineColor='#4444ff'
          />
        </Pressable>
      </Flex>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
    paddingVertical: 10,
    margin: 10,
  },
  checkbox: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
  pressed: {
    opacity: 0.8,
  },
});

export default TodoItem;
