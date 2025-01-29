import React from 'react';
import './CommandInput.scss'

class CommandInput extends React.Component {
   constructor(props) {
    super(props);
   } 
   
   componentDidMount() {
      window.addEventListener("load", () => {
         document.getElementById('input-el').focus();
      })
   }
    
   render() {
      return (
         <div id="input-field">
            <span className="arrow">&gt;</span>
            <input type="text" className="input-el" id="input-el" />
         </div>
      );
   }
}

export default CommandInput;