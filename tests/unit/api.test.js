import { describe, test, expect, beforeEach } from 'vitest'
import { Genesis } from '../../src/genesis.js'

describe('MidLevelAPI', () => {
  let g

  beforeEach(() => {
    g = new Genesis()
  })

  test('mid.circle() should add a circle to the scene', () => {
    g.mid.circle(10, 20, 30, { fill: 'red' })
    expect(g.scene.length).toBe(1)
    expect(g.scene[0].type).toBe('circle')
    expect(g.scene[0].radius).toBe(30)
  })

  test('mid.rect() should add a rectangle to the scene', () => {
    g.mid.rect(10, 20, 30, 40, { fill: 'blue' })
    expect(g.scene.length).toBe(1)
    expect(g.scene[0].type).toBe('rect')
    expect(g.scene[0].width).toBe(30)
  })
})

describe('LowLevelAPI', () => {
  let g

  beforeEach(() => {
    g = new Genesis()
  })

  test('low.c() should add a circle to the scene', () => {
    g.low.c(10, 20, 30, 'red')
    expect(g.scene.length).toBe(1)
    expect(g.scene[0].type).toBe('circle')
    expect(g.scene[0].fill).toBe('red')
  })

  test('low.r() should add a rectangle to the scene', () => {
    g.low.r(10, 20, 30, 40, 'blue')
    expect(g.scene.length).toBe(1)
    expect(g.scene[0].type).toBe('rect')
    expect(g.scene[0].fill).toBe('blue')
  })
})
