import CanvasManager from './managers/CanvasManager.js';

const canvasManager = new CanvasManager('canvas');
canvasManager.initializeCanvas();

// UI ボタンと連携
document.getElementById('zoom-in').addEventListener('click', () => canvasManager.zoomIn());
document.getElementById('zoom-out').addEventListener('click', () => canvasManager.zoomOut());
document.getElementById('toggle-grid').addEventListener('click', () => canvasManager.toggleGrid());
document.getElementById('clear-canvas').addEventListener('click', () => canvasManager.clearCanvas());
document.getElementById('background-color').addEventListener('change', (event) => {
  canvasManager.setBackgroundColor(event.target.value);
});
