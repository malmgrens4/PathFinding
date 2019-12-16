import {cloneDeep} from 'lodash';
import {WGraphNeighbor, WGraphNode, WGraphI} from "../Graphs/GraphTypes";

const SET_WEIGHTED_GRAPH = 'SET_UNWEIGHTED_GRAPH'
const SET_WEIGHTED_GRAPH_HISTORY = 'SET_WEIGHTED_GRAPH_HISTORY'
const SET_WEIGHTED_GRAPH_NODE = 'SET_WEIGHTED_GRAPH_NODE'

const SET_UNWEIGHTED_GRAPH = 'SET_UNWEIGHTED_GRAPH'
const SET_UNWEIGHTED_GRAPH_HISTORY = 'SET_UNWEIGHTED_GRAPH_HISTORY'
const SET_UNWEIGHTED_GRAPH_NODE = 'SET_UNWEIGHTED_GRAPH_NODE'
const SET_GRAPH_TYPE = 'SET_GRAPH_TYPE'
const SET_IS_EDIT = 'SET_IS_EDIT'


let col = 11
let row = 23
const unwGraph = new Array(col)
let start = {x: Math.floor(row/2 - 1), y: Math.floor(col/2 )}
let goal = {x: Math.floor(row/2 + 1), y: Math.floor(col/2)}
for(let i = 0; i < col; i++){
    unwGraph[i] = new Array(row)
    for (let j = 0; j < row; j++){
        unwGraph[i][j] = {x: j, y: i, isWall: false, isGoal: false, isNeighbor: false, isStart: false}
    }
}

unwGraph[start.y][start.x].isStart = true
unwGraph[goal.y][goal.x].isGoal = true


export const graphType = (state = 'UNWEIGHTED', action: any) => {
    switch(action.type) {
        case SET_GRAPH_TYPE:
            return {
                    graphType: action.graphType
                }

        default:
            return state
    }
}

export const isEdit = (state = true, action: any ) => {
    switch(action.type) {
        case SET_IS_EDIT:
            return action.isEdit

        default:
            return state
    }
}

export const unweightedGraph = (state = unwGraph, action: any) => {
    switch(action.type) {
        case SET_UNWEIGHTED_GRAPH:
            return action.unweightedGraph
        case SET_UNWEIGHTED_GRAPH_NODE:
            const newGraph = cloneDeep(state)
            newGraph[action.node.y][action.node.x] = action.node
            return newGraph


        default:
            return state
    }
}

export const unweightedGraphHistory = (state = [], action: any) => {
    switch(action.type) {
        case SET_UNWEIGHTED_GRAPH_HISTORY:
            return action.unweightedGraphHistory
        default:
            return state
    }
}


let wGraph: WGraphI = {}

for (let i = 0; i < 4; i++){
    let neighbors: Record<string, WGraphNeighbor> = {}

    let id = String.fromCharCode(i + 65)

    let newNode: WGraphNode = {
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

// for (let i = 0; i < 6; i++) {
//     let neighbors: Record<string, WGraphNeighbor> = {}
//
//     for (let j = 0; j < 6; j++) {
//         let ids: string[] = Object.keys(wGraph);
//         neighbors[wGraph[ids[j]].id] = {node: wGraph[ids[j]], weight: (Math.random() * 10) + 1}
//     }
// }

wGraph["A"].neighbors = {"B": {node: wGraph["B"], weight: 3}}
wGraph["A"].neighbors = {"C": {node: wGraph["C"], weight: 7}}

wGraph["B"].neighbors = {"C": {node: wGraph["C"], weight: 2}}
wGraph["B"].neighbors = {"D": {node: wGraph["D"], weight: 3}}

wGraph["C"].neighbors = {"D": {node: wGraph["D"], weight: 1}}
wGraph["C"].neighbors = {"B": {node: wGraph["B"], weight: 1}}

export const weightedGraph = (state = wGraph, action: any) => {
    switch(action.type) {
        case SET_WEIGHTED_GRAPH:
            return state
        case SET_WEIGHTED_GRAPH_NODE:
            return state
        default:
            return state
    }
}

export const weightedGraphHistory = (state = [], action: any) => {
    switch(action.type) {
        case SET_WEIGHTED_GRAPH_HISTORY:
            return action.weightedGraphHistory
        default:
            return state
    }
}

