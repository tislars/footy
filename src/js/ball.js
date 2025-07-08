import { MAP_HEIGHT, MAP_WIDTH } from './map.js';

let ball = {
  x: MAP_WIDTH / 2,
  y: MAP_HEIGHT / 2,
  color: '#fff',
  dx: 0,
  dy: 0,
  radius: 8,
};

const BALL_SIZE = 6;
const BALL_MOVE_DISTANCE = 50;
const INITIAL_BALL_SPEED = 15;
const FRICTION = 0.94;
const MIN_SPEED_THRESHOLD = 0.1;

export function drawBall(ctx) {
  ctx.fillStyle = ball.color;
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, BALL_SIZE, 0, Math.PI * 2);
  ctx.fill();
}

/**
 * Applies an initial impulse to the ball, setting it in motion.
 * @param {number} direction - The angle in radians (-PI to PI) for the initial impulse.
 * @param {number} startX - The X position from where the ball starts.
 * @param {number} startY - The Y position from where the ball starts.
 */
export function shootBall(direction, startX, startY) {
  ball.x = startX;
  ball.y = startY;

  ball.dx = INITIAL_BALL_SPEED * Math.cos(direction);
  ball.dy = INITIAL_BALL_SPEED * Math.sin(direction);
}

/**
 * Updates the ball's position and applies friction to slow it down.
 */
export function updateBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  ball.dx *= FRICTION;
  ball.dy *= FRICTION;

  if (
    Math.abs(ball.dx) < MIN_SPEED_THRESHOLD &&
    Math.abs(ball.dy) < MIN_SPEED_THRESHOLD
  ) {
    ball.dx = 0;
    ball.dy = 0;
    ball.active = false;
  }

  if (ball.x - ball.radius < 0) {
    ball.x = ball.radius;
    ball.dx *= -1;
  } else if (ball.x + ball.radius > MAP_WIDTH) {
    ball.x = MAP_WIDTH - ball.radius;
    ball.dx *= -1;
  }

  if (ball.y - ball.radius < 0) {
    ball.y = ball.radius;
    ball.dy *= -1;
  } else if (ball.y + ball.radius > MAP_HEIGHT) {
    ball.y = MAP_HEIGHT - ball.radius;
    ball.dy *= -1;
  }
}

export function getBallPosition() {
  return { x: ball.x, y: ball.y, radius: ball.radius };
}

export function setBallPosition(x, y) {
  ball.x = x;
  ball.y = y;
}
