import { describe, test, expect, beforeEach, vi } from 'vitest'
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

  test('should render text with correct properties', () => {
    // Create a mock context to inspect property assignments
    const mockCtx = {
      save: vi.fn(),
      restore: vi.fn(),
      fillText: vi.fn(),
      // Properties that will be set
      font: '',
      fillStyle: '',
      textAlign: '',
      textBaseline: '',
      globalAlpha: 1,
    };
    backend.ctx = mockCtx; // Manually assign the mock context for this test

    const element = {
      type: 'text',
      text: 'Hello',
      x: 10,
      y: 50,
      color: 'green',
      font: 'Arial',
      size: 20,
      weight: 'bold',
      align: 'center',
      baseline: 'middle',
      opacity: 0.8
    };

    backend.renderElement(element);

    expect(mockCtx.save).toHaveBeenCalled();
    expect(mockCtx.globalAlpha).toBe(0.8);
    expect(mockCtx.font).toBe('bold 20px Arial');
    expect(mockCtx.fillStyle).toBe('green');
    expect(mockCtx.textAlign).toBe('center');
    expect(mockCtx.textBaseline).toBe('middle');
    expect(mockCtx.fillText).toHaveBeenCalledWith('Hello', 10, 50);
    expect(mockCtx.restore).toHaveBeenCalled();
  });


  test('should clear the canvas before rendering', () => {
    // First render, a big black square
    const scene1 = [{ type: 'rect', x: 0, y: 0, width: 200, height: 200, fill: 'black' }]
    backend.render(scene1, canvas)

    // Second render, a small white square
    const scene2 = [{ type: 'rect', x: 0, y: 0, width: 50, height: 50, fill: 'white' }]
    backend.render(scene2, canvas)

    // Check a pixel inside the small white square
    const pixelInside = ctx.getImageData(25, 25, 1, 1).data;
    expect(pixelInside[0]).toBe(255); // White
    expect(pixelInside[1]).toBe(255);
    expect(pixelInside[2]).toBe(255);

    // Check a pixel outside the small square, which should be transparent
    // because the canvas was cleared before the second render.
    const pixelOutside = ctx.getImageData(100, 100, 1, 1).data;
    expect(pixelOutside[3]).toBe(0); // Transparent alpha
  })

  test('should render a polygon', () => {
    const scene = [{
      type: 'polygon',
      points: [[10, 10], [190, 10], [100, 190]],
      fill: 'purple'
    }]
    backend.render(scene, canvas)

    const pixel = ctx.getImageData(100, 50, 1, 1).data
    expect(pixel[0]).toBe(128) // Purple (R)
    expect(pixel[1]).toBe(0)   // Purple (G)
    expect(pixel[2]).toBe(128) // Purple (B)
  })
})
