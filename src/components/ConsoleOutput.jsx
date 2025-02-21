import { useSelector } from 'react-redux';
import './ConsoleOutput.scss';
import 'animate.css';

function ConsoleOutput() {
    const text = useSelector(state => state.commands.consoleText);

    return (
        <div id='console-output' className='animate__animated animate__slideInDown animate__fast' style={{ whiteSpace: 'pre-line' }}>
            {text}
        </div>
    );
}

export default ConsoleOutput;