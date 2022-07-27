import { Box, Wrap } from '@react-native-material/core';
import React from 'react';
import { Pressable } from 'react-native';

const colors = ['red', 'green', 'blue', 'yellow', 'violet', 'gray'];

const ColorItem = ({ color, selected, onPress }) => {
  return (
    <Pressable onPress={() => onPress(color)}>
      <Box
        w={40}
        h={40}
        style={[
          {
            borderRadius: 99,
            backgroundColor: color,
            borderWidth: 2,
            borderColor: 'transparent',
            elevation: 5,
          },
          selected && { borderColor: 'black' },
        ]}
      />
    </Pressable>
  );
};

const TypeColor = ({ value, onChangeValue }) => {
  return (
    <Wrap justify='between'>
      {colors.map((color) => (
        <ColorItem key={color} color={color} selected={value === color} onPress={onChangeValue} />
      ))}
    </Wrap>
  );
};

export default TypeColor;
