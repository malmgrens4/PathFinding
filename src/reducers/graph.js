import {cloneDeep} from 'lodash';

const SET_WEIGHTED_GRAPH = 'SET_UNWEIGHTED_GRAPH'
const SET_WEIGHTED_GRAPH_HISTORY = 'SET_WEIGHTED_GRAPH_HISTORY'
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

export const graphType = (state = 'WEIGHTED', action) => {
    switch(action.type) {
        case SET_GRAPH_TYPE:
            return {
                    ...state,
                    graphType: action.graphType
                }

        default:
            return state
    }
}

export const isEdit = (state = true, action ) => {
    switch(action.type) {
        case SET_IS_EDIT:
            return action.isEdit

        default:
            return state
    }
}

export const unweightedGraph = (state = unwGraph, action) => {
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

export const unweightedGraphHistory = (state = [], action) => {
    switch(action.type) {
        case SET_UNWEIGHTED_GRAPH_HISTORY:
            return action.unweightedGraphHistory
        default:
            return state
    }
}

let wGraph = {
    a: {neighbors: { b: {weight: 3}, c: {weight: 1}}},
    b: {neighbors: { c: {weight: 7}, d: {weight: 5}, e: {weight: 1}}},
    c: {neighbors: { a: {weight: 1}, d: {weight: 2}}},
    d: {neighbors: { e: {weight: 7}}},
    e: {neighbors: {}}
}

export const weightedGraph = (state = wGraph, action) => {
    switch(action.type) {
        case SET_WEIGHTED_GRAPH:
            return {
                    ...state,
                    weightedGraph: action.weightedGraph
                }
        default:
            return state
    }
}

export const weightedGraphHistory = (state = [], action) => {
    switch(action.type) {
        case SET_WEIGHTED_GRAPH_HISTORY:
            return {
                    ...state,
                    weightedGraphHistory: action.weightedGraphHistory
                }
        default:
            return state
    }
}

