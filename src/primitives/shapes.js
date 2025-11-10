// primitives/shapes.js

/**
 * Creates a circle element
 * @param {number} x - Center X coordinate
 * @param {number} y - Center Y coordinate
 * @param {number} radius - Circle radius (must be positive)
 * @param {Object} options - Style options
 * @returns {Object} Circle element
 */
export function circle(x, y, radius, options = {}) {
  if (radius < 0) {
    throw new Error('Radius must be positive')
  }

  return {
    type: 'circle',
    x, y, radius,
    fill: options.fill || '#000000',
    stroke: options.stroke,
    strokeWidth: options.strokeWidth || 1,
    opacity: options.opacity ?? 1
  }
}

/**
 * Creates a rectangle element
 * @param {number} x - Top-left X coordinate
 * @param {number} y - Top-left Y coordinate
 * @param {number} width - Rectangle width
 * @param {number} height - Rectangle height
 * @param {Object} options - Style options
 * @returns {Object} Rectangle element
 */
export function rectangle(x, y, width, height, options = {}) {
  // 1. Validate inputs
  if (typeof x !== 'number' || !isFinite(x)) {
    throw new Error('x must be a finite number')
  }
  if (typeof y !== 'number' || !isFinite(y)) {
    throw new Error('y must be a finite number')
  }
  if (typeof width !== 'number' || width < 0) {
    throw new Error('width must be a non-negative number')
  }
  if (typeof height !== 'number' || height < 0) {
    throw new Error('height must be a non-negative number')
  }

  // 2. Create element object
  return {
    type: 'rect',
    x, y, width, height,
    fill: options.fill || '#000000',
    stroke: options.stroke,
    strokeWidth: options.strokeWidth || 1,
    cornerRadius: options.cornerRadius || 0,
    opacity: options.opacity ?? 1,
    shadow: options.shadow || null
  }
}

/**
 * Creates a line element
 * @param {number} x1 - Start X coordinate
 * @param {number} y1 - Start Y coordinate
 * @param {number} x2 - End X coordinate
 * @param {number} y2 - End Y coordinate
 * @param {Object} options - Style options
 * @returns {Object} Line element
 */
export function line(x1, y1, x2, y2, options = {}) {
  if (typeof x1 !== 'number' || !isFinite(x1)) {
    throw new Error('x1 must be a finite number');
  }
  if (typeof y1 !== 'number' || !isFinite(y1)) {
    throw new Error('y1 must be a finite number');
  }
  if (typeof x2 !== 'number' || !isFinite(x2)) {
    throw new Error('x2 must be a finite number');
  }
  if (typeof y2 !== 'number' || !isFinite(y2)) {
    throw new Error('y2 must be a finite number');
  }

  return {
    type: 'line',
    x1,
    y1,
    x2,
    y2,
    stroke: options.stroke || '#000000',
    strokeWidth: options.strokeWidth || 1,
    opacity: options.opacity ?? 1,
    cap: options.cap || 'butt', // butt, round, square
  };
}

/**
 * Creates an ellipse element
 * @param {number} x - Center X coordinate
 * @param {number} y - Center Y coordinate
 * @param {number} rx - Radius X (must be positive)
 * @param {number} ry - Radius Y (must be positive)
 * @param {Object} options - Style options
 * @returns {Object} Ellipse element
 */
export function ellipse(x, y, rx, ry, options = {}) {
  if (typeof x !== 'number' || !isFinite(x)) {
    throw new Error('x must be a finite number');
  }
  if (typeof y !== 'number' || !isFinite(y)) {
    throw new Error('y must be a finite number');
  }
  if (typeof rx !== 'number' || rx < 0) {
    throw new Error('rx must be a non-negative number');
  }
  if (typeof ry !== 'number' || ry < 0) {
    throw new Error('ry must be a non-negative number');
  }

  return {
    type: 'ellipse',
    x,
    y,
    rx,
    ry,
    fill: options.fill || '#000000',
    stroke: options.stroke,
    strokeWidth: options.strokeWidth || 1,
    opacity: options.opacity ?? 1,
  };
}
