import { useEffect, useRef } from 'react';
import './CommandInput.scss'

function CommandInput() {
   const inputEl = useRef(null);

   useEffect(() => {
      window.addEventListener("load", () => {
         inputEl.current.focus();
      });
   }, []);
   
   return (
      <div id='input-field'>
         <span className='arrow'>&gt;</span>
         <input type='text' ref={inputEl} id='input-el' />
      </div>
   )
}

export default CommandInput;