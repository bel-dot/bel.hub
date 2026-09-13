const PADDLE_HEIGHT = 150;
const PADDLE_SPEED = 5;
const BALL_SPEED = 5;

export function updateComputerPaddle(prevY, ballY, screenHeight) {
  const isBallAbove = ballY < prevY + 75;
  if (isBallAbove && prevY > 0) {
    return prevY - PADDLE_SPEED;
  }

  const isBallBelow = ballY > prevY + 225;
  const isWithinScreen = prevY < screenHeight - PADDLE_HEIGHT;
  if (isBallBelow && isWithinScreen) {
    return prevY + PADDLE_SPEED;
  }

  return prevY;
}

function checkCollision(x, prevX, y, paddleY, isPlayer, screenWidth) {
  const isOutOfPaddleY = y < paddleY || y > paddleY + PADDLE_HEIGHT;
  if (isOutOfPaddleY) return false;

  if (isPlayer) {
    return x <= 70 && prevX >= 50;
  }

  const rightThreshold = screenWidth - 70;
  const rightPrevThreshold = screenWidth - 50;
  return x >= rightThreshold && prevX <= rightPrevThreshold;
}

export function calculateNextBall(prevBall, playerY, computerY, screenWidth, screenHeight) {
  let x = prevBall.x + prevBall.dx;
  let y = prevBall.y + prevBall.dy;
  let dx = prevBall.dx;
  let dy = prevBall.dy;

  const hitPlayer = checkCollision(x, prevBall.x, y, playerY, true, screenWidth);
  const hitComputer = checkCollision(x, prevBall.x, y, computerY, false, screenWidth);

  if (hitPlayer || hitComputer) {
    dx = -dx;
    x += dx;
  }

  const hitTop = y < 0;
  const hitBottom = y > screenHeight - 20;
  if (hitTop || hitBottom) {
    dy = -dy;
  }

  return { x, y, dx, dy };
}

export function getInitialBallState(screenWidth, screenHeight) {
  return {
    x: Math.round(screenWidth / 2),
    y: Math.round(screenHeight / 2),
    dx: Math.random() > 0.5 ? BALL_SPEED : -BALL_SPEED,
    dy: Math.random() > 0.5 ? BALL_SPEED : -BALL_SPEED,
  };
}