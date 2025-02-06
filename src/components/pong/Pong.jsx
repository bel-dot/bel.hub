import PlayerPaddle from "./PlayerPaddle";
import Interface from "./Interface";
import ComputerPaddle from "./ComputerPaddle";
import Ball from "./Ball";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { quit } from '../../state/command/commandSlice';

export default function Pong() {
    const dispatch = useDispatch(); 

    useEffect(() => {
        window.addEventListener("keydown", (event) => {
            if(event.key.toLowerCase() === 'q') {
               dispatch(quit()); 
            } 
        })
    })

    return (
        <div id="pong-screen">
            <PlayerPaddle />
            <Interface />
            <Ball />
            <ComputerPaddle />
        </div>
    );
}