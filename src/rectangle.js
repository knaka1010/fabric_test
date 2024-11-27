// Canvasの初期化
const canvas = new fabric.Canvas('canvas');

// 矩形を作成
const rect = new fabric.Rect({
    left: 100, // 矩形のX座標
    top: 100,  // 矩形のY座標
    fill: 'red', // 塗りの色
    width: 100, // 幅
    height: 100, // 高さ
});

const gridSize = 50; // グリッド間隔
for (let i = 0; i < 800; i += gridSize) {
    canvas.add(new fabric.Line([i, 0, i, 600], { stroke: '#ccc', selectable: false }));
    canvas.add(new fabric.Line([0, i, 800, i], { stroke: '#ccc', selectable: false }));
}

//グリッドを吸着
canvas.on('object:moving', function(e) {
    const obj = e.target;

    // スナップ計算
    obj.left = Math.round(obj.left / gridSize) * gridSize;
    obj.top = Math.round(obj.top / gridSize) * gridSize;
});

// Canvasに追加
canvas.add(rect);

document.getElementById('addRect').addEventListener('click', () => {
    const newRect = new fabric.Rect({
        left: Math.random() * 400,
        top: Math.random() * 400,
        fill: 'green',
        width: 100,
        height: 100
    });
    canvas.add(newRect);
});
