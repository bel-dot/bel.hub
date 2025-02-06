import PlayerPaddle from "./PlayerPaddle";
import Interface from "./Interface";
import ComputerPaddle from "./ComputerPaddle";
import Ball from "./Ball";

export default function Pong() {
    return (
        <div id="pong-screen">
            <PlayerPaddle />
            <Interface />
            <Ball />
            <ComputerPaddle />
        </div>
    );
}