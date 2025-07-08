import {
  drawBall,
  shootBall,
  setBallPosition,
  updateBall,
  getBallPosition,
} from './ball.js';
import { CANVAS_WIDTH, CANVAS_HEIGHT, drawMap } from './map.js';
import {
  drawPlayer,
  updatePlayer,
  updatePlayerRotation,
  handleKeyDown,
  handleKeyUp,
  getPlayerRotation,
  getPlayerPosition,
} from './player.js';
import { getDistance } from './utils.js';

let ctx;
let canvas;
let mouseX = 0;
let mouseY = 0;

/**
 * The main game loop. This function is called repeatedly to update and draw the game.
 */
function gameLoop() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  drawMap(ctx);

  updatePlayerRotation(mouseX, mouseY);

  updateBall();
  drawBall(ctx);
  updatePlayer();
  drawPlayer(ctx);

  requestAnimationFrame(gameLoop);
}

/**
 * Handles mouse click to shoot the ball.
 * @param {MouseEvent} event - The mouseclick event object.
 */
function handleMouseClick(event) {
  const playerRotation = getPlayerRotation();
  const playerPos = getPlayerPosition();
  const ballPos = getBallPosition();

  const distance = getDistance(
    playerPos.x,
    playerPos.y,
    ballPos.x,
    ballPos.y
  );

  if (event.button === 0 && distance < 30) {
    shootBall(playerRotation, playerPos.x, playerPos.y);
  }
}

/**
 * Updates mouse coordinates relative to the canvas.
 * @param {MouseEvent} event - The mousemove event object.
 */
function handleMouseMove(event) {
  const rect = canvas.getBoundingClientRect();

  mouseX = event.clientX - rect.left;
  mouseY = event.clientY - rect.top;
}

/**
 * Initializes the canvas and starts the game.
 */
function initGame() {
  canvas = document.getElementById('game-canvas');
  if (!canvas) {
    console.error('Canvas element with ID "game-canvas" not found.');
    return;
  }

  ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error(
      '2D rendering context not supported on this canvas.'
    );
    return;
  }

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  window.addEventListener('keydown', (e) =>
    handleKeyDown(e.key.toLowerCase())
  );
  window.addEventListener('keyup', (e) =>
    handleKeyUp(e.key.toLowerCase())
  );

  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mousedown', handleMouseClick);

  requestAnimationFrame(gameLoop);
}

window.addEventListener('DOMContentLoaded', initGame);
