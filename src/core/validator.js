// core/validator.js
export class Validator {
  validateElement(element) {
    if (!element.type) {
      throw new Error('Element must have a type')
    }

    switch (element.type) {
      case 'circle':
        return this.validateCircle(element)
      case 'rect':
        return this.validateRect(element)
      case 'text':
        return this.validateText(element)
      case 'path':
        return this.validatePath(element)
      case 'line':
        return this.validateLine(element)
      case 'ellipse':
        return this.validateEllipse(element)
      case 'polygon':
        return this.validatePolygon(element)
      default:
        throw new Error(`Unknown element type: ${element.type}`)
    }
  }

  validateCircle(element) {
    if (typeof element.x !== 'number') {
      throw new Error('Circle x must be a number')
    }
    if (typeof element.y !== 'number') {
      throw new Error('Circle y must be a number')
    }
    if (typeof element.radius !== 'number' || element.radius < 0) {
      throw new Error('Circle radius must be a positive number')
    }

    this.validateCommonProperties(element)
    return true
  }

  validateRect(element) {
    if (typeof element.x !== 'number') {
      throw new Error('Rect x must be a number')
    }
    if (typeof element.y !== 'number') {
      throw new Error('Rect y must be a number')
    }
    if (typeof element.width !== 'number' || element.width < 0) {
      throw new Error('Rect width must be a positive number')
    }
    if (typeof element.height !== 'number' || element.height < 0) {
      throw new Error('Rect height must be a positive number')
    }

    this.validateCommonProperties(element)
    return true
  }

  validateText(element) {
    if (typeof element.text !== 'string') {
      throw new Error('Text content must be a string')
    }
    if (typeof element.x !== 'number') {
      throw new Error('Text x must be a number')
    }
    if (typeof element.y !== 'number') {
      throw new Error('Text y must be a number')
    }

    if (element.size !== undefined && (typeof element.size !== 'number' || element.size <= 0)) {
      throw new Error('Text size must be a positive number')
    }

    this.validateCommonProperties(element)
    return true
  }

  validatePath(element) {
    if (!element.commands && !element.points) {
      throw new Error('Path must have commands or points')
    }

    this.validateCommonProperties(element)
    return true
  }

  validateLine(element) {
    if (typeof element.x1 !== 'number' || typeof element.y1 !== 'number' || typeof element.x2 !== 'number' || typeof element.y2 !== 'number') {
      throw new Error('Line coordinates must be numbers')
    }
    this.validateCommonProperties(element)
    return true
  }

  validateEllipse(element) {
    if (typeof element.x !== 'number' || typeof element.y !== 'number' || typeof element.rx !== 'number' || typeof element.ry !== 'number') {
      throw new Error('Ellipse properties must be numbers')
    }
    if (element.rx < 0 || element.ry < 0) {
      throw new Error('Ellipse radii must be non-negative')
    }
    this.validateCommonProperties(element)
    return true
  }

  validatePolygon(element) {
    if (!Array.isArray(element.points) || element.points.length < 3) {
      throw new Error('Polygon must have at least 3 points')
    }
    this.validateCommonProperties(element)
    return true
  }

  validateCommonProperties(element) {
    if (element.opacity !== undefined) {
      if (typeof element.opacity !== 'number' || element.opacity < 0 || element.opacity > 1) {
        throw new Error('Opacity must be between 0 and 1')
      }
    }

    if (element.fill !== undefined && !this.isValidColor(element.fill)) {
      throw new Error(`Invalid fill color: ${element.fill}`)
    }

    if (element.stroke !== undefined && !this.isValidColor(element.stroke)) {
      throw new Error(`Invalid stroke color: ${element.stroke}`)
    }
  }

  isValidColor(color) {
    if (color === 'transparent' || color === 'none') return true

    // Hex color
    if (/^#[0-9A-Fa-f]{6}$/.test(color)) return true
    if (/^#[0-9A-Fa-f]{3}$/.test(color)) return true

    // RGB/RGBA
    if (/^rgba?\(/.test(color)) return true

    // Named colors (basic check)
    if (/^[a-z]+$/.test(color)) return true

    return false
  }

  sanitizeInput(input) {
    if (typeof input === 'string') {
      // Remove potential XSS
      return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
    }

    return input
  }
}
