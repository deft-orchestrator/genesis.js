// backends/canvas.js
export class CanvasBackend {
  constructor() {
    this.ctx = null
    this.transforms = []
  }

  render(scene, target) {
    this.ctx = target.getContext('2d')

    // Clear canvas
    this.ctx.clearRect(0, 0, target.width, target.height)

    // Render scene graph
    scene.forEach(element => this.renderElement(element))

    return target
  }

  renderElement(element) {
    this.ctx.save()

    // Apply transforms
    if (element.transform) {
      this.applyTransform(element.transform)
    }

    // Render based on type
    switch(element.type) {
      case 'circle':
        this.renderCircle(element)
        break
      case 'rect':
        this.renderRect(element)
        break
      case 'text':
        this.renderText(element)
        break
      case 'path':
        this.renderPath(element)
        break
      case 'group':
        element.children.forEach(child => this.renderElement(child))
        break
    }

    this.ctx.restore()
  }

  renderCircle(element) {
    const { x, y, radius, fill, stroke, strokeWidth, opacity } = element

    this.ctx.globalAlpha = opacity || 1
    this.ctx.beginPath()
    this.ctx.arc(x, y, radius, 0, Math.PI * 2)

    if (fill) {
      this.ctx.fillStyle = fill
      this.ctx.fill()
    }

    if (stroke) {
      this.ctx.strokeStyle = stroke
      this.ctx.lineWidth = strokeWidth || 1
      this.ctx.stroke()
    }
  }

  renderRect(element) {
    const { x, y, width, height, fill, stroke, strokeWidth, opacity, cornerRadius } = element

    this.ctx.globalAlpha = opacity || 1
    this.ctx.beginPath()

    if (cornerRadius) {
      // Not implemented yet
      this.ctx.rect(x, y, width, height)
    } else {
      this.ctx.rect(x, y, width, height)
    }

    if (fill) {
      this.ctx.fillStyle = fill
      this.ctx.fill()
    }

    if (stroke) {
      this.ctx.strokeStyle = stroke
      this.ctx.lineWidth = strokeWidth || 1
      this.ctx.stroke()
    }
  }

  renderText(element) {
    const { text, x, y, font, size, weight, color, align, baseline, opacity } = element

    this.ctx.globalAlpha = opacity || 1
    this.ctx.font = `${weight || 'normal'} ${size || 16}px ${font || 'sans-serif'}`
    this.ctx.fillStyle = color || '#000000'
    this.ctx.textAlign = align || 'left'
    this.ctx.textBaseline = baseline || 'alphabetic'

    this.ctx.fillText(text, x, y)
  }

  applyTransform(transform) {
    const { translate, rotate, scale, skew } = transform

    if (translate) {
      this.ctx.translate(translate.x || 0, translate.y || 0)
    }

    if (rotate) {
      this.ctx.rotate(rotate * Math.PI / 180)
    }

    if (scale) {
      this.ctx.scale(scale.x || 1, scale.y || 1)
    }
  }
}
