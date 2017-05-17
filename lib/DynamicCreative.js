class DynamicCreative {
  constructor(canvas) {
    this.origin = canvas
  }

  add(elements) {
    this.elements = elements
  }

  /**
   * Resize the canvas
   * @param {Object} canvas
   * @return {Object}
   */
  toParams(canvas) {
    //Deep Copy the elements for multiply scale, we stringify elements first
    const elements_str = JSON.stringify(this.elements)
    var ans = JSON.parse(elements_str)
    ans = ans.sort((a, b) => {
      //Sort elements from top-bottom/right-left
      if (a.type != b.type)
        return a.type == 'Image' ? -1 : 1
      if (a.y == b.y) return a.x - b.x
      else return a.y - b.y
    })
    const scale = canvas.w / this.origin.w
    var last_y = canvas.h * 0.1
    var last_x = canvas.w * 0.1
    var prev_x = last_x
    var prev_y = last_y

    ans.map(item => {
      item.x = last_x
      item.y = last_y

      if (item.type === 'Image') {
        var temp_h = item.h * scale > canvas.h * 0.8 ? canvas.h * 0.8 : item.h * scale
        item.w = item.w * (temp_h / item.h)
        item.h = temp_h
      } else {
        item.h = last_y + item.h * scale > canvas.h * 0.8 ? canvas.h * 0.8 : item.h * scale
        item.w = item.h
      }

      if (item.h + item.y > canvas.h * 0.8) {
        item.y = canvas.h * 0.1
        item.x = prev_x + 10
        last_x = item.x + item.w + 10
      }

      if (item.w + item.x > canvas.w * 0.9) {
        item.x = canvas.w * 0.1
        item.y = last_y + 10
      }

      prev_x = Math.max(item.x + item.w + 10, prev_x)
      last_y = item.y + item.h + 10
    })
    return ans
  }
}

module.exports = DynamicCreative