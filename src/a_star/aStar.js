import {cloneDeep} from 'lodash';
import {connect} from "react-redux";
import {setHistoryIndex, setIsEdit, setUnweightedGraphHistory} from "../actions";

let graphHistory = []

export const aStar = (_graph) => {
    let graph = cloneDeep(_graph)
    graphHistory = []
    let startNode = {}
    let goalNode = {}
    for(let y = 0; y < graph.length; y++){
        for(let x = 0; x < graph[y].length; x++){
            if(graph[y][x].isStart){
                startNode = graph[y][x]
            }
            if(graph[y][x].isGoal){
                goalNode = graph[y][x]
            }
        }
    }
    if(!startNode || !goalNode){
        console.log("Need a start and goal node.")
        return
    }
    let openList = [startNode]
    let visitedList = []
    startNode.g = 0
    startNode.f = startNode.g + heuristic(startNode, goalNode)

    while (openList.length > 0){
        // clear states for graph history
        for(let y = 0; y < graph.length; y++) {
            for (let x = 0; x < graph[0].length; x++) {
                let node = graph[y][x]
                node.isCurrent = false
                if(node.isNeighbor){
                    node.isSelected = true
                    node.isNeighbor = false
                }
            }
        }

        //TODO this has to return the index
        let curNode = openList.reduce((min, node) => {return node.f < min.f ? node : min}, openList[0])
        curNode['isCurrent'] = true
        curNode['isVisited'] = true
        if (curNode.x === goalNode.x && curNode.y === goalNode.y) {
            console.log("Goal reached")
            setPath(curNode)
            pushHistory(graph)
            break
        }
        let index = openList.indexOf(curNode)
        openList.splice(index, 1)
        visitedList.push(curNode)
        getNeighbors(curNode, graph).forEach(neighbor => {

            neighbor['isNeighbor'] = true

            if(!visitedList.includes(neighbor)) {
                if (openList.includes(neighbor)) {
                    if ((curNode.g + 1) < neighbor.g) {
                        // the distance from this spot is
                        // less than the previous one for this neighbor
                        neighbor.g = curNode.g + 1
                        neighbor.parent = curNode
                    }
                } else {
                    neighbor.g = curNode.g + 1
                    neighbor.f = neighbor.g + heuristic(neighbor, goalNode)
                    neighbor.parent = curNode
                    openList.push(neighbor)
                }
            }
        })
        setPath(curNode)
        pushHistory(graph)
        clearPath(curNode)
    }
    return graphHistory
}

const pushHistory = graph => {
    let historyEntry = cloneDeep(graph)
    graphHistory.push(historyEntry)
}


const setPath = (node) => {
    let path = ''
    while(node.hasOwnProperty('parent')){
        path += `|${node.x}, ${node.y}|`
        node = node.parent
        node['isPath'] = true
    }
    return path
}

const clearPath = (node) => {
    let path = ''
    while(node.hasOwnProperty('parent')){
        path += `|${node.x}, ${node.y}|`
        node = node.parent
        node['isPath'] = false
    }
    return path
}

const getNeighbors = (curNode, graph) => {
    // check if at a natural boundary - then check if the
    let neighbors = []
    for (let i = -1; i <= 1; i++) {;
        if(!(curNode.y === 0 && i < 0) && !(curNode.y === graph.length - 1 && i > 0)){
        for (let j = -1; j <= 1; j++) {
            if (!(curNode.x === 0 && j < 0) && !(curNode.x === graph[curNode.y + i].length - 1 && j > 0)) {
                if (!(i === 0 && j === 0)) {
                    //If the grid is not a square the adjacent squares could cause a failure
                    try {
                        let neighbor = graph[curNode.y + i][curNode.x + j]
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
            // if(point.isVisited){
            //             //
            //             // }
            else {
                row += `| (${point.x}, ${point.y}) |`
            }
        }
        g += row + '\n'
    }
    console.log(g)
    return g
}


