export default class ShapeManager {
    constructor(canvas) {
      if (!canvas) {
        throw new Error('Canvas instance is required for ShapeManager');
      }
      this.canvas = canvas;
    }
  
    /**
     * 矩形を追加する
     * @param {Object} properties 矩形のプロパティ (色、大きさなど)
     */
    addRectangle(properties = {}) {
      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: properties.fill || '#007BFF',
        width: properties.width || 100,
        height: properties.height || 100,
        ...properties,
      });
      this.canvas.add(rect);
      this.canvas.setActiveObject(rect);
    }
  
    /**
     * 円を追加する
     * @param {Object} properties 円のプロパティ (色、半径など)
     */
    addCircle(properties = {}) {
      const circle = new fabric.Circle({
        left: 150,
        top: 150,
        fill: properties.fill || '#FFC107',
        radius: properties.radius || 50,
        ...properties,
      });
      this.canvas.add(circle);
      this.canvas.setActiveObject(circle);
    }
  
    /**
     * 線分を追加する
     * @param {Object} properties 線分のプロパティ (色、幅、位置など)
     */
    addLine(properties = {}) {
      const line = new fabric.Line([50, 50, 200, 200], {
        stroke: properties.stroke || '#000',
        strokeWidth: properties.strokeWidth || 2,
        ...properties,
      });
      this.canvas.add(line);
      this.canvas.setActiveObject(line);
    }
  
    /**
     * テキストを追加する
     * @param {String} text テキスト内容
     * @param {Object} properties テキストのプロパティ (色、フォントサイズなど)
     */
    addText(text = 'テキスト', properties = {}) {
      const textbox = new fabric.Textbox(text, {
        left: 200,
        top: 200,
        fontSize: properties.fontSize || 24,
        fill: properties.fill || '#000',
        width: properties.width || 200,
        ...properties,
      });
      this.canvas.add(textbox);
      this.canvas.setActiveObject(textbox);
    }
  
    /**
     * 画像を追加する
     * @param {File | String} imageSource 画像のソース (ファイルまたはURL)
     * @param {Object} properties 画像のプロパティ (位置、サイズなど)
     */
    addImage(imageSource, properties = {}) {
      if (typeof imageSource === 'string') {
        // URLから画像を追加
        fabric.Image.fromURL(imageSource, (img) => {
          img.set({
            left: 100,
            top: 100,
            ...properties,
          });
          this.canvas.add(img);
          this.canvas.setActiveObject(img);
        });
      } else if (imageSource instanceof File) {
        // ファイルから画像を追加
        const reader = new FileReader();
        reader.onload = (e) => {
          fabric.Image.fromURL(e.target.result, (img) => {
            img.set({
              left: 100,
              top: 100,
              ...properties,
            });
            this.canvas.add(img);
            this.canvas.setActiveObject(img);
          });
        };
        reader.readAsDataURL(imageSource);
      } else {
        throw new Error('Invalid image source. Provide a URL or File instance.');
      }
    }
  
    /**
     * 選択されたオブジェクトを削除する
     */
    deleteSelected() {
      const activeObjects = this.canvas.getActiveObjects();
      if (activeObjects.length) {
        activeObjects.forEach((obj) => this.canvas.remove(obj));
        this.canvas.discardActiveObject().renderAll();
      }
    }
  
    /**
     * 選択を解除する
     */
    clearSelection() {
      this.canvas.discardActiveObject().renderAll();
    }
  }
  