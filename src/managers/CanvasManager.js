import { CANVAS_WIDTH, CANVAS_HEIGHT, DEFAULT_GRID_SIZE } from '../config.js';

export default class CanvasManager {
  constructor(canvasId) {
    this.canvasId = canvasId;
    this.canvas = null;
    this.isGridVisible = false;
    this.gridSize = DEFAULT_GRID_SIZE;
    this.gridLines = [];
  }

  // キャンバスを初期化する
  initializeCanvas() {
    this.canvas = new fabric.Canvas(this.canvasId, {
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      backgroundColor: '#ffffff',
      selection: true,
    });

    this.attachCanvasEvents();
    console.log('Canvas initialized:', this.canvas);
  }

  // キャンバスイベントを設定する
  attachCanvasEvents() {
    this.canvas.on('object:added', () => {
      console.log('Object added to canvas');
    });

    this.canvas.on('object:modified', () => {
      console.log('Object modified');
    });

    this.canvas.on('object:removed', () => {
      console.log('Object removed from canvas');
    });
  }

  // ズームイン
  zoomIn() {
    const currentZoom = this.canvas.getZoom();
    this.canvas.setZoom(currentZoom * 1.1);
    console.log('Zoom In: ', this.canvas.getZoom());
  }

  // ズームアウト
  zoomOut() {
    const currentZoom = this.canvas.getZoom();
    this.canvas.setZoom(currentZoom * 0.9);
    console.log('Zoom Out: ', this.canvas.getZoom());
  }

  // グリッドの表示・非表示を切り替え
  toggleGrid() {
    if (this.isGridVisible) {
      this._hideGrid();
    } else {
      this._showGrid();
    }
    this.isGridVisible = !this.isGridVisible;
  }

  // グリッドを表示
  _showGrid() {
    const gridSize = this.gridSize;
    const width = this.canvas.width;
    const height = this.canvas.height;

    // 水平線と垂直線を描画
    for (let i = 0; i < width; i += gridSize) {
      const verticalLine = new fabric.Line([i, 0, i, height], {
        stroke: '#e0e0e0',
        selectable: false,
        excludeFromExport: true,
      });
      this.canvas.add(verticalLine);
      this.gridLines.push(verticalLine);
    }

    for (let j = 0; j < height; j += gridSize) {
      const horizontalLine = new fabric.Line([0, j, width, j], {
        stroke: '#e0e0e0',
        selectable: false,
        excludeFromExport: true,
      });
      this.canvas.add(horizontalLine);
      this.gridLines.push(horizontalLine);
    }

    this.canvas.renderAll();
    console.log('Grid shown');
  }

  // グリッドを非表示
  _hideGrid() {
    this.gridLines.forEach((line) => this.canvas.remove(line));
    this.gridLines = [];
    this.canvas.renderAll();
    console.log('Grid hidden');
  }

  // 背景色を設定
  setBackgroundColor(color) {
    this.canvas.setBackgroundColor(color, this.canvas.renderAll.bind(this.canvas));
    console.log('Background color set to:', color);
  }

  // キャンバスをクリア
  clearCanvas() {
    this.canvas.clear();
    console.log('Canvas cleared');
  }
}
