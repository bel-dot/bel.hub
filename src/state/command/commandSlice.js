import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showConsole: true,
    showPong: false,
}

function printConsole(text) {
    const output = document.getElementById('console-output');
    output.innerText += '> ' + document.getElementById('input-el').value + '\n';
    output.innerText += text + '\n';
}

const commandSlice = createSlice({
    name: "commands",
    initialState,
    reducers: {
        unknown: () => {
            printConsole("Error: Command unknown!");
        },
        help: () => {
            printConsole(`about - prints info about the program
                pong - launches pong, obviously.
                echo <message> - outputs <message>
                help - displays this message`);
        },
        about: () => {
            printConsole(`Bel.Hub v0.1
                Created by Artem Biliakov (BelDot) in 2025.
                Made with Vite, React and Redux. Deployed via GitHub Pages.
                Idea inspired by Linux and Bash.`)
        },
        echo: (_state, action) => {
            printConsole(action.payload);
        },
        pong: (state) => {
            printConsole("Loading pong...");
            state.showConsole = false;
            state.showPong = true;
        },
        quit: (state) => {
            state.showConsole = true;
            state.showPong = false;
        }
    },
});

export const { unknown, help, about, echo, pong, quit } = commandSlice.actions;

export default commandSlice.reducer;