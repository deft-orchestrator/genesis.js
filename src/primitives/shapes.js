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
