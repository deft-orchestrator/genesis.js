// core/renderer.js
import { CanvasBackend } from '../backends/canvas.js'
import { SVGBackend } from '../backends/svg.js'
import { WebGLBackend } from '../backends/webgl.js'

export class Renderer {
  constructor(config) {
    this.config = config
    this.scene = []
    this.backend = this.initBackend(config.backend)
    this.cache = new Map()
    this.dirtyFlag = true
  }

  initBackend(type) {
    switch(type) {
      case 'canvas':
        return new CanvasBackend()
      case 'svg':
        return new SVGBackend()
      case 'webgl':
        return new WebGLBackend()
      default:
        return this.autoSelectBackend()
    }
  }

  autoSelectBackend() {
    // Pilih backend optimal berdasarkan kompleksitas scene
    const complexity = this.calculateComplexity()
    if (complexity > 1000) return new WebGLBackend()
    return new CanvasBackend()
  }

  render(scene, target) {
    if (!this.dirtyFlag && this.config.cache) {
      return this.cache.get('lastRender')
    }

    const result = this.backend.render(scene, target)

    if (this.config.cache) {
      this.cache.set('lastRender', result)
    }

    this.dirtyFlag = false
    return result
  }

  calculateComplexity() {
    // Hitung skor kompleksitas scene
    return this.scene.reduce((score, element) => {
      return score + this.getElementComplexity(element)
    }, 0)
  }

  getElementComplexity(element) {
    // A placeholder for complexity calculation
    return 1;
  }

  export(scene, format) {
    const exporter = this.getExporter(format)
    return exporter.export(scene)
  }
}
