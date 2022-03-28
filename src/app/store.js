import counterReducer from '../features/Counter/counterSlice';
import chatReducer from '../features/Chat/chatSlice';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = {
  chat: chatReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
