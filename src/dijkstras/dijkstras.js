import {cloneDeep} from 'lodash';

export const dijkstras = (nodes) => {
    let wGraph = {}

    for (let i = 0; i < 4; i++){
        let neighbors = {};
        // if(i != 0) {
        //     for (let j = 0; j < i; j++) {
        //         let ids= Object.keys(wGraph);
        //         neighbors[wGraph[ids[j]].id] = {node: wGraph[ids[j]], weight: (Math.random() * 10) + 1}
        //     }
        // }
        let id = String.fromCharCode(i + 65)
        let newNode = {
            id,
            isStart: false,
            isGoal: false,
            isVisited: false,
            isCurrent: false,
            isNeighbor: false,
            neighbors,
            parent: null
        }

        wGraph[id] = newNode
    }

    wGraph["A"].neighbors["B"] = {node: wGraph["B"], weight: 3}
    wGraph["A"].neighbors["C"] = {node: wGraph["C"], weight: 7}

    wGraph["B"].neighbors["C"] = {node: wGraph["C"], weight: 1}
    wGraph["B"].neighbors["D"] = {node: wGraph["D"], weight: 3}

    wGraph["C"].neighbors["D"] = {node: wGraph["D"], weight: 1}
    wGraph["C"].neighbors["B"] = {node: wGraph["B"], weight: 1}
    
    let start = 'A'

    let unvisitedNodes = cloneDeep(wGraph)
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
                unvisitedNodes[minNode].neighbors[neighbor].parent = minNode
            }
        })

        visitedNodes[minNode] = unvisitedNodes[minNode]
        delete unvisitedNodes[minNode]

    }
    console.log(evaluated)
    console.log(predecessor)
    return
}


