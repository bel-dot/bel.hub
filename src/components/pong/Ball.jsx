function Ball({x, y, pause}) {
    return (
        <div id='pong-ball' style={{
            top: `${y}px`,
            left: `${x}px`,
            visibility: pause ? "hidden" : "visible",
        }} />
    );
}

export default Ball;