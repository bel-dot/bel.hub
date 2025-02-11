import { useSelector } from "react-redux"


export default function Interface() {
    const playerScore = useSelector(state => state.pong.playerScore); 
    const computerScore = useSelector(state => state.pong.computerScore);

    return (
        <div id="pong-interface">
            <span id="player-score">{playerScore}</span>
            <div id="pong-line" />
            <span id="computer-score">{computerScore}</span>
        </div>
    )
}