import React, { useContext, useState } from 'react';
import { Flex, TextInput, Divider, Wrap, Button } from '@react-native-material/core';
import TypeColor from '../components/TypeColor';
import Todo from '../models/Todo';
import { Store } from '../store/Store';
import { Alert } from 'react-native';

const AddTodo = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('red');
  const StoreCtx = useContext(Store);

  const handlerChangeColor = (color) => {
    setType(color);
  };

  const handlerAddTodo = () => {
    if (title.trim() === '') {
      Alert.alert('Warning', 'Please enter a title', [{ text: 'OK' }]);
    }
    const todo = new Todo(title, new Date(), type, false, new Date().toISOString());
    StoreCtx.addTodo(todo);
    setTitle('');
  };

  return (
    <Flex fill w='100%' style={{ backgroundColor: 'white' }}>
      <Flex fill ph={10} width='100%' mt={20}>
        <TextInput
          label='Title'
          variant='outlined'
          style={{ marginVertical: 10 }}
          value={title}
          onChangeText={(value) => setTitle(value)}
        />
        <TypeColor value={type} onChangeValue={handlerChangeColor} />
        <Divider style={{ marginVertical: 20 }} />
        <Wrap justify='center' spacing={20}>
          <Button
            variant='outlined'
            title='Cancel'
            color='secondary'
            onPress={() => navigation.goBack()}
          />
          <Button variant='outlined' title='Add' color='secondary' onPress={handlerAddTodo} />
        </Wrap>
      </Flex>
    </Flex>
  );
};
export default AddTodo;
