import { useEffect, useRef, useState } from "react";
import './Typewriter.scss';
import { quit } from "../../state/command/commandSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Typewriter() {
    const output = useRef(null);
    const fontSize = useSelector(state => state.commands.writerSize);
    const dispatch = useDispatch();
    
    const cursorBlink = () => {
        const cursor = document.getElementById('type-cursor');
        cursor.style.visibility == 'visible' ? 
        cursor.style.visibility = 'hidden' :
        cursor.style.visibility = 'visible';
    };

    const [interval, setInter] = useState();
    
    useEffect(() => {
        document.documentElement.style.setProperty('--font-size', `${fontSize}px`);

        window.addEventListener('keydown', (e) => {
            if(e.key === 'Escape') {
                clearInterval(interval);
                dispatch(quit());
            }
        });

    });

    const keyInput = (e) => {
        clearInterval(interval);
        const cursor = document.getElementById('type-cursor');
        cursor.style.visibility = 'visible';
        output.current.innerHTML = e.target.value + `<span id='type-cursor'></span>`;
        setInter(setInterval(cursorBlink, 1000));
    };
    
    return (
        <div id='typewriter'>
            <span> </span>
            <span id='type-output' ref={output}>
                <span id='type-cursor' />
            </span>
            <textarea id='type-input' onInput={keyInput} autoFocus />
        </div>
    )
}