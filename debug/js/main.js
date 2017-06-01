if (!window.$$) {
  $$ = {}
}


$$.Board = class Board {
  constructor(opts) {
    this._dom = document.createElement("canvas")
    this._dom.width = opts.w
    this._dom.height = opts.h
    document.getElementById("board").appendChild(this._dom)
    this._ctx = this._dom.getContext("2d")
  }

  paint(elements) {
    elements.map(item => {
      if(item.type == 'Image' && item.id == 'image1') {
        this._ctx.beginPath();
        this._ctx.ellipse((item.x+item.w+this._dom.width-800)/2, (item.y+item.h+this._dom.height-200)/2, item.x+item.w-100, item.y+100, 0, 0, 2 * Math.PI);
        this._ctx.stroke();
        this._ctx.fill()
      } else if(item.type == 'Image' && item.id == 'image2') {
        this._ctx.beginPath()
        this._ctx.arc((item.x+item.w+this._dom.width-50)/2, (item.y+item.h+this._dom.height-50)/2, item.h/2, 0, Math.PI*2, false)
        this._ctx.stroke()
        this._ctx.fill()
        //this._ctx.fillText(item.id, item.x, item.y)
      } else if(item.type == 'Text') {
        this._ctx.fillRect(item.x, item.y, item.w, item.h)
        this._ctx.fillText(item.id, item.x, item.y)
      }
    })
  }
}





{
  /**
   * Main
   */
  let drawResult = (canvas, elements) => {
    let board = new ($$.Board)(canvas)
    board.paint(elements)
  }

  const base_height = 400
  let getCanvas = (normalized_width) => {
    return {
      w: normalized_width * base_height,
      h: base_height,
    }
  }

  window.onload = () => {

    // TODO display initial elements to correct positions
    let elements = [
      { id: 'image2', type: 'Image', x: 300, y: 160, w: 80 , h: 40  },
      { id: 'text1' , type: 'Text' , x: 20 , y: 30 , w: 160, h: 200 },
      { id: 'image1', type: 'Image', x: 200, y: 30 , w: 180, h: 100 },
      { id: 'text2' , type: 'Text' , x: 20 , y: 260, w: 360, h: 40  },
    ]

    let INPUT_W = 4.7
    canvas = getCanvas(INPUT_W)

    let DynamicCreative = require('dynamic-creative').DynamicCreative
    let dc = new DynamicCreative(canvas)
    dc.add(elements)

    drawResult(canvas, dc.toParams(canvas))

  } // end window.onload

}
