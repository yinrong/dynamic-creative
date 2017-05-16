
class DynamicCreative {

  constructor() {
    // TODO implement this
  }

  add(elements) {
    // TODO implement this
  }

  toParams(canvas) {
    // TODO implement this
    return [
      { id: 'image1',
        type: 'Image',
        x: 24,
        y: 30,
        w: 192,
        h: 106.66666666666667 },
      { id: 'image2', type: 'Image', x: 180, y: 160, w: 48, h: 24 },
      { id: 'text1',
        type: 'Text',
        x: 20,
        y: 146.66666666666669,
        w: 150,
        h: 128 },
      { id: 'text2',
        type: 'Text',
        x: 24,
        y: 284.6666666666667,
        w: 192,
        h: 45 },
    ]
  }


}

module.exports = DynamicCreative


