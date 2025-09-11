import ConsoleInput from './components/ConsoleInput'
import ConsoleOutput from './components/ConsoleOutput';
import Pong from './components/pong/Pong';
import StartScreen from './components/StartScreen';
import Typewriter from './components/typewriter/Typewriter';
import { useSelector } from 'react-redux';
import './App.css';
import Minesweeper from './components/minesweeper/Minesweeper';

function App() {
  const startScreen = useSelector(state => state.commands.showStartScreen);
  const console = useSelector((state) => state.commands.showConsole);
  const pong = useSelector((state) => state.commands.showPong);
  const minesweeper = useSelector((state) => state.commands.showMinesweeper);
  const typewriter = useSelector((state) => state.commands.showTypewriter);

  return (
    <>
      {
        startScreen ? (
          <StartScreen />
        ) : ''
      }
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
      {
        minesweeper? (
          <Minesweeper/>
        ) : ''
      }
      {
        typewriter ? (
          <Typewriter />
        ) : ''
      }
    </>
  )
}

export default App
