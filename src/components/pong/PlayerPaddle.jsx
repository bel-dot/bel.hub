import { useEffect, useState, useRef } from "react"

export default function PlayerPaddle({position, setPosition}) {
    const [keysPressed, setKeysPressed] = useState({ ArrowUp: false, ArrowDown: false });
    let requestRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
          setKeysPressed((prev) => ({ ...prev, [event.key]: true }));
        }

        const handleKeyUp = (event) => {
          setKeysPressed((prev) => ({ ...prev, [event.key]: false }));
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
          window.removeEventListener("keydown", handleKeyDown);
          window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

  useEffect(() => {
    const movePaddle = () => {
      setPosition((prev) => {
          let newPos = prev;
          if (keysPressed.ArrowUp && newPos > 0) newPos -= 5;
          if (keysPressed.ArrowDown && newPos < window.innerHeight - 150) newPos += 5;
          return newPos;
        });
        requestRef.current = requestAnimationFrame(movePaddle);
      };
       
      requestRef.current = requestAnimationFrame(movePaddle);  
      return () => cancelAnimationFrame(requestRef.current);
    }, [keysPressed, setPosition]);


    return (
        <div id="player-paddle" style={{
            top: `${position}px`,
        }} />
    )
}