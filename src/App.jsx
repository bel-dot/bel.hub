import ConsoleInput from './components/ConsoleInput'
import ConsoleOutput from './components/ConsoleOutput';
import Pong from './components/pong/Pong';
import StartScreen from './components/StartScreen';
import { useSelector } from 'react-redux';
import './App.css';

function App() {
  const console = useSelector((state) => state.commands.showConsole);
  const pong = useSelector((state) => state.commands.showPong);

  return (
    <>
      <StartScreen />
      {
        console ? (
          <>
          <ConsoleOutput />
          <ConsoleInput />
          </>
        ) : ''
      }
      {
        pong ? (
          <Pong />
        ) : ''
      }
    </>
  )
}

export default App
