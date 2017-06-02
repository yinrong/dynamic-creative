
class DynamicCreative {

  constructor(canvas) {
    // TODO implement this
    this._canvas = canvas
    this._elements = []
    this._aspects = []
  }

  add(elements) {
    // TODO implement this
    if(Array.isArray(elements)) {
      this._elements = elements
      this._elements.map(item => {
        let rate = (item.w/item.h).toFixed(1)
        this._aspects.push(rate)
      })
    }
  }

  calculateVerticalRegion(width, height) {
    let unsortedEls = JSON.parse(JSON.stringify(this._elements))
    //image1
    let boxPading = 5
    let firstH = height*(unsortedEls[2].h/(unsortedEls[2].h+unsortedEls[1].h+unsortedEls[3].h))
    let secondH = height*(unsortedEls[1].h/(unsortedEls[2].h+unsortedEls[1].h+unsortedEls[3].h))
    unsortedEls[2].x = boxPading
    unsortedEls[2].y = boxPading
    unsortedEls[2].w = width - 2*boxPading
    unsortedEls[2].h = firstH - 2*boxPading
    //text1
    unsortedEls[1].x = boxPading
    unsortedEls[1].y = firstH+boxPading
    unsortedEls[1].w = (width-3*boxPading)*(unsortedEls[1].w/(unsortedEls[1].w+unsortedEls[0].w))
    unsortedEls[1].h = secondH - 2*boxPading
    //image2
    unsortedEls[0].x = unsortedEls[1].w+2*boxPading
    unsortedEls[0].y = firstH+boxPading
    unsortedEls[0].w = width-3*boxPading-unsortedEls[1].w
    unsortedEls[0].h = unsortedEls[0].w/this._aspects[0]
    //text2
    unsortedEls[3].x = boxPading
    unsortedEls[3].y = firstH+secondH+boxPading
    unsortedEls[3].w = width-2*boxPading
    unsortedEls[3].h = height - firstH - secondH - 2*boxPading

    return unsortedEls
  }

  calculateHorizontalRegion(width, height) {
    let unsortedEls = JSON.parse(JSON.stringify(this._elements))

    //text2
    let boxPading = 5
    let firstW = width*(unsortedEls[3].w/(unsortedEls[3].w+unsortedEls[2].w+unsortedEls[0].w))
    let secondW = width*(unsortedEls[2].w/(unsortedEls[3].w+unsortedEls[2].w+unsortedEls[0].w))
    let widthrate = unsortedEls[3].w/unsortedEls[1].w
    unsortedEls[3].x = boxPading
    unsortedEls[3].y = boxPading
    unsortedEls[3].w = firstW - 2*boxPading
    unsortedEls[3].h = (height-3*boxPading)*(unsortedEls[3].h/(unsortedEls[3].h+unsortedEls[1].h))
    //text1
    unsortedEls[1].x = boxPading
    unsortedEls[1].y = 2*boxPading+unsortedEls[3].h
    unsortedEls[1].w = unsortedEls[3].w/widthrate
    unsortedEls[1].h = height-3*boxPading-unsortedEls[3].h
    //image1
    unsortedEls[2].x = firstW+boxPading
    unsortedEls[2].y = boxPading
    unsortedEls[2].w = secondW - 2*boxPading
    unsortedEls[2].h = height - 2*boxPading
    //image2
    unsortedEls[0].x = firstW+secondW+boxPading
    unsortedEls[0].w = width-firstW-secondW-2*boxPading
    unsortedEls[0].h = unsortedEls[0].w/this._aspects[0]
    unsortedEls[0].y = height-boxPading-unsortedEls[0].h

    return unsortedEls
  }

  toParams(canvas) {
    // TODO implement this
    var me = this
    let scalecanvas = canvas
    let newElements = []
    let originalElements = this._elements
    let proportion = (scalecanvas.w/this._canvas.w).toFixed(1)
    if(parseFloat((scalecanvas.w/scalecanvas.h).toFixed(1)) < this._aspects[2]) {
      return me.calculateVerticalRegion(scalecanvas.w, scalecanvas.h)
    } else {
      return me.calculateHorizontalRegion(scalecanvas.w, scalecanvas.h)
    }
  }


}

module.exports = DynamicCreative
