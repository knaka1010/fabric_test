import CanvasManager from './managers/CanvasManager.js';
import ShapeManager from './managers/ShapeManager.js';

const canvasManager = new CanvasManager('canvas');
canvasManager.initializeCanvas();

const shapeManager = new ShapeManager(canvasManager.canvas);

// UI ボタンと連携
document.getElementById('zoom-in').addEventListener('click', () => canvasManager.zoomIn());
document.getElementById('zoom-out').addEventListener('click', () => canvasManager.zoomOut());
document.getElementById('toggle-grid').addEventListener('click', () => canvasManager.toggleGrid());
document.getElementById('clear-canvas').addEventListener('click', () => canvasManager.clearCanvas());
document.getElementById('background-color').addEventListener('change', (event) => {
  canvasManager.setBackgroundColor(event.target.value);
});

// 矩形の追加
document.getElementById('add-rect').addEventListener('click', () => {
  shapeManager.addRectangle({ fill: '#FF0000', width: 150, height: 100 });
});

// 円の追加
document.getElementById('add-circle').addEventListener('click', () => {
  shapeManager.addCircle({ fill: '#00FF00', radius: 75 });
});

// テキストの追加
document.getElementById('add-text').addEventListener('click', () => {
  shapeManager.addText('こんにちは', { fontSize: 30, fill: '#0000FF' });
});

// 画像の追加
document.getElementById('add-image').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    shapeManager.addImage(file, { left: 50, top: 50 });
  }
});

// 選択されたオブジェクトを削除
document.getElementById('delete-selected').addEventListener('click', () => {
  shapeManager.deleteSelected();
});
