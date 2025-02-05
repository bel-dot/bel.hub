import { useEffect, useRef } from 'react';
import './ConsoleInput.scss'

function ConsoleInput() {
   const inputEl = useRef(null);

   useEffect(() => {
      window.addEventListener("load", () => {
         inputEl.current.focus();
      });
   }, []);
   
   return (
      <div id='console-input'>
         <span className='arrow'>&gt;</span>
         <input type='text' ref={inputEl} id='input-el' />
      </div>
   )
}

export default ConsoleInput;