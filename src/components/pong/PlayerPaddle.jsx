import { useEffect, useState } from "react"

export default function PlayerPaddle() {
    const [position, setPosition] = useState(Math.round(window.innerHeight / 2));
    const [keysPressed, setKeysPressed] = useState({ ArrowUp: false, ArrowDown: false });

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
        };

        const interval = setInterval(movePaddle, 8); // ~120 FPS
        return () => clearInterval(interval);
    }, [keysPressed]);


    return (
        <div id="player-paddle" style={{
            top: `${position}px`,
        }} />
    )
}