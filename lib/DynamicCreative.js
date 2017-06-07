
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

  calculateRateMaxValues(width, height, index) {
    let ratio = this._aspects[index]
    let w = 0, h = 0, tempw = 0, temph = 0
    if(ratio > 1) {
      if(width >= height) {
        for(var i = 1; i < height; i++) {
          tempw = i*ratio
          if(tempw > width) {
            break
          } else {
            w = tempw
            h = i
          }
        }
      } else {
        for(var i = 1; i < width; i++) {
          temph = i/ratio
          h = temph
          w = i
        }
      }
    } else {
      if(width >= height) {
        for(var i = 1; i < height; i++) {
          tempw = i*ratio
          w = tempw
          h = i
        }
      } else {
        for(var i = 1; i < width; i++) {
          temph = i/ratio
          if(temph > height) {
            break
          } else {
            w = i
            h = temph
          }
        }
      }
    }

    return {wlength: w, hlength: h}
  }

  calculateVerticalRegion(width, height) {
    let me = this
    let unsortedEls = JSON.parse(JSON.stringify(this._elements))
    //image1
    let boxPading = 5
    let firstH = height*(unsortedEls[2].h/(unsortedEls[2].h+unsortedEls[1].h+unsortedEls[3].h))
    let secondH = height*(unsortedEls[1].h/(unsortedEls[2].h+unsortedEls[1].h+unsortedEls[3].h))
    unsortedEls[2].y = boxPading
    let calobj = me.calculateRateMaxValues(width - 2*boxPading, firstH - 2*boxPading, 2)
    unsortedEls[2].w = calobj.wlength
    unsortedEls[2].h = calobj.hlength
    unsortedEls[2].x = width/2 - unsortedEls[2].w/2 - boxPading

    //text1
    unsortedEls[1].x = boxPading
    unsortedEls[1].y = firstH+boxPading
    let calobj1 = me.calculateRateMaxValues((width-3*boxPading)*(unsortedEls[1].w/(unsortedEls[1].w+unsortedEls[0].w)), secondH - 2*boxPading, 1)
    unsortedEls[1].w = calobj1.wlength
    unsortedEls[1].h = calobj1.hlength

    //image2
    unsortedEls[0].x = unsortedEls[1].w+2*boxPading
    unsortedEls[0].y = firstH+boxPading
    unsortedEls[0].w = width-3*boxPading-unsortedEls[1].w
    unsortedEls[0].h = unsortedEls[0].w/this._aspects[0]
    //text2
    unsortedEls[3].x = boxPading
    unsortedEls[3].y = firstH+secondH+boxPading
    let calobj2 = me.calculateRateMaxValues(width-2*boxPading, height - firstH - secondH - 2*boxPading, 3)
    unsortedEls[3].w = calobj2.wlength
    unsortedEls[3].h = calobj2.hlength

    return unsortedEls
  }

  calculateHorizontalRegion(width, height) {
    let me = this
    let unsortedEls = JSON.parse(JSON.stringify(this._elements))

    //text2
    let boxPading = 5
    let firstW = width*(unsortedEls[3].w/(unsortedEls[3].w+unsortedEls[2].w+unsortedEls[0].w))
    let secondW = width*(unsortedEls[2].w/(unsortedEls[3].w+unsortedEls[2].w+unsortedEls[0].w))
    let widthrate = unsortedEls[3].w/unsortedEls[1].w
    unsortedEls[3].x = boxPading
    unsortedEls[3].y = boxPading
    let calobj = me.calculateRateMaxValues(firstW - 2*boxPading, (height-3*boxPading)*(unsortedEls[3].h/(unsortedEls[3].h+unsortedEls[1].h)), 3)
    unsortedEls[3].w = calobj.wlength
    unsortedEls[3].h = calobj.hlength
    //text1
    unsortedEls[1].x = boxPading
    let calobj1 = me.calculateRateMaxValues(firstW - 2*boxPading, height-3*boxPading-unsortedEls[3].h, 1)
    unsortedEls[1].w = calobj1.wlength
    unsortedEls[1].h = calobj1.hlength
    unsortedEls[1].y = height - boxPading - unsortedEls[1].h
    //unsortedEls[3].w/widthrate
    //image1
    unsortedEls[2].x = firstW+boxPading
    let calobj2 = me.calculateRateMaxValues(secondW - 2*boxPading, height - 2*boxPading, 2)
    unsortedEls[2].w = calobj2.wlength
    unsortedEls[2].h = calobj2.hlength
    unsortedEls[2].y = height - 2*boxPading - unsortedEls[2].h
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
    if(scalecanvas.w < scalecanvas.h) {
      return me.calculateVerticalRegion(scalecanvas.w, scalecanvas.h)
    } else {
      return me.calculateHorizontalRegion(scalecanvas.w, scalecanvas.h)
    }
  }


}

module.exports = DynamicCreative
