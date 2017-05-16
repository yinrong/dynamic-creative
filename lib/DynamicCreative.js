class DynamicCreative {

    constructor(canvas) {
        this.origin = canvas
    }

    add(elements) {
        this.elements = elements
    }

    toParams(canvas) {
        console.log("=======BEGIN===", "W: ", canvas.w, "H: ", canvas.h)
            /**
             * Sort elements from top-bottom/right-left
             */
        var ans = [].concat(JSON.parse(JSON.stringify(this.elements)));
        ans = ans.sort(function(a, b) {
            if (a.type != b.type)
                return a.type == 'Image' ? -1 : 1
            if (a.y == b.y) return a.x - b.x
            else return a.y - b.y
        })

        var scale = canvas.w / this.origin.w

        console.log("Scale: ", scale)
        console.log("Debug: ", ans[0].x)

        if (scale > 1) {
            var move_x = (canvas.w - this.origin.w) / 2
            ans.map(item => {
                item.x += move_x
            })
            console.log("Move: ", move_x, canvas.w, this.origin.w)
        } else {
            if (scale > 0.6) {
                ans.map(item => {
                    if (item.type == 'Image') {
                        item.h *= scale
                    }
                    item.x *= scale
                    item.w *= scale
                })
            } else {
                ans.map(item => {
                    if (item.type == 'Image') {
                        var tempW
                        if ((item.w / this.origin.w) > 0.4) {
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
                            item.x = item.x * scale
                            tempW = item.w * scale
                        }
                        item.w = tempW
                    } else {
                        for (var i = 0; i < ans.length; i++) {
                            if (ans[i].id == item.id) break;
                            if (item.y <= ans[i].y + ans[i].h && item.y + item.h >= ans[i].y) {
                                tempW = ans[i].x - item.x - 10
                                item.h = item.h * (item.w / tempW)
                                item.w = tempW
                            }
                        }
                    }
                })
            }
        }
        return ans
    }
}

module.exports = DynamicCreative