import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { start } from "../state/command/commandSlice";
import "./StartScreen.scss";

// Декларативний конфіг завантаження замість спагетті-таймаутів
const BOOT_STEPS = [
  { text: "Starting Bel.Hub...\n", delay: 1000 },
  { text: "Loading React components...", delay: 1500 },
  { text: " Done.\n", delay: 2500 },
  { text: "Creating Redux store...", delay: 3000 },
  { text: " Done.\n", delay: 4000 },
  { text: "Loading stylesheets...", delay: 4500 },
  { text: " Done.\n", delay: 5500 },
  { text: "Deploying...", delay: 6000 },
];

export default function StartScreen() {
  const dispatch = useDispatch();
  const [logs, setLogs] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleFinish = useCallback(() => {
    setIsVisible(false);
    dispatch(start());
  }, [dispatch]);

  useEffect(() => {
    const timeouts = [];

    // Декларативне планування кроків
    BOOT_STEPS.forEach(({ text, delay }) => {
      timeouts.push(
        setTimeout(() => {
          setLogs((prev) => prev + text);
        }, delay)
      );
    });

    // Очищення екрана та запуск
    timeouts.push(
      setTimeout(() => {
        setLogs("");
        setIsVisible(false);
      }, 9000)
    );

    timeouts.push(setTimeout(handleFinish, 10000));

    // Обробник клавіші Skip
    const handleKeyDown = (e) => {
      if (e.key === " ") {
        timeouts.forEach(clearTimeout);
        handleFinish();
      } else {
        setShowHint(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      timeouts.forEach(clearTimeout);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleFinish]);

  if (!isVisible) return null;

  return (
    <div>
      <div style={{ whiteSpace: "pre-line" }} id="start-screen">
        {logs}
      </div>
      <span
        id="skip-hint"
        style={{ visibility: showHint ? "visible" : "hidden" }}
      >
        Press Space to skip.
      </span>
    </div>
  );
}