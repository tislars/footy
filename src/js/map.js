export const MAP_WIDTH = 800;
export const MAP_HEIGHT = 500;

/**
 * Helper function to draw a circle.
 * This remains an internal helper for map drawing, so it's not exported.
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
 * @param {number} x - The x-coordinate of the circle's center.
 * @param {number} y - The y-coordinate of the circle's center.
 * @param {number} radius - The radius of the circle.
 * @param {boolean} fill - True to fill the circle, false to just stroke it.
 */
function drawCircle(ctx, x, y, radius, fill) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  if (fill) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
}

/**
 * Draws the solid black background for the canvas.
 * This is now an internal function to drawMap.
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
 */
function drawBackground(ctx) {
  ctx.fillStyle = '#013220';
  ctx.fillRect(0, 0, MAP_WIDTH, MAP_HEIGHT);
}

/**
 * Draws the vertical white line in the center of the canvas.
 * This is now an internal function to drawMap.
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
 */
function drawCenterLine(ctx) {
  const canvasCenterX = MAP_WIDTH / 2;
  ctx.fillStyle = '#ffffffaa';
  ctx.fillRect(canvasCenterX - 2, 0, 4, MAP_HEIGHT);
}

/**
 * Draws the concentric circles in the center of the canvas.
 * This is now an internal function to drawMap.
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
 */
function drawCenterCircles(ctx) {
  const canvasCenterX = MAP_WIDTH / 2;
  const canvasCenterY = MAP_HEIGHT / 2;

  ctx.strokeStyle = '#ffffffaa';
  ctx.lineWidth = 4;
  drawCircle(ctx, canvasCenterX, canvasCenterY, 80, false);
  drawCircle(ctx, canvasCenterX, canvasCenterY, 10, false);
  ctx.fillStyle = '#000';
  drawCircle(ctx, canvasCenterX, canvasCenterY, 8, true);
}

/**
 * Main function to draw all components of the game map onto the canvas context.
 * This is the primary export for map drawing.
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
 */
export function drawMap(ctx) {
  drawBackground(ctx);
  drawCenterLine(ctx);
  drawCenterCircles(ctx);
}
