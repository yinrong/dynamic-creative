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
        var ans = [].concat(JSON.parse(JSON.stringify(this.elements)))
        ans = ans.sort(function(a, b) {
            /**
             * Sort elements from top-bottom/right-left
             */
            if (a.type != b.type)
                return a.type == 'Image' ? -1 : 1
            if (a.y == b.y) return a.x - b.x
            else return a.y - b.y
        })

        var scale = canvas.w / this.origin.w

        console.log("=======BEGIN===", "W: ", canvas.w, "H: ", canvas.h, "Scale: ", scale)


        if (scale > 1) {
            var move_x = (canvas.w - this.origin.w) / 2
            ans.map(item => {
                item.x += move_x
            })

        } else if (scale > 0.6) {
            ans.map(item => {
                if (item.type == 'Image') {
                    item.h *= scale
                }
                item.x *= scale
                item.w *= scale
            })

        } else {
            /**
             * Real question
             */
            ans.map(item => {
                if (item.type == 'Image') {
                    var tempW
                    if ((item.w / this.origin.w) > 0.4) {
                        /**
                         * Assume the image as a full
                         */
                        var tempW = canvas.w * 0.8
                        item.x = item.w * 0.1
                        item.h = item.h * (tempW / item.w)
                        for (var i = 0; i < ans.length; i++) {
                            if (ans[i].id == item.id) continue
                            if (ans[i].y <= item.y + item.h) {
                                ans[i].y = item.y + item.h + 10
                            }
                        }
                    } else {
                        /**
                         * Not full, keep the image scale
                         */
                        item.x = item.x * scale
                        tempW = item.w * scale
                        item.h = (tempW / item.w) * item.h
                    }
                    item.w = tempW
                } else {
                    if (item.w / this.origin.w < 0.6) {
                        for (var i = 0; i < ans.length; i++) {
                            if (ans[i].id == item.id) break;
                            if (1) {
                                console.log("P: ", item.id, ans[i].id)
                                tempW = ans[i].x - item.x - 10
                                item.h = item.h * (tempW / item.w)
                                item.w = tempW
                            }
                        }
                    } else {
                        item.w = canvas.w * 0.8
                        item.x = canvas.w * 0.1
                    }
                }
            })
        }
        return ans
    }
}

module.exports = DynamicCreative