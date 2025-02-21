import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { help, unknown, echo, about, startPong, clear, donut } from '../state/command/commandSlice'; 
import './ConsoleInput.scss';
import 'animate.css';

function ConsoleInput() {
   const inputEl = useRef(null);
   const dispatch = useDispatch();
   let donutInterval = useRef(null);

   useEffect(() => {
      setTimeout(() => {
         inputEl.current.focus();
      }, 500);
   });
   
   const handleCommand = (input) => {
      if(donutInterval.current) {
         clearInterval(donutInterval.current);
         donutInterval.current = null;
         dispatch(clear());
         document.getElementById('console-output').style.whiteSpace = 'pre-line';
      }
      const command = input.split(' ')[0]; 
      switch(command.toLowerCase()) {
         case 'about':
            dispatch(about());
            break;
         case 'help':
            dispatch(help());
            break;
         case 'echo':
            dispatch(echo(input.split(' ').slice(1).join(' ')));
            break;
         case 'pong':
            dispatch(startPong());
            break;
         case 'clear':
            dispatch(clear());
            break;
         case 'donut':
            dispatch(clear());
            document.getElementById('console-output').style.whiteSpace = 'pre';
            donutInterval.current = setInterval(() => dispatch(donut()), 50);
            break;
         default:
            dispatch(unknown());
      }
   }
   
   return (
      <div id='console-input'>
         <span className='arrow'>&gt;</span>
         <input type='text' ref={inputEl} id='input-el' className='animate__animated animate__slideInUp animate__fast'
         onKeyDown={(event) => {
            if(event.key === 'Enter') {
               handleCommand(event.target.value);
               event.target.value = '';
            }
         }} />
      </div>
   )
}

export default ConsoleInput;