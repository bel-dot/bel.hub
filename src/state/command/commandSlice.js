import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

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
        }
    },
});

export const { unknown, help, about, echo } = commandSlice.actions;

export default commandSlice.reducer;