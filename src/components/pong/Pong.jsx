import PlayerPaddle from "./PlayerPaddle";
import Interface from "./Interface";
import ComputerPaddle from "./ComputerPaddle";
import Ball from "./Ball";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { quit } from '../../state/command/commandSlice';
import { playerWon, computerWon, reset } from '../../state/pong/pongSlice';
import './Pong.scss';

export default function Pong() {
    const dispatch = useDispatch(); 
    const [position, setPosition] = useState(Math.round(window.innerHeight / 2));
    const [ball, setBall] = useState({
        x: Math.round(window.innerWidth / 2),
        y: Math.round(window.innerHeight / 2),
        dx: 5,
        dy: 5,
    });
    const [computerPos, setComputerPos] = useState(Math.round(window.innerHeight / 2));
    let pause = useRef(false);
    let requestRef = useRef(null);
    let comRequestRef = useRef(null);

    useEffect(() => {
        window.addEventListener("keydown", (event) => {
            if(event.key.toLowerCase() === 'q') {
                dispatch(quit()); 
                dispatch(reset());
            } 
        })
    })


    useEffect(() => {
        const movePaddle = () => {
            setComputerPos(prev => {
                let newPos = prev;
                if(ball.y < newPos + 75 && newPos > 0) newPos -= 5;
                if(ball.y > newPos + 225 && newPos < window.innerHeight - 150) newPos += 5;
                return newPos;
            });
            
            comRequestRef.current = requestAnimationFrame(movePaddle);
        };

        comRequestRef.current = requestAnimationFrame(movePaddle);
        return () => cancelAnimationFrame(comRequestRef.current);
    });
    
    const moveBall = () => {
        setBall((prev) => {
            let newX = prev.x + prev.dx;
            let newY = prev.y + prev.dy;
            let newDx = prev.dx;
            let newDy = prev.dy;
            
            const isColliding = (
                newX <= 70 && prev.x >= 50 && newY >= position && newY <= position + 150
            ) || (
                newX >= window.innerWidth - 70 && prev.x <= window.innerWidth - 50 && newY >= computerPos && newY <= computerPos + 150
            );
            
            if(isColliding) {
                newDx *= -1;
                newX += newDx;
            }

            if(newY < 0) {
                newDy *= -1;
            }
            else if(newY > window.innerHeight - 20) {
                newDy *= -1;
            }
            return {x: newX, y: newY, dx: newDx, dy: newDy};
        });
        requestRef.current = requestAnimationFrame(moveBall);
    };
    useEffect(() => {
        requestRef.current = requestAnimationFrame(moveBall);
        return () => cancelAnimationFrame(requestRef.current);
    });
    
    useEffect(() => {
        const resetBall = () => {
            cancelAnimationFrame(requestRef.current);
            setBall(() => {
                return {
                    x: Math.round(window.innerWidth / 2),
                    y: Math.round(window.innerHeight / 2),
                    dx: Math.random() > 0.5 ? 5 : -5,
                    dy: Math.random() > 0.5 ? 5 : -5,
                }
            });
        }
        if(ball.x <= 0) {
            resetBall();
            dispatch(playerWon());
        }
        else if(ball.x >= window.innerWidth) {
            resetBall();
            dispatch(computerWon());
        }
    });

    return (
        <div id="pong-screen">
            <PlayerPaddle position={position} setPosition={setPosition} />
            <Interface />
            <Ball x={ball.x} y={ball.y} pause={pause.current} />
            <ComputerPaddle position={computerPos} />
        </div>
    );
}