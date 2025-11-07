import { describe, test, expect, beforeEach } from 'vitest'
import { ErrorHandler } from '../../src/core/error-handler.js'

describe('ErrorHandler', () => {
  let errorHandler

  beforeEach(() => {
    errorHandler = new ErrorHandler()
  })

  test('should record an error', () => {
    errorHandler.error('Test error')
    expect(errorHandler.hasErrors()).toBe(true)
    expect(errorHandler.getErrors().length).toBe(1)
    expect(errorHandler.getErrors()[0].message).toBe('Test error')
  })

  test('should record a warning', () => {
    errorHandler.warn('Test warning')
    expect(errorHandler.getWarnings().length).toBe(1)
    expect(errorHandler.getWarnings()[0].message).toBe('Test warning')
  })

  test('should clear errors and warnings', () => {
    errorHandler.error('Test error')
    errorHandler.warn('Test warning')
    errorHandler.clear()
    expect(errorHandler.hasErrors()).toBe(false)
    expect(errorHandler.getErrors().length).toBe(0)
    expect(errorHandler.getWarnings().length).toBe(0)
  })

  test('handle should execute a function and return its result', () => {
    const fn = () => 42
    const result = errorHandler.handle(fn)
    expect(result).toBe(42)
    expect(errorHandler.hasErrors()).toBe(false)
  })

  test('handle should catch an error and return a fallback', () => {
    const fn = () => {
      throw new Error('Test exception')
    }
    const result = errorHandler.handle(fn, 'fallback')
    expect(result).toBe('fallback')
    expect(errorHandler.hasErrors()).toBe(true)
    expect(errorHandler.getErrors()[0].message).toBe('Test exception')
  })
})
