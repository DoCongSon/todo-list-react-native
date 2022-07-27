import React, { createContext, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Store = createContext();
const ADD = 'add';
const REMOVE = 'remove';
const CHANGE_STATUS = 'change';
const SET_INiT_STORAGE = 'set';

const updateAsyncStorage = async (data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('data', jsonValue);
  } catch (e) {}
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case SET_INiT_STORAGE:
      return [...action.payload];
    case ADD:
      const newState1 = [...state, action.payload];
      updateAsyncStorage(newState1);
      return newState1;
    case REMOVE:
      const newState2 = state.filter((item) => item.id !== action.payload);
      updateAsyncStorage(newState2);
      return newState2;
    case CHANGE_STATUS:
      const newState3 = state.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      });
      updateAsyncStorage(newState3);
      return newState3;
    default:
      return state;
  }
};

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, []);

  const addTodo = (todo) => {
    dispatch({ type: ADD, payload: todo });
  };

  const removeTodo = (id) => {
    dispatch({ type: REMOVE, payload: id });
  };

  const changeStatus = (id) => {
    dispatch({ type: CHANGE_STATUS, payload: id });
  };

  const setInitStorage = (data) => {
    dispatch({ type: SET_INiT_STORAGE, payload: data });
  };

  const data = {
    store: state,
    addTodo,
    removeTodo,
    changeStatus,
    setInitStorage,
  };

  return <Store.Provider value={data}>{children}</Store.Provider>;
};

export default StoreProvider;
