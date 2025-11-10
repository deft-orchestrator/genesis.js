// src/genesis.js
import { Renderer } from './core/renderer.js';
import { Validator } from './core/validator.js';
import { ErrorHandler } from './core/error-handler.js';
import { MidLevelAPI, LowLevelAPI } from './core/api.js';

export class Genesis {
  constructor(config = {}) {
    this.config = {
      backend: 'canvas',
      ...config,
    };

    this.scene = [];
    this.renderer = new Renderer(this.config);
    this.validator = new Validator();
    this.errorHandler = new ErrorHandler();

    this.mid = new MidLevelAPI(this);
    this.low = new LowLevelAPI(this);
  }

  render(target) {
    return this.renderer.render(this.scene, target);
  }
}
