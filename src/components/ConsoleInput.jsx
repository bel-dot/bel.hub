import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { help, unknown, echo, about, startPong } from '../state/command/commandSlice'; 
import './ConsoleInput.scss'

function ConsoleInput() {
   const inputEl = useRef(null);
   const dispatch = useDispatch();

   useEffect(() => {
      window.addEventListener("load", () => {
         inputEl.current.focus();
      });
   }, []);
   
   const handleCommand = (input) => {
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
         default:
            dispatch(unknown());
      }
      
      event.target.value = '';
   }
   
   return (
      <div id='console-input'>
         <span className='arrow'>&gt;</span>
         <input type='text' ref={inputEl} id='input-el' onKeyDown={(event) => {
            if(event.key === 'Enter') {
               handleCommand(event.target.value);
            }
         }} />
      </div>
   )
}

export default ConsoleInput;