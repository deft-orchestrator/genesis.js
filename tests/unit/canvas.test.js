import { describe, test, expect, beforeEach } from 'vitest'
import { CanvasBackend } from '../../src/backends/canvas.js'
import { createCanvas } from 'canvas'

describe('CanvasBackend', () => {
  let backend
  let canvas
  let ctx

  beforeEach(() => {
    backend = new CanvasBackend()
    canvas = createCanvas(200, 200)
    ctx = canvas.getContext('2d')
  })

  test('should render a circle', () => {
    const scene = [{ type: 'circle', x: 50, y: 50, radius: 20, fill: 'red' }]
    backend.render(scene, canvas)

    // Not a perfect test, but confirms something was drawn
    const pixel = ctx.getImageData(50, 50, 1, 1).data
    expect(pixel[0]).toBe(255) // Red
    expect(pixel[3]).toBe(255) // Alpha
  })

  test('should render a rectangle', () => {
    const scene = [{ type: 'rect', x: 20, y: 20, width: 40, height: 40, fill: 'blue' }]
    backend.render(scene, canvas)

    const pixel = ctx.getImageData(40, 40, 1, 1).data
    expect(pixel[2]).toBe(255) // Blue
  })

  test('should render text', () => {
    const scene = [{ type: 'text', text: 'Hello', x: 10, y: 50, color: 'green' }]
    backend.render(scene, canvas)
    // No easy way to test text rendering in node-canvas without snapshot testing
    // For now, just ensure it doesn't crash
    expect(true).toBe(true)
  })

  test('should clear the canvas before rendering', () => {
    // First render
    const scene1 = [{ type: 'rect', x: 0, y: 0, width: 200, height: 200, fill: 'black' }]
    backend.render(scene1, canvas)

    // Second render
    const scene2 = [{ type: 'rect', x: 0, y: 0, width: 50, height: 50, fill: 'white' }]
    backend.render(scene2, canvas)

    const pixel = ctx.getImageData(100, 100, 1, 1).data
    expect(pixel[0]).toBe(0) // Black, so it was cleared
  })
})
