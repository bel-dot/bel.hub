import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { start } from '../state/command/commandSlice';
import './StartScreen.scss';

export default function StartScreen() {
    const screen = useRef(null);
    const dispatch = useDispatch();
    
    useEffect(() => {
        let timeouts = [];
        timeouts.push(setTimeout(() => {
            screen.current.innerText += 'Starting Bel.Hub...\n';
            console.log('Starting Bel.Hub...');
        }, 1000));
        timeouts.push(setTimeout(() => {
            screen.current.innerText += 'Loading React components...';
        }, 1500));
        timeouts.push(setTimeout(() => {
            screen.current.innerText += ' Done.\n';
        }, 2500));
        timeouts.push(setTimeout(() => {
            screen.current.innerText += 'Creating Redux store...';
        }, 3000));
        timeouts.push(setTimeout(() => {
            screen.current.innerText += ' Done.\n';
        }, 4000));
        timeouts.push(setTimeout(() => {
            screen.current.innerText += 'Loading stylesheets...';
        }, 4500));
        timeouts.push(setTimeout(() => {
            screen.current.innerText += ' Done.\n';
        }, 5500));
        timeouts.push(setTimeout(() => {
            screen.current.innerText += 'Deploying...';
        }, 6000));
        timeouts.push(setTimeout(() => {
            screen.current.innerText = '';
            screen.current.style.visibility = 'collapse';
        }, 9000));
        timeouts.push(setTimeout(() => {
           dispatch(start()); 
        }, 10000));
        
        return () => {
            timeouts.forEach(clearTimeout);
        }
    });
    
    return (
        <div ref={screen} style={{whiteSpace: 'pre-line'}} id='start-screen' />
    );
}