import React from 'react';
import './CommandInput.scss'

class CommandInput extends React.Component {
   constructor(props) {
    super(props);
   } 
    
   render() {
      return (
         <div className="input-field">
            <span className="arrow">&gt;</span>
            <input type="text" className="input-el" />
         </div>
      );
   }
}

export default CommandInput;