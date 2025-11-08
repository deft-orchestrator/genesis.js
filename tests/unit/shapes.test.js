import { describe, test, expect } from 'vitest'
import { circle, rectangle } from '../../src/primitives/shapes.js'

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

describe('rectangle', () => {
  test('creates valid rectangle', () => {
    const rect = rectangle(10, 20, 100, 50, { fill: '#3498db' })

    expect(rect.type).toBe('rect')
    expect(rect.x).toBe(10)
    expect(rect.y).toBe(20)
    expect(rect.width).toBe(100)
    expect(rect.height).toBe(50)
    expect(rect.fill).toBe('#3498db')
  })

  test('throws for invalid x', () => {
    expect(() => rectangle(NaN, 0, 10, 10)).toThrow('x must be a finite number')
    expect(() => rectangle(Infinity, 0, 10, 10)).toThrow()
  })

  test('throws for negative width', () => {
    expect(() => rectangle(0, 0, -10, 10)).toThrow('width must be a non-negative number')
  })

  test('applies default values', () => {
    const rect = rectangle(0, 0, 10, 10)
    expect(rect.fill).toBe('#000000')
    expect(rect.strokeWidth).toBe(1)
  })

  test('supports corner radius', () => {
    const rect = rectangle(0, 0, 10, 10, { cornerRadius: 5 })
    expect(rect.cornerRadius).toBe(5)
  })
})
