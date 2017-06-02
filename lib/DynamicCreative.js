
class DynamicCreative {

  constructor(canvas) {
    // TODO implement this
    this._canvas = canvas;
    this._elements = [];
    this._aspects = [];
  }

  add(elements) {
    // TODO implement this
    if(Array.isArray(elements)) {
      this._elements = elements;
      this._elements.map(item => {
        let rate = (item.w/item.h).toFixed(1);
        this._aspects.push(rate);
      });
    }
  }

  toParams(canvas) {
    // TODO implement this
    let scalecanvas = canvas;
    let newElements = [];
    let originalElements = this._elements;
    let containerWidth = canvas.w;
    let boxSpacing = 15;
    let layoutGeometry = require('justified-layout')(this._aspects, {
      containerWidth: containerWidth,
      boxSpacing: boxSpacing,
      windowLayoutStyle: 'center'
    });
    let boxes = layoutGeometry.boxes;
    console.log('the container height is ', layoutGeometry.containerHeight);
    console.log(JSON.stringify(boxes));
    canvas.h = layoutGeometry.containerHeight;
    originalElements.map((item,idx) => {
      let newitem = {}
      newitem.id = item.id;
      newitem.type = item.type;
      newitem.x = boxes[idx].left;
      newitem.y = boxes[idx].top;
      newitem.w = boxes[idx].width;
      newitem.h = boxes[idx].height;
      newElements.push(newitem);
    });
    return newElements;
  }


}

module.exports = DynamicCreative;
