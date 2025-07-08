import { shootBall } from './ball.js';
import { MAP_HEIGHT, MAP_WIDTH } from './map.js';

const PLAYER_SIZE = 8;
const PLAYER_SPEED = 0.5;

let player = {
  x: MAP_WIDTH / 2,
  y: MAP_HEIGHT / 2,
  size: PLAYER_SIZE,
  color: '#b0a',
  dx: 0,
  dy: 0,
  rotation: 0,
};

export function getPlayerRotation() {
  return player.rotation;
}

export function getPlayerPosition() {
  return { x: player.x, y: player.y };
}

export function drawPlayer(ctx) {
  ctx.fillStyle = '#ffffff4d';
  ctx.beginPath();
  ctx.arc(player.x, player.y, PLAYER_SIZE * 3.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();

  ctx.translate(player.x, player.y);
  ctx.rotate(player.rotation);

  ctx.fillStyle = player.color;
  ctx.beginPath();
  ctx.moveTo(PLAYER_SIZE * 2 - 8, 0);
  ctx.lineTo(-6, -PLAYER_SIZE);
  ctx.lineTo(-6, PLAYER_SIZE);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

export function updatePlayer() {
  player.x += player.dx;
  player.y += player.dy;

  const effectivePlayerRadius = PLAYER_SIZE * 2;

  if (player.x - effectivePlayerRadius < 0) {
    player.x = effectivePlayerRadius;
  }
  if (player.x + effectivePlayerRadius > MAP_WIDTH) {
    player.x = MAP_WIDTH - effectivePlayerRadius;
  }
  if (player.y - effectivePlayerRadius < 0) {
    player.y = effectivePlayerRadius;
  }
  if (player.y + effectivePlayerRadius > MAP_HEIGHT) {
    player.y = MAP_HEIGHT - effectivePlayerRadius;
  }
}

export function updatePlayerRotation(mouseX, mouseY) {
  const dx = mouseX - player.x;
  const dy = mouseY - player.y;

  player.rotation = Math.atan2(dy, dx);
}

export function handleKeyDown(key) {
  switch (key) {
    case 'w':
      player.dy = -PLAYER_SPEED;
      break;
    case 's':
      player.dy = PLAYER_SPEED;
      break;
    case 'a':
      player.dx = -PLAYER_SPEED;
      break;
    case 'd':
      player.dx = PLAYER_SPEED;
      break;
  }
}

export function handleKeyUp(key) {
  switch (key) {
    case 'w':
    case 's':
      player.dy = 0;
      break;
    case 'a':
    case 'd':
      player.dx = 0;
      break;
  }
}
