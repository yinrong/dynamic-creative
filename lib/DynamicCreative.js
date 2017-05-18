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
    var prev_y = 0
    var elements_count = 0
    var max_rate = scale > 2 ? 0.8 : 0.5

    ans.map(item => {
      if (item.type === 'Image') {
        let temp_h = item.h * scale > canvas.h * max_rate ? canvas.h * max_rate : item.h * scale
        item.w = item.w * (temp_h / item.h)
        item.h = temp_h
        item.x = last_x
        item.y = last_y
        last_x = item.x + item.w + 10
        prev_y = Math.max(item.y + item.h + 10, prev_y)
      } else {
        if (scale > 2) {
          item.h = (canvas.h * 0.9 - last_y) / (ans.length - elements_count)
          item.w = canvas.w * 0.9 - last_x
          item.x = last_x
          item.y = last_y
          last_y = item.y + item.h + 10
        } else {
          item.h = (canvas.h * 0.9 - prev_y) / (ans.length - elements_count)
          item.w = canvas.w * 0.8
          item.x = canvas.w * 0.1
          item.y = prev_y
          prev_y = item.y + item.h + 10
        }
      }
      elements_count += 1
    })


    return ans
  }
}

module.exports = DynamicCreative