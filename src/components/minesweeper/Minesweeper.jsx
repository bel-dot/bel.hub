import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generate } from "../../state/minesweeper/mineSlice";
import { quit } from '../../state/command/commandSlice';
import Cell from "./Cell";
import './Minesweeper.scss';

export default function Minesweeper() {
    const dispatch = useDispatch();
    const lost = useSelector(state => state.minesweeper.lost);
    const cells = () => {
        const result = []; 

        for(let i = 0; i < 16; i++) {
            const row = [];
            for(let j = 0; j < 16; j++) {
                row.push(<Cell x={i} y={j} key={`${i}${j}`} />);
            }
            
            result.push(row);
            result.push(<div className='clear' />);
        }
        
        return result;
    };
    
    useEffect(() => {
        dispatch(generate());
        
        const handleKey = (e) => {
            switch(e.key.toLowerCase()) {
                case 'q':
                    dispatch(quit());
                    break;
                case 'r':
                    dispatch(generate());
                    document.querySelectorAll('.cell').forEach(cell => {
                        cell.classList.remove('open');
                        cell.classList.add('closed');
                        cell.innerText = '';
                    });
                    break;
            }
        }
        
        window.addEventListener('keydown', handleKey);
        
        return () => window.removeEventListener('keydown', handleKey);
    }, [dispatch]);
    
    return (
        <div id='minesweeper'>
            {cells()}
        </div>
    );
}