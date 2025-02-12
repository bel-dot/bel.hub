import { useSelector } from 'react-redux';
import './ConsoleOutput.scss';


function ConsoleOutput() {
    const text = useSelector(state => state.commands.consoleText);

    return (
        <div id='console-output' style={{ whiteSpace: 'pre-line' }}>
            {text}
        </div>
    );
}

export default ConsoleOutput;