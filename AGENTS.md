# AI Agent Guide for Genesis.js Development

> **Welcome, AI Agent!** This guide will help you understand the project, navigate the codebase, and contribute effectively.

---

## 🎯 Your Mission

You are contributing to **Genesis.js**, an academic research project that aims to revolutionize AI-generated visual design through Direct Code Execution (DCE). Your role is to help build the library, implement features, write tests, and maintain documentation.

---

## 📖 Quick Orientation

### What is Genesis.js?

Genesis.js is a web-based library that enables AI to generate visual content by writing **executable code** instead of generating pixels. Think of it as:

- A **standard library** for visual design (like p5.js, but AI-optimized)
- A **rendering engine** that works in browsers (Canvas, SVG, WebGL)
- A **multi-agent system** where AI agents collaborate to create visuals
- A **research project** measuring efficiency vs generative models

### Core Concept

```
Traditional: AI → [Black Box Model] → Pixels (slow, opaque, not editable)
Genesis.js: AI → [Generate Code] → Executable → Visuals (fast, transparent, editable)
```

---

## 🗺️ Project Structure Guide

```
genesis.js/
├── src/                    # 🔧 Core library code (YOUR MAIN WORKSPACE)
│   ├── core/              # Engine: Renderer, API, Validator
│   ├── primitives/        # Basic shapes: circle, rect, text
│   ├── composition/       # Layout & transforms
│   ├── motion/            # Animation engine
│   ├── components/        # Pre-built: charts, UI components
│   ├── backends/          # Canvas, SVG, WebGL renderers
│   ├── utils/             # Helpers: colors, math, cache
│   └── plugins/           # Plugin system
│
├── agents/                # 🤖 Multi-agent system (Phase 3)
│   ├── planner.js        # Parse intent → plan
│   ├── generator.js      # Plan → Genesis code
│   ├── executor.js       # Run code → output
│   ├── evaluator.js      # Check quality
│   ├── debugger.js       # Fix errors
│   └── memory.js         # Learn patterns
│
├── tests/                 # 🧪 All tests
│   ├── unit/             # Component tests
│   ├── integration/      # System tests
│   └── benchmarks/       # Performance tests
│
├── docs/                  # 📚 Documentation
│   ├── api/              # API reference
│   ├── guides/           # How-to guides
│   └── examples/         # Code examples
│
├── examples/              # 💡 Usage examples
│   ├── basic/
│   ├── charts/
│   └── dashboards/
│
├── research/              # 🔬 Research materials
│   ├── methodology.md
│   ├── datasets/
│   └── results/
│
├── README.md              # 📄 Project overview
├── DESIGN.md              # 🏗️ Technical specification (READ THIS!)
├── TODO.md                # ✅ Task tracker (UPDATE THIS!)
└── AGENT.md               # 📖 This file (your guide)
```

### 🎯 Where to Focus

| Phase | Primary Folders | Current Status |
|-------|----------------|----------------|
| Phase 1-2 | `src/core/`, `src/primitives/`, `src/backends/` | 🚧 Active |
| Phase 3 | `agents/` | ⏳ Not Started |
| Phase 4 | `src/utils/`, optimization across all | ⏳ Not Started |
| Phase 5-6 | `research/`, `docs/` | ⏳ Not Started |

---

## 🚀 Getting Started

### Step 1: Read Core Documents

**Priority order** (spend ~30 mins total):

