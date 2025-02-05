import { configureStore } from '@reduxjs/toolkit';
import commandsReducer from './command/commandSlice';

export const store = configureStore({
    reducer: {
        commands: commandsReducer,
    },
});