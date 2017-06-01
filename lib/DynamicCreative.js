
class DynamicCreative {

  constructor(canvas) {
    // TODO implement this
    this._canvas = canvas;
    this._elements = [];
  }

  add(elements) {
    // TODO implement this
    this._elements = elements;
  }

  toParams(canvas) {
    // TODO implement this
    var width = canvas.w;
    var height = canvas.h;
    var temparr = this._elements;
    return temparr;
  }


}

module.exports = DynamicCreative
