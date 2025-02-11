import { configureStore } from '@reduxjs/toolkit';
import commandsReducer from './command/commandSlice';
import pongReducer from './pong/pongSlice';

export const store = configureStore({
    reducer: {
        commands: commandsReducer,
        pong: pongReducer,
    },
});