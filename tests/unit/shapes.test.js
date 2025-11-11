import { describe, test, expect } from 'vitest'
import { circle, rectangle, line, ellipse, polygon } from '../../src/primitives/shapes.js'

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

describe('line', () => {
  test('creates a valid line object', () => {
    const l = line(10, 20, 100, 200, { stroke: 'blue', strokeWidth: 5 });
    expect(l).toEqual({
      type: 'line',
      x1: 10,
      y1: 20,
      x2: 100,
      y2: 200,
      stroke: 'blue',
      strokeWidth: 5,
      opacity: 1,
      cap: 'butt',
    });
  });

  test('throws an error for non-finite coordinates', () => {
    expect(() => line(NaN, 20, 100, 200)).toThrow('x1 must be a finite number');
    expect(() => line(10, Infinity, 100, 200)).toThrow('y1 must be a finite number');
    expect(() => line(10, 20, null, 200)).toThrow('x2 must be a finite number');
    expect(() => line(10, 20, 100, undefined)).toThrow('y2 must be a finite number');
  });

  test('applies default values correctly', () => {
    const l = line(0, 0, 1, 1);
    expect(l.stroke).toBe('#000000');
    expect(l.strokeWidth).toBe(1);
    expect(l.opacity).toBe(1);
    expect(l.cap).toBe('butt');
  });

  test('supports different line caps', () => {
    const l = line(0, 0, 1, 1, { cap: 'round' });
    expect(l.cap).toBe('round');
  });
});

describe('ellipse', () => {
  test('creates a valid ellipse object', () => {
    const e = ellipse(100, 150, 50, 80, { fill: 'blue' });
    expect(e).toEqual({
      type: 'ellipse',
      x: 100,
      y: 150,
      rx: 50,
      ry: 80,
      fill: 'blue',
      stroke: undefined,
      strokeWidth: 1,
      opacity: 1,
    });
  });

  test('throws an error for negative radii', () => {
    expect(() => ellipse(100, 100, -50, 80)).toThrow('rx must be a non-negative number');
    expect(() => ellipse(100, 100, 50, -80)).toThrow('ry must be a non-negative number');
  });

  test('throws an error for non-finite coordinates', () => {
    expect(() => ellipse(NaN, 150, 50, 80)).toThrow('x must be a finite number');
    expect(() => ellipse(100, Infinity, 50, 80)).toThrow('y must be a finite number');
  });

  test('applies default values correctly', () => {
    const e = ellipse(10, 20, 30, 40);
    expect(e.fill).toBe('#000000');
    expect(e.strokeWidth).toBe(1);
    expect(e.opacity).toBe(1);
  });
});

describe('polygon', () => {
  test('creates a valid polygon object', () => {
    const points = [[0, 0], [50, 0], [25, 50]];
    const p = polygon(points, { fill: 'green' });
    expect(p).toEqual({
      type: 'polygon',
      points,
      fill: 'green',
      stroke: undefined,
      strokeWidth: 1,
      opacity: 1,
    });
  });

  test('throws an error for less than 3 points', () => {
    const points = [[0, 0], [50, 0]];
    expect(() => polygon(points)).toThrow('Polygon must have at least 3 points');
  });

  test('applies default values correctly', () => {
    const points = [[0, 0], [50, 0], [25, 50]];
    const p = polygon(points);
    expect(p.fill).toBe('#000000');
    expect(p.strokeWidth).toBe(1);
    expect(p.opacity).toBe(1);
  });
});
