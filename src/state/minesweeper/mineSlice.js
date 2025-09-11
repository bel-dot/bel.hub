import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bombs: 30,
    lost: false,
    map: [],
};


const mineSlice = createSlice({
    name: "minesweeper",
    initialState,
    reducers: {
        generate: (state) => {
            state.lost = false;
            state.map = Array.from({length: 16}, () => Array(16).fill(0));

            const deltas = [
                [-1, -1], [-1, 0], [-1, 1],
                [0,  -1],          [0,  1],
                [1,  -1], [1,  0], [1,  1],
            ];

            const checkCell = (x, y) => 
                x >= 0 && x < state.map.length &&
                y >= 0 && y < state.map[x].length &&
                state.map[x][y] >= 0;

            const incrementArea = (x, y) => {
                for(let [dx, dy] of deltas) {
                    let nx = x + dx, ny = y + dy;
                    
                    if(checkCell(nx, ny)) state.map[nx][ny]++;
                }
            }

            for(let i = state.bombs; i >= 0;) {
                const x = Math.floor(Math.random() * 15);
                const y = Math.floor(Math.random() * 15);
                
                if(state.map[x][y] === -1) continue;
                else {
                    state.map[x][y] = -1;
                    incrementArea(x, y);
                    i--;
                }
            }
        },
        loose: (state) => {
            state.lost = true;
        },
    },
});

export const getValue = (state, x, y) =>
    state.minesweeper.map[x]?.[y]; // safe indexed read [6]

export const { generate, loose } = mineSlice.actions;

export default mineSlice.reducer;