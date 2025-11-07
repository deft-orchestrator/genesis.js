// core/error-handler.js
export class ErrorHandler {
  constructor() {
    this.errors = []
    this.warnings = []
  }

  error(message, context = {}) {
    const error = {
      type: 'error',
      message,
      context,
      timestamp: Date.now()
    }

    this.errors.push(error)
    console.error(`[Genesis.js Error] ${message}`, context)

    return error
  }

  warn(message, context = {}) {
    const warning = {
      type: 'warning',
      message,
      context,
      timestamp: Date.now()
    }

    this.warnings.push(warning)
    console.warn(`[Genesis.js Warning] ${message}`, context)

    return warning
  }

  clear() {
    this.errors = []
    this.warnings = []
  }

  getErrors() {
    return this.errors
  }

  getWarnings() {
    return this.warnings
  }

  hasErrors() {
    return this.errors.length > 0
  }

  handle(fn, fallback = null) {
    try {
      return fn()
    } catch (err) {
      this.error(err.message, { stack: err.stack })
      return fallback
    }
  }
}
