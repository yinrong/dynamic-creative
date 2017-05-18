class DynamicCreative {
  constructor(canvas) {
    this.origin = canvas
  }

  add(elements) {
    this.elements = elements
  }

  /**
   * Sort the element, and deep copy it for multiply scale
   * Sort from top-bottom/right-left
   * @return {Array}
   */
  _copy_sort() {
    const elements_str = JSON.stringify(this.elements)
    var ans = JSON.parse(elements_str)
    var elements = ans.sort((a, b) => {
      if (a.type != b.type)
        return a.type === 'Image' ? -1 : 1
      if (a.y == b.y) return a.x - b.x
      else return a.y - b.y
    })
    return elements
  }

  /**
   * If scale<1, roate the canvas
   * @param {Object} canvas
   * @param {Array} ans
   */
  _rotate(canvas, ans) {
    var temp = canvas.w
    canvas.w = canvas.h
    canvas.h = temp
    ans.map(item => {
      var temp = item.w
      item.w = item.h
      item.h = temp
    })
  }

  /**
   * If scale<1, roate the canvas into origin
   * @param {Object} canvas
   * @param {Array} ans
   */
  _rotate_ans(canvas, ans) {
    canvas = this._rotate(canvas, ans)
    ans.map(item => {
      var temp = item.x
      item.x = item.y
      item.y = temp
    })
  }

  /**
   * Resize the canvas
   * @param {Object} canvas
   * @return {Object}
   */
  toParams(canvas) {
    var ans = this._copy_sort()
    var scale = canvas.w / this.origin.w
    var last_x = canvas.w * 0.1
    var last_y = canvas.h * 0.1
    var elements_count = 0
    if (scale < 1) this._rotate(canvas, ans)
    ans.map(item => {
      if (item.type === 'Image') {
        var tempH = item.h * scale > canvas.h * 0.5 ? canvas.h * 0.5 : item.h * scale
        item.w = item.w * (tempH / item.h)
        item.h = tempH
        item.y = canvas.h * 0.1
        item.x = last_x
        last_x = item.x + item.w + 10
        last_y = Math.max(item.y + item.h + 10, last_y)
      } else {
        item.x = last_x
        item.w = (canvas.w * 0.9 - last_x) / (ans.length - elements_count)
        item.h = canvas.h * 0.8
        if (last_y + item.w < canvas.h * 0.9) {
          console.log(item.id)
          item.y = last_y + 10
          item.x = canvas.w * 0.1
          item.h = (canvas.h * 0.9 - last_y) / (ans.length - elements_count)
          item.w = last_x - canvas.w * 0.1
        } else item.y = canvas.h * 0.1
        last_x = item.x + item.w + 10
        last_y = Math.max(item.y + item.h + 10, last_y)
      }
      elements_count += 1
    })
    if (scale < 1) this._rotate_ans(canvas, ans)
    return ans
  }
}

module.exports = DynamicCreative