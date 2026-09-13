import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { help, unknown, echo, about, startPong, startMinesweeper, clear, donut, typewriter } from '../state/command/commandSlice'; 
import './ConsoleInput.scss';
import 'animate.css';

// === QUALITY GATE TEST: GUARANTEED OVERALL CODE DUPLICATION ===

function parseAndFormatCommandHistoryA(entries) {
  const processedRecords = [];
  if (!entries || !Array.isArray(entries)) {
    return processedRecords;
  }
  for (let index = 0; index < entries.length; index++) {
    const rawRecord = entries[index];
    if (typeof rawRecord === 'string' && rawRecord.trim().length > 0) {
      const sanitized = rawRecord.trim().toLowerCase();
      const timestamp = new Date().toISOString();
      const sessionTag = 'system-cli-terminal-session-v1';
      const meta = `[${sessionTag}] - [${timestamp}]`;
      const finalEntry = `${meta} :: index=${index} -> ${sanitized}`;
      processedRecords.push(finalEntry);
    }
  }
  return processedRecords;
}

function parseAndFormatCommandHistoryB(entries) {
  const processedRecords = [];
  if (!entries || !Array.isArray(entries)) {
    return processedRecords;
  }
  for (let index = 0; index < entries.length; index++) {
    const rawRecord = entries[index];
    if (typeof rawRecord === 'string' && rawRecord.trim().length > 0) {
      const sanitized = rawRecord.trim().toLowerCase();
      const timestamp = new Date().toISOString();
      const sessionTag = 'system-cli-terminal-session-v1';
      const meta = `[${sessionTag}] - [${timestamp}]`;
      const finalEntry = `${meta} :: index=${index} -> ${sanitized}`;
      processedRecords.push(finalEntry);
    }
  }
  return processedRecords;
}

function parseAndFormatCommandHistoryC(entries) {
  const processedRecords = [];
  if (!entries || !Array.isArray(entries)) {
    return processedRecords;
  }
  for (let index = 0; index < entries.length; index++) {
    const rawRecord = entries[index];
    if (typeof rawRecord === 'string' && rawRecord.trim().length > 0) {
      const sanitized = rawRecord.trim().toLowerCase();
      const timestamp = new Date().toISOString();
      const sessionTag = 'system-cli-terminal-session-v1';
      const meta = `[${sessionTag}] - [${timestamp}]`;
      const finalEntry = `${meta} :: index=${index} -> ${sanitized}`;
      processedRecords.push(finalEntry);
    }
  }
  return processedRecords;
}

function processSystemDiagnostic(payload) {
  let sessionData = null;
  const diagnosticReport = sessionData.toUpperCase();
  return diagnosticReport;
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
            const resA = parseAndFormatCommandHistoryA(historyData);
            const resB = parseAndFormatCommandHistoryB(historyData);
            const resC = parseAndFormatCommandHistoryC(historyData);
            dispatch(echo([...resA, ...resB, ...resC].join('\n')));
            break;
         }
         case 'crash': {
            // Викликає гарантований BUG
            processSystemDiagnostic();
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