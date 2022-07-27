import React, { useContext, useEffect, useState } from 'react';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {
  IconButton,
  Flex,
  Text,
  TextInput,
  Divider,
  FAB,
  Button,
} from '@react-native-material/core';
import TodoItem from '../components/TodoItem';
import { FlatList } from 'react-native';
import { Store } from '../store/Store';
import TypeColor from '../components/TypeColor';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
  const [type, setType] = useState();
  const [search, setSearch] = useState('');
  const [searchText, setSearchText] = useState('');
  const [todoList, setTodoList] = useState([]);
  const StoreCtx = useContext(Store);
  const data = StoreCtx.store;

  useEffect(() => {
    (async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('data');
        const data = jsonValue != null ? JSON.parse(jsonValue) : [];
        StoreCtx.setInitStorage(data);
      } catch (e) {
        // read error
      }
    })();
  }, []);

  useEffect(() => {
    let list = [...data];
    if (type) {
      list = list.filter((item) => item.type === type);
    }
    if (search.trim() !== '') {
      list = list.filter((item) => {
        return item.title.includes(search.trim());
      });
    }
    setTodoList(list);
  }, [data, type, search]);

  const handlerChangeColor = (color) => {
    setType(color);
  };

  const handlerCancelFilter = () => {
    setType(null);
    setSearch('');
  };

  return (
    <Flex fill style={{ backgroundColor: 'white' }}>
      <FAB
        icon={(props) => <Icon name='plus' {...props} />}
        style={{ position: 'absolute', bottom: 20, right: 20, zIndex: 10 }}
        onPress={() => navigation.navigate('AddTodo')}
      />
      <Flex ph={10} width='100%'>
        <Text variant='h5' color='primary' style={{ textAlign: 'center', marginVertical: 10 }}>
          Hello, Đỗ Công Sơn
        </Text>
        <TextInput
          value={searchText}
          onChangeText={(value) => setSearchText(value)}
          label='Search'
          variant='outlined'
          trailing={(props) => (
            <IconButton
              icon={<Icon name='magnify' {...props} />}
              onPress={() => {
                setSearch(searchText);
                setSearchText('');
              }}
              {...props}
            />
          )}
        />
        <Flex direction='row' justify='between' items='center' style={{ marginVertical: 10 }}>
          <Text color='primary' variant='h6'>
            filter by color
          </Text>
          <Button title='View All' onPress={handlerCancelFilter} />
        </Flex>
        <TypeColor value={type} onChangeValue={handlerChangeColor} />
      </Flex>
      <Divider inset={10} style={{ marginTop: 20, marginBottom: 10 }} />
      <FlatList
        style={{ flex: 1 }}
        data={todoList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem
            creations={new Date(item.creations)}
            title={item.title}
            type={item.type}
            completed={item.completed}
            id={item.id}
          />
        )}
      />
    </Flex>
  );
};
export default Home;
