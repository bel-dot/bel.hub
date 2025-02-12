import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    showConsole: true,
    showPong: false,
    consoleText: ``,
};

function printConsole(text, state) {
    state.consoleText += '> ' + document.getElementById('input-el').value + '\n';
    state.consoleText += text + '\n';
    console.log(state.consoleText);
}

export const startPong = createAsyncThunk(
    'commands/pong',
    async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
);

const commandSlice = createSlice({
    name: "commands",
    initialState,
    reducers: {
        unknown: (state) => {
            printConsole("Error: Command unknown!", state);
        },
        help: (state) => {
            printConsole(`about - prints info about the program
                pong - launches pong.
                echo <message> - outputs <message>
                clear - clears the console output
                help - displays this message`, state);
        },
        about: (state) => {
            printConsole(`Bel.Hub v0.1
                Created by Artem Biliakov (BelDot) in 2025.
                Made with Vite, React and Redux. Deployed via GitHub Pages.
                Idea inspired by Linux and Bash.`, state)
        },
        echo: (state, action) => {
            printConsole(action.payload, state);
        },
        clear: (state) => {
            state.consoleText = '';
        },
        quit: (state) => {
            state.showConsole = true;
            state.showPong = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(startPong.pending, (state) => {
                printConsole("Launching pong...", state);
            })
            .addCase(startPong.fulfilled, (state) => {
                state.showConsole = false;
                state.showPong = true;
            });
    }
});

export const { unknown, help, about, echo, pong, quit, clear } =
  commandSlice.actions;

export default commandSlice.reducer;