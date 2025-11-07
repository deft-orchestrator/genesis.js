import { describe, test, expect } from 'vitest'
import { circle } from '../../src/primitives/shapes.js'

describe('circle', () => {
  test('creates a valid circle object', () => {
    const c = circle(100, 150, 50, { fill: 'red' })
    expect(c).toEqual({
      type: 'circle',
      x: 100,
      y: 150,
      radius: 50,
      fill: 'red',
      stroke: undefined,
      strokeWidth: 1,
      opacity: 1
    })
  })

  test('throws an error for negative radius', () => {
    expect(() => circle(100, 100, -50)).toThrow('Radius must be positive')
  })

  test('applies default values correctly', () => {
    const c = circle(10, 20, 30)
    expect(c.fill).toBe('#000000')
    expect(c.strokeWidth).toBe(1)
    expect(c.opacity).toBe(1)
  })
})
