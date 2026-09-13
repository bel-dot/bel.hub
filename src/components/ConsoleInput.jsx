import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { help, unknown, echo, about, startPong, startMinesweeper, clear, donut, typewriter } from '../state/command/commandSlice'; 
import './ConsoleInput.scss';
import 'animate.css';

function formatCommandHistory(entries, sessionTag = 'default') {
  if (!Array.isArray(entries)) {
    return [];
  }

  const timestamp = new Date().toISOString();

  return entries
    .filter((entry) => typeof entry === 'string' && entry.trim().length > 0)
    .map((entry, index) => {
      const sanitized = entry.trim().toLowerCase();
      const meta = `[system-cli-terminal-${sessionTag}] - [${timestamp}]`;
      return `${meta} :: index=${index} -> ${sanitized}`;
    });
}

function processSystemDiagnostic(payload) {
  if (!payload || typeof payload !== 'string') {
    return 'SYSTEM_DIAGNOSTIC: No valid payload provided';
  }
  return payload.toUpperCase();
}

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
      const command = input.split(' '); 
      switch(command[0].toLowerCase()) {
         case 'about':
            dispatch(about());
            break;
         case 'help':
            dispatch(help());
            break;
         case 'echo':
            dispatch(echo(command.slice(1).join(' ')));
            break;
         case 'pong':
            dispatch(startPong());
            break;
         case 'minesweeper':
            dispatch(startMinesweeper());
            break;
         case 'clear':
            dispatch(clear());
            break;
         case 'typewriter':
            setTimeout(() => dispatch(typewriter(isNaN(command[1]) ? 72 : command[1])), 100);
            break;
         case 'donut':
            dispatch(clear());
            document.getElementById('console-output').style.whiteSpace = 'pre';
            donutInterval.current = setInterval(() => dispatch(donut()), 50);
            break;
         case 'history': {
            const historyData = ['help', 'about', 'clear', 'echo test'];
            const resA = parseAndFormatCommandHistory(historyData);
            const resB = parseAndFormatCommandHistory(historyData);
            const resC = parseAndFormatCommandHistory(historyData);
            dispatch(echo([...resA, ...resB, ...resC].join('\n')));
            break;
         }
         case 'crash': {
            // Безпечний виклик з передачею значення
            const statusReport = processSystemDiagnostic('cli-kernel-ok');
            dispatch(echo(statusReport));
            break;
         }

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