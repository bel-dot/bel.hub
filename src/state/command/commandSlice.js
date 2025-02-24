import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    showConsole: false,
    showPong: false,
    consoleText: ``,
    A: 1,
    B: 1,
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

/* Credits to a1k0n for the original JS code and the idea overall
 The code below is written by him, not me. */
const asciiframe = (state) => {
  // This is copied, pasted, reformatted, and ported directly from a1k0n's original
  // donut.c code
  var b = [];
  var z = [];
  state.A += 0.07;
  state.B += 0.03;
  var cA = Math.cos(state.A),
    sA = Math.sin(state.A),
    cB = Math.cos(state.B),
    sB = Math.sin(state.B);
  for (var k = 0; k < 1760; k++) {
    b[k] = k % 80 == 79 ? "\n" : " ";
    z[k] = 0;
  }
  for (var j = 0; j < 6.28; j += 0.07) {
    // j <=> theta
    var ct = Math.cos(j),
      st = Math.sin(j);
    for (var i = 0; i < 6.28; i += 0.02) {
      // i <=> phi
      var sp = Math.sin(i),
        cp = Math.cos(i),
        h = ct + 2, // R1 + R2*cos(theta)
        D = 1 / (sp * h * sA + st * cA + 5), // this is 1/z
        t = sp * h * cA - st * sA; // this is a clever factoring of some of the terms in x' and y'

      var x = 0 | (40 + 30 * D * (cp * h * cB - t * sB)),
        y = 0 | (12 + 15 * D * (cp * h * sB + t * cB)),
        o = x + 80 * y,
        N =
          0 |
          (8 *
            ((st * sA - sp * ct * cA) * cB -
              sp * ct * sA -
              st * cA -
              cp * ct * sB));
      if (y < 22 && y >= 0 && x >= 0 && x < 79 && D > z[o]) {
        z[o] = D;
        b[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
      }
    }
  }

  state.consoleText = b.join(""); // Outputting the result to the console.
}

const commandSlice = createSlice({
    name: "commands",
    initialState,
    reducers: {
        start: (state) => {
          state.showConsole = true;
        },
        unknown: (state) => {
            printConsole("Error: Command unknown!", state);
        },
        help: (state) => {
            printConsole(`about - prints info about the program
                pong - launches pong.
                donut - shows a donut (code by a1k0n)
                echo <message> - outputs <message>
                clear - clears the console output
                help - displays this message`, state);
        },
        about: (state) => {
            printConsole(`Bel.Hub v0.2
                Created by Artem Biliakov (BelDot) in 2025.
                Made with Vite, React and Redux. Deployed via GitHub Pages.
                Idea inspired by Linux and Bash.`, state)
        },
        echo: (state, action) => {
            printConsole(action.payload, state);
        },
        donut: (state) => {
          asciiframe(state);
        },
        clear: (state) => {
            state.consoleText = '';
            state.showDonut = false;
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
            })
    }
});

export const { unknown, help, about, echo, pong, quit, clear, donut, start } =
  commandSlice.actions;

export default commandSlice.reducer;