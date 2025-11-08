import genesis from 'genesis.js';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('genesis-canvas');
  if (!canvas) {
    console.error('Canvas element not found!');
    return;
  }

  // Set the canvas for the renderer
  genesis.renderer.target = canvas;

  // Draw a blue circle
  genesis.api.circle(100, 100, 50, {
    fill: '#3498db',
    stroke: '#2980b9',
    strokeWidth: 4,
  });

  // Draw a red rectangle
  genesis.api.rect(200, 50, 150, 100, {
    fill: '#e74c3c',
  });

  // Draw a purple rounded rectangle
  genesis.api.rect(400, 50, 150, 100, {
    fill: '#8e44ad',
    cornerRadius: 20,
  });

  // Render the scene
  genesis.renderer.render(genesis.scene, canvas);
});
