


export const dijkstras = (start, end) => {

    let nodes = {
        a: {neighbors: { b: {weight: 3}, c: {weight: 1}}},
        b: {neighbors: { c: {weight: 7}, d: {weight: 5}, e: {weight: 1}}},
        c: {neighbors: { a: {weight: 1}, d: {weight: 2}}},
        d: {neighbors: { e: {weight: 7}}},
        e: {neighbors: {}}
    };

    let unvisitedNodes = nodes
    // holds array of nodes visited
    let visitedNodes = {}
    // holds the current minimum distance to a given point
    let minDistance = {}
    let evaluated = []
    let predecessor = {}
    Object.keys(unvisitedNodes).forEach(node => {
        minDistance[node] = Infinity
    })
    minDistance[start] = 0

    while (Object.keys(unvisitedNodes).length > 0) {
        let minNode = undefined
        Object.keys(unvisitedNodes).forEach(node => {
            if (minNode === undefined) {
                minNode = node
            }
            if (minDistance[node] < minDistance[minNode]) {
                minNode = node
            }
        })

        Object.keys(unvisitedNodes[minNode].neighbors).forEach(neighbor => {
            let distanceToPoint = (minDistance[minNode] + unvisitedNodes[minNode].neighbors[neighbor].weight)
            if (distanceToPoint < minDistance[neighbor]) {
                minDistance[neighbor] = distanceToPoint
                evaluated.push({from: minNode, to: neighbor})
                predecessor[neighbor] = minNode
            }
        })

        visitedNodes[minNode] = unvisitedNodes[minNode]
        console.dir(visitedNodes)
        delete unvisitedNodes[minNode]
    }
    console.log("Evaluated")
    console.dir(evaluated)
    console.log("Predecessors")
    console.dir(predecessor)
}

dijkstras('c', 'e')
