import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    playerScore: 0,
    computerScore: 0,
};

const pongSlice = createSlice({
    name: "pong",
    initialState,
    reducers: {
        playerWon: (state) => {
            state.playerScore++;
        },
        computerWon: (state) => {
            state.computerScore++;
        },
        reset: (state) => {
            state.playerScore = 0;
            state.computerScore = 0;
        }
    },
});

export const { playerWon, computerWon, reset } = pongSlice.actions;

export default pongSlice.reducer;