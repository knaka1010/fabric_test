export default class LayerManager {
    constructor(canvas) {
      if (!canvas) {
        throw new Error('Canvas instance is required for LayerManager');
      }
      this.canvas = canvas;
    }
  
    /**
     * オブジェクトに名前を付ける
     * @param {fabric.Object} object 名前を付けたいオブジェクト
     * @param {string} name レイヤー名
     */
    renameLayer(object, name) {
      if (!object) {
        console.error('No object selected for renaming');
        return;
      }
      object.set('layerName', name);
      this.canvas.renderAll();
      console.log(`Layer renamed to: ${name}`);
    }
  
    /**
     * 選択されたオブジェクトを最前面に移動
     */
    moveLayerToFront() {
      const activeObject = this.canvas.getActiveObject();
      if (activeObject) {
        this.canvas.bringToFront(activeObject);
        this.canvas.renderAll();
        console.log('Layer moved to front');
      } else {
        console.warn('No object selected to move to front');
      }
    }
  
    /**
     * 選択されたオブジェクトを最背面に移動
     */
    moveLayerToBack() {
      const activeObject = this.canvas.getActiveObject();
      if (activeObject) {
        this.canvas.sendToBack(activeObject);
        this.canvas.renderAll();
        console.log('Layer moved to back');
      } else {
        console.warn('No object selected to move to back');
      }
    }
  
    /**
     * 選択されたオブジェクトを1つ上に移動
     */
    moveLayerUp() {
      const activeObject = this.canvas.getActiveObject();
      if (activeObject) {
        this.canvas.bringForward(activeObject);
        this.canvas.renderAll();
        console.log('Layer moved up');
      } else {
        console.warn('No object selected to move up');
      }
    }
  
    /**
     * 選択されたオブジェクトを1つ下に移動
     */
    moveLayerDown() {
      const activeObject = this.canvas.getActiveObject();
      if (activeObject) {
        this.canvas.sendBackwards(activeObject);
        this.canvas.renderAll();
        console.log('Layer moved down');
      } else {
        console.warn('No object selected to move down');
      }
    }
  
    /**
     * レイヤー（オブジェクト）をロック
     */
    lockLayer() {
      const activeObject = this.canvas.getActiveObject();
      if (activeObject) {
        activeObject.set('selectable', false);
        this.canvas.renderAll();
        console.log('Layer locked');
      } else {
        console.warn('No object selected to lock');
      }
    }
  
    /**
     * レイヤー（オブジェクト）のロックを解除
     */
    unlockLayer() {
      const activeObject = this.canvas.getActiveObject();
      if (activeObject) {
        activeObject.set('selectable', true);
        this.canvas.renderAll();
        console.log('Layer unlocked');
      } else {
        console.warn('No object selected to unlock');
      }
    }
  
    /**
     * レイヤー（オブジェクト）を非表示にする
     */
    hideLayer() {
      const activeObject = this.canvas.getActiveObject();
      if (activeObject) {
        activeObject.set('visible', false);
        this.canvas.renderAll();
        console.log('Layer hidden');
      } else {
        console.warn('No object selected to hide');
      }
    }
  
    /**
     * レイヤー（オブジェクト）を表示する
     */
    showLayer() {
      const activeObject = this.canvas.getActiveObject();
      if (activeObject) {
        activeObject.set('visible', true);
        this.canvas.renderAll();
        console.log('Layer shown');
      } else {
        console.warn('No object selected to show');
      }
    }
  
    /**
     * キャンバス内のすべてのレイヤー情報を取得
     * @returns {Array} レイヤー情報の配列
     */
    getAllLayers() {
      const layers = this.canvas.getObjects().map((obj) => ({
        layerName: obj.layerName || 'Unnamed Layer',
        type: obj.type,
        id: obj.id || null,
        visible: obj.visible,
        locked: !obj.selectable,
      }));
      console.table(layers);
      return layers;
    }
  }
  