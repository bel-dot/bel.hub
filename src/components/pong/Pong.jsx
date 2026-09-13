import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import PlayerPaddle from "./PlayerPaddle";
import Interface from "./Interface";
import ComputerPaddle from "./ComputerPaddle";
import Ball from "./Ball";
import { quit } from "../../state/command/commandSlice";
import { playerWon, computerWon, reset } from "../../state/pong/pongSlice";
import {
  updateComputerPaddle,
  calculateNextBall,
  getInitialBallState,
} from "./pongEngine";
import "./Pong.scss";

export default function Pong() {
  const dispatch = useDispatch();

  const [position, setPosition] = useState(() => Math.round(window.innerHeight / 2));
  const [computerPos, setComputerPos] = useState(() => Math.round(window.innerHeight / 2));
  const [ball, setBall] = useState(() => getInitialBallState(window.innerWidth, window.innerHeight));

  const requestRef = useRef(null);

  // 1. Клавіатура
  useEffect(() => {
    const handleQuit = (e) => {
      if (e.key.toLowerCase() === "q") {
        dispatch(quit());
        dispatch(reset());
      }
    };
    window.addEventListener("keydown", handleQuit);
    return () => window.removeEventListener("keydown", handleQuit);
  }, [dispatch]);

  // 2. Ігровий крок
  useEffect(() => {
    const tick = () => {
      setComputerPos((prev) =>
        updateComputerPaddle(prev, ball.y, window.innerHeight)
      );

      setBall((prev) =>
        calculateNextBall(prev, position, computerPos, window.innerWidth, window.innerHeight)
      );

      requestRef.current = requestAnimationFrame(tick);
    };

    requestRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(requestRef.current);
  }, [ball.y, position, computerPos]);

  // 3. Перевірка рахунку
  useEffect(() => {
    if (ball.x <= 0) {
      setBall(getInitialBallState(window.innerWidth, window.innerHeight));
      dispatch(playerWon());
    } else if (ball.x >= window.innerWidth) {
      setBall(getInitialBallState(window.innerWidth, window.innerHeight));
      dispatch(computerWon());
    }
  }, [ball.x, dispatch]);

  return (
    <div id="pong-screen">
      <PlayerPaddle position={position} setPosition={setPosition} />
      <Interface />
      <Ball x={ball.x} y={ball.y} pause={false} />
      <ComputerPaddle position={computerPos} />
    </div>
  );
}