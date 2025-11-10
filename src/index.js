import * as shapes from './primitives/shapes.js';
import { Renderer } from './core/renderer.js';

const scene = [];

const api = {
  ...shapes,
};

export default {
  api,
  renderer: new Renderer({ backend: 'canvas' }),
  scene,
};
