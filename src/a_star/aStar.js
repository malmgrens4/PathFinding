



export const aStar = () => {
    let col = 5
    let row = 5
    let graph = new Array(col)
    let start = {x: 0, y:0}
    let goal = {x: col - 1, y: row - 1}
    for(let i = 0; i < col; i++){
        graph[i] = new Array(row)
        for (let j = 0; j < row; j++){
            graph[i][j] = {x: j, y: i, isWall: false}
        }
    }

    graph[0][1].isWall = true
    graph[1][1].isWall = true
    graph[2][1].isWall = true
    graph[3][1].isWall = true
    graph[4][1].isWall = true

    let startNode = graph[start.x][start.y]
    let goalNode = graph[goal.x][goal.y]
    let openList = [startNode]
    let visitedList = []
    startNode.g = 0
    startNode.f = startNode.g + heuristic(startNode, goal)
    while (openList.length > 0){
        //TODO this has to return the index
        let curNode = openList.reduce((min, node) => {return node.f < min.f ? node : min, openList[0]})
        if (curNode.x === goalNode.x && curNode.y === goalNode.y){
            console.log("Goal reached")
            printPath(curNode)
            printGraph(graph)
        }
        let index = openList.indexOf(curNode)
        openList.splice(index, 1)
        visitedList.push(curNode)
        getNeighbors(curNode, graph).forEach(neighbor => {
            if(!visitedList.includes(neighbor)) {
                if (openList.includes(neighbor)) {
                    if ((curNode.g + 1) < neighbor.g) {
                        // the distance from this spot is
                        // less than the previous one for this neighbor
                        neighbor.g = curNode.g + 1
                        neighbor.parent = curNode.parent
                    }
                } else {
                    neighbor.g = curNode.g + 1
                    neighbor.f = neighbor.g + heuristic(curNode, neighbor)
                    neighbor.parent = curNode
                    openList.push(neighbor)
                }
            }
        })
    }
    printGraph(graph)
}


const printPath = (curNode) => {
    let path = ''
    let node = curNode
    while(node.hasOwnProperty('parent')){
        path += `|${node.x}, ${node.y}|`
        node = node.parent
    }
    console.log(path)
    return path
}

const getNeighbors = (curNode, graph) => {
    // check if at a natural boundary - then check if the
    let neighbors = []
    for (let i = -1; i <= 1; i++) {
        if(!(curNode.x === 0 && i < 0) && !(curNode.x === graph.length - 1 && i > 0)){
        for (let j = -1; j <= 1; j++) {
            if (!(curNode.y === 0 && j < 0) && !(curNode.y === graph.length - 1 && j > 0)) {
                if (!(i === 0 && j === 0)) {
                    //If the grid is not a square the adjacent squares could cause a failure
                    try {
                        let neighbor = graph[curNode.x + i][curNode.y + j]
                        if (!neighbor.isWall) {
                            // the one would be replaced if weights were introduced
                            neighbors.push(neighbor)
                        }
                    } catch (err) {
                        console.error(err)
                    }
                }
            }
        }
        }
    }
    return neighbors
}

const heuristic = (start, goal) => {
    return Math.pow((goal.x - start.x), 2) + Math.pow((goal.y - start.y), 2)
}


const printGraph = (graph) => {
    let g = ''
    for(let i = 0; i < graph.length; i++){
        let row = ''
        for (let j = 0; j < graph[i].length; j++) {
            let point = graph[i][j]
            if(point.isWall){
                row+=`| ==WW== |`
            }
            else {
                row += `| (${point.x}, ${point.y}) |`
            }
        }
        g += row + '\n'
    }
    console.log(g)
    return g
}