1. **README.md** (5 mins) - Project overview
2. **DESIGN.md** (20 mins) - Detailed technical spec
3. **TODO.md** (5 mins) - Current tasks and progress
4. **This file** (you're reading it now!)

### Step 2: Understand the Architecture

Genesis.js has **three main layers**:

```
┌─────────────────────────────────────┐
│     Layer 3: High-Level API         │  ← Humans use this
│  (Dashboard, Charts, Components)    │
├─────────────────────────────────────┤
│     Layer 2: Mid-Level API          │  ← Balanced usage
│  (Primitives, Layout, Animations)   │
├─────────────────────────────────────┤
│     Layer 1: Low-Level API          │  ← AI agents use this
│  (Compact syntax, token-optimized)  │
└────────────────┬────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│        Core Rendering Engine        │
│  (Canvas | SVG | WebGL backends)    │
└─────────────────────────────────────┘
```

### Step 3: Key Concepts to Understand

#### 1. Three-Tier API System

**High-Level** (verbose, human-friendly):
```javascript
genesis.dashboard({
  title: 'Sales Dashboard',
  components: [
    { type: 'chart', chartType: 'bar', data: [...] }
  ]
})
```

**Mid-Level** (balanced):
```javascript
genesis.chart(data, {
  type: 'bar',
  width: 400,
  height: 300
})
```

**Low-Level** (compact, AI-optimized):
```javascript
g.bar(data, 400, 300, ['#3498db'], true)
// or even shorter:
g.cs([[50,50,20],[80,50,20]], '#3498db') // multiple circles
```

**Why?** Save AI tokens = faster + cheaper generation!

#### 2. Scene Graph

Genesis.js uses a **scene graph** (list of elements to render):

```javascript
const scene = [
  { type: 'circle', x: 100, y: 100, radius: 50, fill: '#3498db' },
  { type: 'rect', x: 200, y: 50, width: 100, height: 100, fill: '#e74c3c' },
  { type: 'group', children: [...] }
]
```

The renderer processes this list and outputs visuals.

#### 3. Backend System

Genesis.js can render using different backends:

- **Canvas**: Fast, good for most use cases
- **SVG**: Scalable, great for exports
- **WebGL**: Ultra-fast for complex scenes (1000+ objects)

The system **auto-selects** the best backend based on complexity.

---

## 🛠️ Development Workflow

### Task Selection

1. Open **TODO.md**
2. Find a task with:
   - Current phase (Phase 1 now)
   - High priority (🔴 P0 or 🟡 P1)
   - Not blocked
   - Matches your capabilities

3. Check dependencies:
   ```markdown
   # Example task in TODO.md
   - [ ] Implement circle primitive
   
   Dependencies:
   - Requires: CanvasBackend class (complete first)
   - Blocks: Chart components
   ```

### Before You Code

1. **Read the spec** in DESIGN.md for your feature
2. **Check existing code** for patterns
3. **Plan your approach** (write pseudocode mentally)
4. **Update TODO.md**: Change `- [ ]` to `- [🚧]` (in progress)

### While Coding

Follow these **golden rules**:

#### ✅ DO:
- Write clean, readable code
- Add JSDoc comments
- Follow existing patterns
- Write tests alongside code
- Use meaningful variable names
- Keep functions small (<50 lines)
- Handle errors gracefully

#### ❌ DON'T:
- Use `eval()` or `Function()`
- Hard-code magic numbers
- Ignore edge cases
- Skip error handling
- Leave console.logs in production code
- Copy-paste without understanding

### Code Style

```javascript
// ✅ GOOD: Clear, documented, tested
/**
 * Creates a circle element
 * @param {number} x - Center X coordinate
 * @param {number} y - Center Y coordinate
 * @param {number} radius - Circle radius (must be positive)
 * @param {Object} options - Style options
 * @returns {Object} Circle element
 */
export function circle(x, y, radius, options = {}) {
  if (radius < 0) {
    throw new Error('Radius must be positive')
  }
  
  return {
    type: 'circle',
    x, y, radius,
    fill: options.fill || '#000000',
    stroke: options.stroke,
    strokeWidth: options.strokeWidth || 1,
    opacity: options.opacity ?? 1
  }
}

// ❌ BAD: No docs, no validation, unclear
function c(x, y, r, o) {
  return { type: 'circle', x, y, radius: r, ...o }
}
```

### Testing

**Every feature needs tests!**

```javascript
// tests/unit/primitives.test.js
import { describe, test, expect } from 'vitest'
import { circle } from '../src/primitives/shapes.js'

describe('circle', () => {
  test('creates valid circle', () => {
    const c = circle(100, 100, 50, { fill: '#3498db' })
    
    expect(c.type).toBe('circle')
    expect(c.x).toBe(100)
    expect(c.y).toBe(100)
    expect(c.radius).toBe(50)
    expect(c.fill).toBe('#3498db')
  })
  
  test('throws error for negative radius', () => {
    expect(() => {
      circle(100, 100, -50)
    }).toThrow('Radius must be positive')
  })
  
  test('applies default values', () => {
    const c = circle(0, 0, 10)
    
    expect(c.fill).toBe('#000000')
    expect(c.strokeWidth).toBe(1)
    expect(c.opacity).toBe(1)
  })
})
```

### After Coding

1. **Run tests**: `npm test`
2. **Check lint**: `npm run lint`
3. **Update docs** if you added/changed API
4. **Update TODO.md**:
   ```markdown
   - [x] Implement circle primitive (✓ 2025-11-07) [Agent: YourName]
   ```
5. **Update progress** percentage in TODO.md
6. **Commit with clear message**:
   ```bash
   git commit -m "feat: implement circle primitive with validation"
   ```

---

## 📝 Documentation Standards

### Code Comments

Use **JSDoc** for all public functions:

```javascript
/**
 * Renders a bar chart
 * @param {Array<Object>} data - Chart data [{label, value}]
 * @param {Object} config - Configuration options
 * @param {number} config.width - Chart width in pixels
 * @param {number} config.height - Chart height in pixels
 * @param {string[]} [config.colors] - Bar colors (optional)
 * @param {boolean} [config.animate=false] - Enable animations
 * @returns {Object} Chart group element
 * @throws {Error} If data is empty or invalid
 * @example
 * const chart = barChart([
 *   { label: 'Jan', value: 120 },
 *   { label: 'Feb', value: 150 }
 * ], { width: 400, height: 300 })
 */
export function barChart(data, config) {
  // Implementation
}
```

### README Updates

When adding a major feature, update README.md's feature list:

```markdown
## Features

- ✅ Circle, rectangle, polygon primitives
- ✅ Text rendering with custom fonts
- 🚧 Animation engine (in progress)
- ⏳ Chart components (planned)
```

### API Documentation

For each new API method, add to `docs/api/`:

```markdown
# circle()

Creates a circle element.

## Syntax

```javascript
genesis.circle(x, y, radius, options)
```

## Parameters

- `x` (number): Center X coordinate
- `y` (number): Center Y coordinate
- `radius` (number): Circle radius (must be positive)
- `options` (Object): Optional styling
  - `fill` (string): Fill color
  - `stroke` (string): Stroke color
  - `strokeWidth` (number): Stroke width

## Returns

Circle element object

## Example

```javascript
genesis.circle(100, 100, 50, {
  fill: '#3498db',
  stroke: '#2c3e50',
  strokeWidth: 2
})
```
```

---

## 🧪 Testing Guidelines

### Test Coverage Requirements

- **Minimum**: 80% overall
- **Critical paths**: 95%+ (renderer, validators)
- **New code**: 100% before merge

### Test Types

#### 1. Unit Tests (Fastest)

Test individual functions in isolation:

```javascript
describe('Color Utils', () => {
  test('converts hex to rgb', () => {
    expect(hexToRgb('#ff5733')).toEqual({ r: 255, g: 87, b: 51 })
  })
})
```

#### 2. Integration Tests

Test components working together:

```javascript
describe('Rendering Pipeline', () => {
  test('renders scene to canvas', () => {
    const scene = [
      genesis.circle(50, 50, 20),
      genesis.rect(100, 100, 50, 50)
    ]
    
    const canvas = genesis.render(scene)
    expect(canvas).toBeDefined()
    // Visual regression check
    expect(canvas).toMatchSnapshot()
  })
})
```

#### 3. Performance Tests

Benchmark critical operations:

```javascript
describe('Performance', () => {
  bench('render 1000 circles', () => {
    const scene = Array.from({ length: 1000 }, (_, i) => 
      genesis.circle(i % 800, Math.floor(i / 800) * 20, 5)
    )
    genesis.render(scene)
  }, { time: 1000 }) // Should complete in <1000ms
})
```

### Running Tests

```bash
# All tests
npm test

# Watch mode (auto-rerun)
npm test -- --watch

# Specific file
npm test -- circle.test.js

# Coverage report
npm test -- --coverage

# Benchmarks
npm run test:bench
```

---

## 🎯 Phase-Specific Guidelines

### Phase 1: Foundation (Current)

**Focus**: Core architecture and basic primitives

**Your priorities**:
1. Implement solid, well-tested primitives
2. Set up rendering pipeline
3. Create validator system
4. Build comprehensive test suite

**Quality bar**:
- Every primitive must have 100% test coverage
- All edge cases handled (negative numbers, null, undefined)
- Clear error messages
- Performance: <5ms per primitive

**Example task walkthrough**:

Let's say you're implementing `rectangle`:

```javascript
// src/primitives/shapes.js

/**
 * Creates a rectangle element
 * @param {number} x - Top-left X coordinate
 * @param {number} y - Top-left Y coordinate  
 * @param {number} width - Rectangle width
 * @param {number} height - Rectangle height
 * @param {Object} options - Style options
 * @returns {Object} Rectangle element
 */
export function rectangle(x, y, width, height, options = {}) {
  // 1. Validate inputs
  if (typeof x !== 'number' || !isFinite(x)) {
    throw new Error('x must be a finite number')
  }
  if (typeof y !== 'number' || !isFinite(y)) {
    throw new Error('y must be a finite number')
  }
  if (typeof width !== 'number' || width < 0) {
    throw new Error('width must be a non-negative number')
  }
  if (typeof height !== 'number' || height < 0) {
    throw new Error('height must be a non-negative number')
  }
  
  // 2. Create element object
  return {
    type: 'rect',
    x, y, width, height,
    fill: options.fill || '#000000',
    stroke: options.stroke,
    strokeWidth: options.strokeWidth || 1,
    cornerRadius: options.cornerRadius || 0,
    opacity: options.opacity ?? 1,
    shadow: options.shadow || null
  }
}
```

Then write tests:

```javascript
// tests/unit/shapes.test.js

describe('rectangle', () => {
  test('creates valid rectangle', () => {
    const rect = rectangle(10, 20, 100, 50, { fill: '#3498db' })
    
    expect(rect.type).toBe('rect')
    expect(rect.x).toBe(10)
    expect(rect.y).toBe(20)
    expect(rect.width).toBe(100)
    expect(rect.height).toBe(50)
    expect(rect.fill).toBe('#3498db')
  })
  
  test('throws for invalid x', () => {
    expect(() => rectangle(NaN, 0, 10, 10)).toThrow('x must be a finite number')
    expect(() => rectangle(Infinity, 0, 10, 10)).toThrow()
  })
  
  test('throws for negative width', () => {
    expect(() => rectangle(0, 0, -10, 10)).toThrow('width must be a non-negative number')
  })
  
  test('applies default values', () => {
    const rect = rectangle(0, 0, 10, 10)
    expect(rect.fill).toBe('#000000')
    expect(rect.strokeWidth).toBe(1)
  })
  
  test('supports corner radius', () => {
    const rect = rectangle(0, 0, 10, 10, { cornerRadius: 5 })
    expect(rect.cornerRadius).toBe(5)
  })
})
```

Update TODO.md:
```markdown
- [x] Implement rectangle primitive (✓ 2025-11-07) [Agent: Claude]
```

Commit:
```bash
git commit -m "feat: add rectangle primitive with validation and tests"
```

---

### Phase 2: Core Features (Next)

**Focus**: Layout, animations, and components

**Your priorities**:
1. Implement flexible layout system
2. Build smooth animation engine
3. Create reusable chart components
4. Add SVG backend

**Quality bar**:
- Animations run at 60 FPS
- Layouts handle edge cases (empty, overflow)
- Components are composable
- SVG output is valid and optimized

---

### Phase 3: Multi-Agent System (Future)

**Focus**: AI agent collaboration

**Your priorities**:
1. Design clean agent interfaces
2. Implement message passing
3. Build robust error recovery
4. Create learning mechanisms

**Quality bar**:
- Agents handle failures gracefully
- Communication is async and non-blocking
- System learns from mistakes
- Success rate >85% for simple tasks

---

## 🐛 Debugging Tips

### Common Issues

#### Issue: "Test fails but code looks correct"

**Checklist**:
- Are you comparing objects? Use `toEqual` not `toBe`
- Check for floating point precision issues
- Verify async tests use `await`
- Clear any test state between runs

#### Issue: "Performance is slow"

**Checklist**:
- Are you creating objects in loops?
- Can you batch operations?
- Is caching enabled?
- Profile with browser DevTools

#### Issue: "Rendering doesn't match expected"

**Checklist**:
- Check coordinate system (top-left vs center)
- Verify transform order (translate → rotate → scale)
- Look for off-by-one errors
- Use visual regression tests

### Debugging Tools

```javascript
// Enable debug mode
genesis.config({ debug: true, showMetrics: true })

// Log scene graph
console.log(JSON.stringify(genesis.scene, null, 2))

// Measure performance
console.time('render')
genesis.render()
console.timeEnd('render')

// Check memory
console.log(genesis.getMemoryUsage())
```

---

## 💡 Best Practices

### Performance

1. **Avoid premature optimization**
   - Make it work first
   - Make it right second
   - Make it fast third

2. **Profile before optimizing**
   ```javascript
   console.time('operation')
   // ... code
   console.timeEnd('operation')
   ```

3. **Use efficient data structures**
   - Map for lookups
   - Set for uniqueness
   - Array for ordered lists

4. **Batch operations**
   ```javascript
   // ❌ BAD: Multiple render calls
   elements.forEach(el => genesis.render(el))
   
   // ✅ GOOD: Single batch render
   genesis.renderBatch(elements)
   ```

### Code Organization

1. **One responsibility per function**
2. **Keep files small** (<300 lines)
3. **Group related functionality**
4. **Use clear naming** (readability > brevity)

### Error Handling

```javascript
// ✅ GOOD: Specific, helpful errors
if (radius < 0) {
  throw new Error(
    `Circle radius must be positive, got ${radius}`
  )
}

// ❌ BAD: Generic, unhelpful
if (radius < 0) throw new Error('Invalid input')
```

### Git Commits

Follow **Conventional Commits**:

```bash
feat: add animation timeline system
fix: resolve transform composition bug
docs: update API reference for charts
test: add coverage for edge cases
refactor: simplify layout algorithm
perf: optimize render batching
chore: update dependencies
```

---

## 🆘 Getting Help

### When Stuck

1. **Read the docs**: Check DESIGN.md for specifications
2. **Look at examples**: See how similar features work
3. **Check tests**: Tests show expected behavior
4. **Search issues**: Someone might have faced this before

### Resource Priority

1. **DESIGN.md** - Detailed specs (read first!)
2. **TODO.md** - Task context and dependencies
3. **Existing code** - Learn from patterns
4. **Tests** - Show expected behavior
5. **Comments** - Explain "why" not "what"

---

## ✅ Pre-Commit Checklist

Before marking a task complete:

- [ ] Code works correctly
- [ ] Tests pass (100% coverage for new code)
- [ ] No lint errors
- [ ] Documentation updated
- [ ] Examples work
- [ ] No console.log/debugger statements
- [ ] Performance is acceptable
- [ ] Edge cases handled
- [ ] Error messages are clear
- [ ] TODO.md updated
- [ ] Commit message follows convention

---

## 🎓 Learning Resources

### JavaScript/Web APIs

- [MDN Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [MDN SVG](https://developer.mozilla.org/en-US/docs/Web/SVG)
- [WebGL Fundamentals](https://webglfundamentals.org/)

### Similar Projects

- [p5.js](https://p5js.org/) - Creative coding library
- [D3.js](https://d3js.org/) - Data visualization
- [Three.js](https://threejs.org/) - 3D graphics
- [Paper.js](http://paperjs.org/) - Vector graphics

### Testing

- [Vitest Docs](https://vitest.dev/)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

---

## 📊 Success Metrics

Track your impact:

### Code Metrics
- Lines of code written
- Tests added
- Coverage improved
- Bugs fixed

### Quality Metrics
- Test pass rate
- Performance improvements
- Documentation pages added
- Code review feedback addressed

### Project Metrics
- Tasks completed
- Milestones reached
- Features delivered
- Research goals advanced

---

## 🎉 Milestones to Celebrate

- ✅ First primitive implemented
- ✅ Rendering pipeline working
- ✅ 80% test coverage reached
- ✅ First chart component complete
- ✅ Animation system functional
- ✅ Multi-agent system integrated
- ✅ Performance targets met
- ✅ Research paper accepted
- ✅ Project released!

---

## 🙏 Thank You!

Your contribution to Genesis.js helps advance research in AI-generated visual design. Every line of code, every test, and every documentation update brings us closer to understanding whether Direct Code Execution is a viable alternative to generative models.

**Let's build something amazing together!** 🚀

---

## Quick Reference

```bash
# Start development
npm run dev

# Run tests
npm test

# Check progress
cat TODO.md | grep "^\- \[x\]" | wc -l

# See your contributions
git log --author="YourName" --oneline

# Update documentation
npm run docs:dev
```

---

**Questions?** Check the docs or leave a comment in your commits!

**Ready to start?** Pick a task from TODO.md and let's go! 💪