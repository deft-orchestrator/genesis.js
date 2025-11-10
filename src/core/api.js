// src/core/api.js
import { circle as createCircle, rectangle as createRectangle, line as createLine, ellipse as createEllipse, polygon as createPolygon } from '../primitives/shapes.js';

export class MidLevelAPI {
  constructor(genesis) {
    this.g = genesis;
  }

  circle(x, y, radius, options = {}) {
    const element = createCircle(x, y, radius, options);
    this.g.scene.push(element);
    return element;
  }

  rect(x, y, width, height, options = {}) {
    const element = createRectangle(x, y, width, height, options);
    this.g.scene.push(element);
    return element;
  }

  line(x1, y1, x2, y2, options = {}) {
    const element = createLine(x1, y1, x2, y2, options);
    this.g.scene.push(element);
    return element;
  }

  ellipse(x, y, rx, ry, options = {}) {
    const element = createEllipse(x, y, rx, ry, options);
    this.g.scene.push(element);
    return element;
  }

  polygon(points, options = {}) {
    const element = createPolygon(points, options);
    this.g.scene.push(element);
    return element;
  }

  text(content, options = {}) {
    const element = {
      type: 'text',
      text: content,
      ...options,
    };
    this.g.scene.push(element);
    return element;
  }
}

export class LowLevelAPI {
  constructor(genesis) {
    this.g = genesis;
  }

  c(x, y, r, f, s, sw) {
    return this.g.mid.circle(x, y, r, { fill: f, stroke: s, strokeWidth: sw });
  }

  r(x, y, w, h, f, s, sw) {
    return this.g.mid.rect(x, y, w, h, { fill: f, stroke: s, strokeWidth: sw });
  }

  t(txt, x, y, sz, c) {
    return this.g.mid.text(txt, { x, y, size: sz, color: c });
  }
}
