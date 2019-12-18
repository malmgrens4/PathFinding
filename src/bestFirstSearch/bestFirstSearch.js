import {cloneDeep} from 'lodash';

let graphHistory = []

class QItem {
    constructor(element, priority) {
        this.element = element
        this.priority = priority
    }
}

class PriorityQueue {
    constructor()
    {
        this.items = []
    }

    queue(element){
        let added = false
        for(let i = 0; i < this.items.length; i++){
            if(element.priority < this.items[i].priority) {
                this.items.splice(i, 0, element);
                added = true
                break
            }
        }
        if(!added){
            this.items.push(element)
        }
    }

    pop(){
        let element = this.items.shift()
        if(!!element){
            return element.element
        }
        return undefined
    }

    length() {
        return this.items.length
    }
}

export const bestFirstSearch = (_graph) => {
    const graph = cloneDeep(_graph)
    graphHistory = []
    let startNode = {}
    let goalNode = {}
    for (let y = 0; y < graph.length; y++) {
        for (let x = 0; x < graph[y].length; x++) {
            if (graph[y][x].isStart) {
                startNode = graph[y][x]
            }
            if (graph[y][x].isGoal) {
                goalNode = graph[y][x]
            }
        }
    }
    if (!startNode || !goalNode) {
        console.log("Need a start and goal node.")
        return
    }

    let queue = new PriorityQueue()
    queue.queue({element: startNode, priority: 0})
    let goalFound = false

    while(queue.length() > 0){
        const node = queue.pop()
        node['isVisited'] = true
        node['isCurrent'] = true
        getNeighbors(node, graph).map(neighbor => {
            if(neighbor.x === goalNode.x && neighbor.y === goalNode.y) {
                neighbor['parent'] = node
                goalFound = true
                setPath(neighbor)
                return
            }

            neighbor['isNeighbor'] = true

            if(!neighbor['isVisited']) {
                neighbor['parent'] = node

                neighbor['isVisited'] = true
                let scoredNeighbor = new QItem(neighbor, heuristic(neighbor, goalNode))
                queue.queue(scoredNeighbor)
            }

        })

        pushHistory(graph)
        node['isCurrent'] = false
        if(goalFound){
            return graphHistory
        }

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