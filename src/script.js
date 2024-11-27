// 初期化
const canvas = new fabric.Canvas('canvas', {
    width: 800,
    height: 600,
    backgroundColor: '#fff',
    selection: true,
  });
  
  let undoStack = [];
  let redoStack = [];
  let isGridVisible = false;
  
  // ユーティリティ関数
  function saveState() {
    undoStack.push(JSON.stringify(canvas));
    redoStack = []; // アンドゥ後の操作があるときリドゥはリセット
  }
  
  function applyState(state) {
    canvas.loadFromJSON(state, canvas.renderAll.bind(canvas));
  }
  
  // 基本操作
  document.getElementById('draw-rect').addEventListener('click', () => {
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: '#00f',
      width: 100,
      height: 100,
    });
    canvas.add(rect);
    saveState();
  });
  
  document.getElementById('draw-circle').addEventListener('click', () => {
    const circle = new fabric.Circle({
      left: 150,
      top: 150,
      fill: '#f00',
      radius: 50,
    });
    canvas.add(circle);
    saveState();
  });
  
  document.getElementById('draw-text').addEventListener('click', () => {
    const text = new fabric.Textbox('テキスト', {
      left: 200,
      top: 200,
      fontSize: 24,
      fill: '#000',
    });
    canvas.add(text);
    saveState();
  });
  
  document.getElementById('draw-line').addEventListener('click', () => {
    const line = new fabric.Line([50, 50, 200, 200], {
      stroke: '#000',
      strokeWidth: 2,
    });
    canvas.add(line);
    saveState();
  });
  
  document.getElementById('upload-image').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        fabric.Image.fromURL(e.target.result, (img) => {
          img.set({ left: 100, top: 100 });
          canvas.add(img);
          saveState();
        });
      };
      reader.readAsDataURL(file);
    }
  });
  
  // 削除・アンドゥ・リドゥ
  document.getElementById('delete').addEventListener('click', () => {
    canvas.getActiveObjects().forEach((obj) => canvas.remove(obj));
    canvas.discardActiveObject().renderAll();
    saveState();
  });
  
  document.getElementById('undo').addEventListener('click', () => {
    if (undoStack.length) {
      redoStack.push(JSON.stringify(canvas));
      applyState(undoStack.pop());
    }
  });
  
  document.getElementById('redo').addEventListener('click', () => {
    if (redoStack.length) {
      undoStack.push(JSON.stringify(canvas));
      applyState(redoStack.pop());
    }
  });
  
  // ズーム機能
  document.getElementById('zoom-in').addEventListener('click', () => {
    canvas.setZoom(canvas.getZoom() * 1.1);
  });
  
  document.getElementById('zoom-out').addEventListener('click', () => {
    canvas.setZoom(canvas.getZoom() * 0.9);
  });
  
  // プロパティ変更
  document.getElementById('color-picker').addEventListener('input', (event) => {
    const color = event.target.value;
    canvas.getActiveObjects().forEach((obj) => {
      if (obj.type === 'line') {
        obj.set('stroke', color);
      } else {
        obj.set('fill', color);
      }
    });
    canvas.renderAll();
  });
  
  document.getElementById('line-style').addEventListener('change', (event) => {
    const style = event.target.value;
    canvas.getActiveObjects().forEach((obj) => {
      if (obj.type === 'line') {
        obj.set('strokeDashArray', style === 'dashed' ? [5, 5] : null);
      }
    });
    canvas.renderAll();
  });
  
  document.getElementById('bold').addEventListener('click', () => {
    canvas.getActiveObjects().forEach((obj) => {
      if (obj.type === 'textbox') {
        obj.set('fontWeight', obj.fontWeight === 'bold' ? 'normal' : 'bold');
      }
    });
    canvas.renderAll();
  });
  
  document.getElementById('italic').addEventListener('click', () => {
    canvas.getActiveObjects().forEach((obj) => {
      if (obj.type === 'textbox') {
        obj.set('fontStyle', obj.fontStyle === 'italic' ? 'normal' : 'italic');
      }
    });
    canvas.renderAll();
  });
  
  // グリッド表示
  document.getElementById('toggle-grid').addEventListener('click', () => {
    isGridVisible = !isGridVisible;
    canvas.backgroundColor = isGridVisible ? 'rgba(220,220,220,0.5)' : '#fff';
    canvas.renderAll();
  });
  