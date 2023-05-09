const solution = function(points, x0, y0, zoom) {
    const leftBorder = -100 / zoom + x0;
    const rightBorder = 100 / zoom + x0;
    const topBorder = 100 / zoom + y0;
    const bottomBorder = -100 / zoom + y0;
    const xMove = (rightBorder - leftBorder) / 10;
    const yMove = (topBorder - bottomBorder) / 10;
    points = points.filter(point => point.x <= rightBorder && point.x >= leftBorder && point.y <= topBorder && point.y >= bottomBorder)
    let resultArray = []
    points.forEach((point) => {
        let i = Math.floor((point.x - x0)/ xMove) + 5
        let j = Math.floor((point.y - y0)/ yMove) + 5
        let increased = false;
        resultArray.forEach(section => {
            if (section.i === i && section.j === j) {
                increased = true
                section.count += 1
            }
        })
        if (!increased)
            resultArray.push({i: i, j: j, count: 1})
    })
    resultArray.sort((a, b) => {
        if (a.j === b.j) {
            return a.i - b.i
        }
        return a.j - b.j
    })
    return resultArray
}


points = [{x: -12, y: -45}, {x: 45, y: 45}, {x: -14, y: -35}, {x: 12, y: 21}, {x: 211, y: 2}]
x0 = 0;
y0 = 0;
zoom = 2;
console.log(solution(points, x0, y0, zoom))