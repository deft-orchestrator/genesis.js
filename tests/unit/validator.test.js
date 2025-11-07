import { describe, test, expect } from 'vitest'
import { Validator } from '../../src/core/validator.js'

describe('Validator', () => {
  const validator = new Validator()

  describe('validateCircle', () => {
    test('should pass for a valid circle', () => {
      const validCircle = { type: 'circle', x: 10, y: 10, radius: 5 }
      expect(() => validator.validateElement(validCircle)).not.toThrow()
    })

    test('should throw for a circle with negative radius', () => {
      const invalidCircle = { type: 'circle', x: 10, y: 10, radius: -5 }
      expect(() => validator.validateElement(invalidCircle)).toThrow('Circle radius must be a positive number')
    })
  })

  describe('validateRect', () => {
    test('should pass for a valid rect', () => {
      const validRect = { type: 'rect', x: 10, y: 10, width: 20, height: 20 }
      expect(() => validator.validateElement(validRect)).not.toThrow()
    })

    test('should throw for a rect with negative width', () => {
      const invalidRect = { type: 'rect', x: 10, y: 10, width: -20, height: 20 }
      expect(() => validator.validateElement(invalidRect)).toThrow('Rect width must be a positive number')
    })
  })

  describe('validateText', () => {
    test('should pass for valid text', () => {
      const validText = { type: 'text', text: 'hello', x: 10, y: 10, size: 12 }
      expect(() => validator.validateElement(validText)).not.toThrow()
    })

    test('should throw for text with non-string content', () => {
      const invalidText = { type: 'text', text: 123, x: 10, y: 10 }
      expect(() => validator.validateElement(invalidText)).toThrow('Text content must be a string')
    })
  })

  describe('validateCommonProperties', () => {
    test('should throw for invalid opacity', () => {
      const invalidElement = { type: 'circle', x: 10, y: 10, radius: 5, opacity: 1.5 }
      expect(() => validator.validateElement(invalidElement)).toThrow('Opacity must be between 0 and 1')
    })

    test('should throw for invalid fill color', () => {
      const invalidElement = { type: 'circle', x: 10, y: 10, radius: 5, fill: 'invalid-color' }
      expect(() => validator.validateElement(invalidElement)).toThrow('Invalid fill color: invalid-color')
    })
  })

  describe('isValidColor', () => {
    test('should return true for valid colors', () => {
      expect(validator.isValidColor('#ff0000')).toBe(true)
      expect(validator.isValidColor('#f00')).toBe(true)
      expect(validator.isValidColor('rgb(255, 0, 0)')).toBe(true)
      expect(validator.isValidColor('rgba(255, 0, 0, 0.5)')).toBe(true)
      expect(validator.isValidColor('red')).toBe(true)
      expect(validator.isValidColor('transparent')).toBe(true)
    })
  })
})
