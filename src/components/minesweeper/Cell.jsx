import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { loose, getValue } from "../../state/minesweeper/mineSlice";

export default function Cell({x, y}) {
    const dispatch = useDispatch();
    const value = useSelector(state => getValue(state, x, y));
    const lost = useSelector(state => state.minesweeper.lost);
    const length = useSelector(state => state.minesweeper.map.length);

    const clickHandler = (e) => {
        console.log('click');
        const cell = e.target;
        
        cell.classList.remove('closed');
        cell.classList.add('open');
        
        switch(value) {
            case -1:
                cell.innerText = '*';
                if(!lost) dispatch(loose());
                break;
            case 0:
                if(!lost) openArea();
                break;
            default:
                if(!lost) cell.innerText = value;
                break;
        }
    };

    const openArea = () => {
        const deltas = [
            [-1, -1], [-1, 0], [-1, 1],
            [0,  -1],          [0,  1],
            [1,  -1], [1,  0], [1,  1],
        ];

        const checkCell = (x, y) => 
            x >= 0 && x < length &&
            y >= 0 && y < length;

        for(let [dx, dy] of deltas) {
            const nx = x + dx, ny = y + dy;
            
            if(checkCell(nx, ny)) {
                const neighbour = document.getElementById(`cell_${nx}_${ny}`);
                
                if(neighbour.classList.contains('closed')) neighbour.click();
            }
        }
    };

    useEffect(() => {
        document.getElementById(`cell_${x}_${y}`).addEventListener('click', clickHandler)
        
        return () => document.getElementById(`cell_${x}_${y}`).removeEventListener('click', clickHandler);
    });
    
    useEffect(() => {
        if(lost) {
            const cell = document.getElementById(`cell_${x}_${y}`);
            cell.removeEventListener('click', clickHandler);
            if(value === -1) cell.innerText = '*'; 
        }
    }, [lost])

    return (
        <div className='cell closed' id={`cell_${x}_${y}`} />
    )    
}