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
