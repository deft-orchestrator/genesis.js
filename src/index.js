import * as shapes from './primitives/shapes.js';
import * as renderer from './core/renderer.js';

const scene = [];

const api = {
  ...shapes,
};

export default {
  api,
  renderer,
  scene,
};
