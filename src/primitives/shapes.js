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
