import { describe, test, expect } from 'vitest'
import { Renderer } from '../../src/core/renderer.js'
import { CanvasBackend } from '../../src/backends/canvas.js'
import { SVGBackend } from '../../src/backends/svg.js'
import { WebGLBackend } from '../../src/backends/webgl.js'
import { createCanvas } from 'canvas'

describe('Renderer', () => {
  test('should initialize with a canvas backend by default', () => {
    const renderer = new Renderer({ backend: 'canvas' })
    expect(renderer.backend).toBeInstanceOf(CanvasBackend)
  })

  test('should initialize with an svg backend', () => {
    const renderer = new Renderer({ backend: 'svg' })
    expect(renderer.backend).toBeInstanceOf(SVGBackend)
  })

  test('should initialize with a webgl backend', () => {
    const renderer = new Renderer({ backend: 'webgl' })
    expect(renderer.backend).toBeInstanceOf(WebGLBackend)
  })

  test('should auto-select backend', () => {
    const renderer = new Renderer({ backend: 'auto' })
    renderer.scene = []
    expect(renderer.autoSelectBackend()).toBeInstanceOf(CanvasBackend)

    renderer.scene = Array(2000).fill({})
    expect(renderer.autoSelectBackend()).toBeInstanceOf(WebGLBackend)
  })

  test('should render a scene', () => {
    const renderer = new Renderer({ backend: 'canvas' })
    const scene = [{ type: 'circle', x: 10, y: 10, radius: 5 }]
    const canvas = createCanvas(200, 200)
    const result = renderer.render(scene, canvas)
    expect(result).toBe(canvas)
  })
})
