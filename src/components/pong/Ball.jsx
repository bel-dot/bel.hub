import { useState, useEffect, useRef } from "react";

export default function Ball() {
    const [x, setX] = useState(Math.round(window.innerWidth / 2));
    const [y, setY] = useState(Math.round(window.innerHeight / 2));
    const [move, setMove] = useState(false);
    let invertX = useRef(false);
    let invertY = useRef(false);
    
    useEffect(() => {
        const handleEnterDown = (event) => {
            if(event.key === 'Enter') {
                setMove((prev) => !prev);
            }
        }
        
        window.addEventListener("keydown", handleEnterDown);
        
        return () => window.removeEventListener("keydown", handleEnterDown);
    }, []);

    useEffect(() => {
        const moveBall = () => {
            setX((prev) => {
                let newX = prev;
                if(newX < 0) {
                    invertX.current = false;
                }
                else if(newX > window.innerWidth - 20) {
                    invertX.current = true;
                }
                if(invertX.current) {
                    newX -= 5;
                }
                else newX += 5;
                return newX;
            });
            setY((prev) => {
                let newY = prev;
                if(newY < 0) {
                    invertY.current = false;
                }
                else if(newY > window.innerHeight - 20) {
                    invertY.current = true;
                }
                if(invertY.current) {
                    newY -= 5;
                }
                else newY += 5;
                return newY;
            });
        };

        const interval = setInterval(moveBall, 8); // ~120 FPS
        return () => clearInterval(interval);
    }, [move]);


    return (
        <div id='pong-ball' style={{
            top: `${y}px`,
            left: `${x}px`,
        }} />
    );
}