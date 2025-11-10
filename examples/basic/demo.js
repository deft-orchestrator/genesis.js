import genesis from 'genesis.js';

document.addEventListener('DOMContentLoaded', () => {
  // Debug: log scene before render
  console.log('Genesis scene:', genesis.scene);
  const canvas = document.getElementById('genesis-canvas');
  if (!canvas) {
    console.error('Canvas element not found!');
    return;
  }

  // Tidak perlu set target pada renderer, langsung render ke canvas


  // Draw a blue circle
  const circle = genesis.api.circle(100, 100, 50, {
    fill: '#3498db',
    stroke: '#2980b9',
    strokeWidth: 4,
  });
  genesis.scene.push(circle);

  // Draw a red rectangle
  const rect1 = genesis.api.rectangle(200, 50, 150, 100, {
    fill: '#e74c3c',
  });
  genesis.scene.push(rect1);

  // Draw a purple rounded rectangle
  const rect2 = genesis.api.rectangle(400, 50, 150, 100, {
    fill: '#8e44ad',
    cornerRadius: 20,
  });
  genesis.scene.push(rect2);

  // Render the scene
  genesis.renderer.render(genesis.scene, canvas);
});
